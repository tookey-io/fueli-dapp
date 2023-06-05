import Head from "next/head";

import { getRedisConnection } from "@/backend/withRedis";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Riches } from "@/components/Riches";
import { InferGetServerSidePropsType } from "next";
import { buildStats } from "./api/stats";

export const getServerSideProps = async () => {
  return { props: { stats: await buildStats(await getRedisConnection()) } };
};

export default function Home({
  stats,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
        <Hero {...{ stats }} />
        <Riches />
        {/* <Test /> */}
        {/* <Schedule /> */}
        {/* <Sponsors /> */}
        {/* <Newsletter /> */}
      </main>
      <Footer />
    </>
  );
}
