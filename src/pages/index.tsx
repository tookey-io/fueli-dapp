import Head from "next/head";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Riches } from "@/components/Riches";
import { InferGetStaticPropsType } from "next";
import { buildStats } from "./api/stats";
import { createClient } from "redis";

export const getStaticProps = async () => {
  const redis = createClient({ url: process.env.REDIS_URL });
  redis.on("error", (err) => console.log("Redis Client Error", err));
  await redis.connect();
  try {
    return { props: { stats: await buildStats(redis) } };
  } finally {
    await redis.disconnect();
  }
};

export default function Home({
  stats,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
