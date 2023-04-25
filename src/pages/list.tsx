import Head from 'next/head'
import React from 'react'
import Layout from '../components/Layout'
import { api } from '../utils/api'

export default function ListRoute() {
  return (
    <>
      <Head>
        <title>Listy - List</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <ListByUserId />
      </Layout>
    </>
  )
}
export function ListByUserId() {
  const { data, status } = api.list.byUserId.useQuery()

  if (status === 'error') {
    return <p>Something went wrong...</p>
  }

  if (status === 'success') {
    return <p className=''>{JSON.stringify(data)}</p>
  }

  return <p className=''>Loading...</p>
}
