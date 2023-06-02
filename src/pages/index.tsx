import Head from 'next/head'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Newsletter } from '@/components/Newsletter'
import { Schedule } from '@/components/Schedule'
import { Riches } from '@/components/Riches'
import { Sponsors } from '@/components/Sponsors'

export default function Home() {
  return (
    <>
      <Head>
        <title>Fueli - fueling open code with web3 riches!</title>
        <meta
          name="description"
          content="fueling open code with web3 riches!"
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <Riches />
        {/* <Schedule /> */}
        {/* <Sponsors /> */}
        {/* <Newsletter /> */}
      </main>
      <Footer />
    </>
  )
}
