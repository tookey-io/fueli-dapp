import Head from "next/head";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Riches } from "@/components/Riches";
import { InferGetStaticPropsType } from "next";
import { buildStats } from "./api/stats";

export const getStaticProps = async () => {
  return { props: { stats: await buildStats() } };
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
