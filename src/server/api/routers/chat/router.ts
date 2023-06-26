import { createTRPCRouter, protectedProcedure } from 'server/api/trpc'
import { z } from 'zod'

export const chatRouter = createTRPCRouter({
  getChats: protectedProcedure.query(async ({ ctx }) => {
    await sleep(2000)
    return ctx.prisma.chat.findMany({
      where: {
        userId: ctx.session.user.id
      },
      orderBy: {
        updatedAt: 'desc'
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      },
      take: 5
    })
  }),

  getMessagesByChatId: protectedProcedure
    .input(
      z.object({
        chatId: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      await sleep(2000)
      return ctx.prisma.chat.findFirst({
        where: {
          id: input.chatId
        },

        include: {
          messages: {
            orderBy: {
              createdAt: 'asc'
            }
          }
        }
      })
    }),

  create: protectedProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            name: z.string().min(3).max(50),
            userId: z.number(),
            role: z.enum(['system', 'user', 'assistant']),
            content: z.string().min(1).max(255)
          })
        )
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      return ctx.prisma.chat.create({
        data: {
          userId,
          messages: {
            createMany: { data: input.messages }
          }
        }
      })
    }),

  addMessages: protectedProcedure
    .input(
      z.object({
        chatId: z.number().optional(),
        messages: z.array(
          z.object({
            content: z.string().min(1),
            role: z.enum(['system', 'user', 'assistant'])
          })
        )
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { chatId, messages } = input

      if (chatId) {
        const newMessages = await ctx.prisma.message.createMany({
          data: messages.map((m) => ({ ...m, chatId }))
        })

        return newMessages
      } else {
        const userId = ctx.session.user.id

        const newChat = await ctx.prisma.chat.create({
          data: {
            userId,
            messages: {
              createMany: { data: messages.map((m) => ({ ...m, chatId })) }
            }
          },
          include: {
            messages: true
          }
        })

        return newChat.messages
      }
    })
})

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
