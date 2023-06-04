import Image from "next/image";

import { Container } from "@/components/Container";
import backgroundImage from "@/images/background.jpg";
import { Stats } from "@/typedefs/Stats";
import { ConnectKitButton } from "connectkit";


export function Hero({ stats }: { stats: Stats }) {
  return (
    <div className="relative pb-20 pt-10 sm:py-24">
      <div className="absolute inset-x-0 -bottom-14 -top-48 overflow-hidden bg-indigo-50">
        <Image
          className="absolute left-0 top-0 translate-x-[-55%] translate-y-[-10%] -scale-x-100 sm:left-1/2 sm:translate-x-[-98%] sm:translate-y-[-6%] lg:translate-x-[-106%] xl:translate-x-[-122%]"
          src={backgroundImage}
          alt=""
          width={918}
          height={1495}
          priority
          unoptimized
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <h1 className="font-display text-5xl font-bold tracking-tighter text-blue-600 sm:text-7xl">
            <span className="sr-only">Fueli - </span>fueling open code
            with&nbsp;web3 riches!
          </h1>
          <div className="mt-6 space-y-6 font-display text-2xl tracking-tight text-blue-900">
            <p>
              What&apos;s up, you crypto-taming virtuoso? Ever feel like our
              code-writing genius could use a bit more fuel? Enter{" "}
              <strong>Fueli</strong> - our decentralized pit stop for open
              crypto codes! We turbocharge the best Web3 projects and back
              open-source champs.
            </p>
          </div>
          <div className="mt-10 w-full sm:hidden">
            <ConnectKitButton />
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {stats &&
              [
                ["Riches", stats.richies],
                [
                  "Funds Available",
                  `${stats.totalFuel.toFixed(2)} TFUEL`,
                  `~$${stats.totalUsd.toFixed(2)}`,
                ],
                ["Current track", "Pick Theta Hack"],
                ["Next track", "Setup reward pull"],
              ].map(([name, value, help]) => (
                <div key={name}>
                  <dt className="font-mono text-sm text-blue-600">{name}</dt>
                  <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-blue-900">
                    {value}
                  </dd>
                  {help && (
                    <dd className="text-sm tracking-tight text-blue-400">
                      {help}
                    </dd>
                  )}
                </div>
              ))}
          </dl>
        </div>
      </Container>
    </div>
  );
}
