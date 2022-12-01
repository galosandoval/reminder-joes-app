import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import prisma from '../../../lib/prisma'

const schema = z.object({
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    password: z.string()
  })
})

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await schema.safeParseAsync(req.body)
  if (!response.success) {
    return res.status(400).send({ message: 'Bad Request' })
  }
  const result = await prisma.user.create({
    data: { ...response.data.body }
  })
  res.json(result)
}