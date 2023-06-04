import { SVGProps, useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "@/components/Container";
import { DiamondIcon } from "@/components/DiamondIcon";
import { Connected } from "./blockchain/Connected";
import { Button } from "./Button";
import { Minting } from "./Minting";
import {
  picliABI,
  useFueliPicliMinterMintingRequestEvent,
  usePicliTotalSupply,
} from "@/wagmi/generated";
import { useContractReads } from "wagmi";
import { TokenMeta } from "@/models/tokenMeta";
import { defined } from "@/utils/defined";
import { Picli } from "./Picli";
import { usePicliAddress } from "@/hooks/usePicliAddress";
import { useMinterAddress } from "@/hooks/useMinterAddress";
// import andrewGreeneImage from "@/images/avatars/andrew-greene.jpg";
// import cathleneBurrageImage from "@/images/avatars/cathlene-burrage.jpg";
// import damarisKimuraImage from "@/images/avatars/damaris-kimura.jpg";
// import dianneGuilianelliImage from "@/images/avatars/dianne-guilianelli.jpg";
// import erhartCockrinImage from "@/images/avatars/erhart-cockrin.jpg";
// import giordanoSagucioImage from "@/images/avatars/giordano-sagucio.jpg";
// import gordonSandersonImage from "@/images/avatars/gordon-sanderson.jpg";
// import heatherTerryImage from "@/images/avatars/heather-terry.jpg";
// import ibrahimFraschImage from "@/images/avatars/ibrahim-frasch.jpg";
// import jaquelinIschImage from "@/images/avatars/jaquelin-isch.jpg";
// import kimberlyParsonsImage from "@/images/avatars/kimberly-parsons.jpg";
// import parkerJohnsonImage from "@/images/avatars/parker-johnson.jpg";
// import piersWilkinsImage from "@/images/avatars/piers-wilkins.jpg";
// import richardAstley from "@/images/avatars/richard-astley.jpg";
// import rinaldoBeynonImage from "@/images/avatars/rinaldo-beynon.jpg";
// import ronniCantadoreImage from "@/images/avatars/ronni-cantadore.jpg";
// import stevenMchailImage from "@/images/avatars/steven-mchail.jpg";
// import waylonHydenImage from "@/images/avatars/waylon-hyden.jpg";

type RichRecord = {
  name: string;
  role: string;
  image: string;
};

type TrackRecord = {
  name: string;
  date: string;
  dateTime: string;
  speakers: RichRecord[];
};

const days: TrackRecord[] = [
  {
    name: "Most",
    date: "Valuable",
    dateTime: "2022-04-04",
    speakers: [
      // {
      //   name: "Steven McHail",
      //   role: "Designer at Globex Corporation",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
      // {
      //   name: "Jaquelin Isch",
      //   role: "UX Design at InGen",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/98ee6b9d-c2e3-45e5-2367-0be40e17bc00/public",
      // },
      // {
      //   name: "Dianne Guilianelli",
      //   role: "General Manager at Initech",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
      // {
      //   name: "Ronni Cantadore",
      //   role: "Design Engineer at Weyland-Yutani",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
      // {
      //   name: "Erhart Cockrin",
      //   role: "Product Lead at Cyberdyne Systems",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
      // {
      //   name: "Parker Johnson",
      //   role: "UI Designer at MomCorp",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
    ],
  },
  {
    name: "Most",
    date: "Recent",
    dateTime: "2022-04-05",
    speakers: [
      // {
      //   name: "Damaris Kimura",
      //   role: "Senior Engineer at OCP",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
      // {
      //   name: "Ibrahim Frasch",
      //   role: "Programmer at Umbrella Corp",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
      // {
      //   name: "Cathlene Burrage",
      //   role: "Frontend Developer at Buy n Large",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
      // {
      //   name: "Rinaldo Beynon",
      //   role: "Data Scientist at Rekall",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
      // {
      //   name: "Waylon Hyden",
      //   role: "DevOps at RDA Corporation",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
      // {
      //   name: "Giordano Sagucio",
      //   role: "Game Developer at Soylent Corp",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
    ],
  },
  {
    name: "Most",
    date: "Active",
    dateTime: "2022-04-06",
    speakers: [
      // {
      //   name: "Andrew Greene",
      //   role: "Frontend Developer at Ultratech",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
      // {
      //   name: "Heather Terry",
      //   role: "Backend Developer at Xanatos Enterprises",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
      // {
      //   name: "Piers Wilkins",
      //   role: "Full stack Developer at BiffCo",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
      // {
      //   name: "Gordon Sanderson",
      //   role: "Mobile Developer at Cobra Industries",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
      // {
      //   name: "Kimberly Parsons",
      //   role: "Game Developer at Tyrell Corporation",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
      // {
      //   name: "Richard Astley",
      //   role: "CEO at Roll Out",
      //   image:
      //     "https://imagedelivery.net/Nn4rZTVgDyPkcgjQdbz5AA/38d77115-289a-4eaf-82f5-8e538621cf00/public",
      // },
    ],
  },
];

function ImageClipPaths({
  id,
  ...props
}: SVGProps<SVGSVGElement> & { id: string }) {
  return (
    <svg aria-hidden="true" width={0} height={0} {...props}>
      <defs>
        <clipPath id={`${id}-0`} clipPathUnits="objectBoundingBox">
          <path d="M0,0 h0.729 v0.129 h0.121 l-0.016,0.032 C0.815,0.198,0.843,0.243,0.885,0.243 H1 v0.757 H0.271 v-0.086 l-0.121,0.057 v-0.214 c0,-0.032,-0.026,-0.057,-0.057,-0.057 H0 V0" />
        </clipPath>
        <clipPath id={`${id}-1`} clipPathUnits="objectBoundingBox">
          <path d="M1,1 H0.271 v-0.129 H0.15 l0.016,-0.032 C0.185,0.802,0.157,0.757,0.115,0.757 H0 V0 h0.729 v0.086 l0.121,-0.057 v0.214 c0,0.032,0.026,0.057,0.057,0.057 h0.093 v0.7" />
        </clipPath>
        <clipPath id={`${id}-2`} clipPathUnits="objectBoundingBox">
          <path d="M1,0 H0.271 v0.129 H0.15 l0.016,0.032 C0.185,0.198,0.157,0.243,0.115,0.243 H0 v0.757 h0.729 v-0.086 l0.121,0.057 v-0.214 c0,-0.032,0.026,-0.057,0.057,-0.057 h0.093 V0" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function Riches() {
  let id = useId();
  let [tabOrientation, setTabOrientation] = useState("horizontal");

  useEffect(() => {
    let lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({
      matches,
    }: MediaQueryListEvent | MediaQueryList) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  const picliAddress = usePicliAddress();
  const minterAddress = useMinterAddress();

  const { data: total } = usePicliTotalSupply({
    address: picliAddress,
    watch: true,
  });

  const tokenFetchRequests = useMemo(() => {
    if (total && picliAddress) {
      return new Array(Math.min(Number(total), 9)).fill(0).map((_, index) => {
        return {
          address: picliAddress,
          functionName: "tokenURI",
          abi: picliABI,
          args: [total - BigInt(index)],
        } as const;
      });
    } else {
      return undefined;
    }
  }, [total]);

  const { data: tokenRawDatas } = useContractReads({
    contracts: tokenFetchRequests,
  });

  const tokensData = useMemo(
    () =>
      tokenRawDatas?.map(({ result }) => {
        return result
          ? (JSON.parse(
              Buffer.from(
                result.substring("data:application/json;base64,".length),
                "base64"
              ).toString("utf-8")
            ) as TokenMeta)
          : undefined;
      }),
    [tokenRawDatas]
  );

  useFueliPicliMinterMintingRequestEvent({
    address: minterAddress,
    listener: (logs) => {
      console.log("requests", logs);
    },
  });

  return (
    <section
      id="speakers"
      aria-labelledby="speakers-title"
      className="py-20 sm:py-32"
    >
      <ImageClipPaths id={id} />
      <Container>
        <div className="mx-auto max-w-2xl flex-grow lg:ml-0 lg:mr-auto">
          <h2
            id="speakers-title"
            className="font-display text-4xl font-medium tracking-tighter text-blue-600 sm:text-5xl"
          >
            Riches <>{total && total.toString()}</>
          </h2>
        </div>
        <div className="items-center lg:flex">
          <div className="mx-auto max-w-2xl flex-grow lg:ml-0 lg:mr-auto">
            <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
              Join the league of digital riches fueling Web3&apos;s future.{" "}
              <br className="hidden md:inline" />
              Be part of the revolution!
            </p>
          </div>

          <div className="mx-auto mt-8 flex w-auto max-w-2xl flex-shrink items-center justify-start lg:mx-0 lg:mt-0">
            <Connected>
              <Minting />
            </Connected>
          </div>
        </div>
        <Tab.Group
          as="div"
          className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-16 lg:mt-24 lg:grid-cols-4"
          vertical={tabOrientation === "vertical"}
        >
          <div className="relative -mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:block sm:overflow-visible sm:pb-0">
            <div className="absolute bottom-0 left-0.5 top-2 hidden w-px bg-slate-200 lg:block" />
            <div className="grid auto-cols-auto grid-flow-col justify-start gap-x-8 gap-y-10 whitespace-nowrap px-4 sm:mx-auto sm:max-w-2xl sm:grid-cols-3 sm:px-0 sm:text-center lg:grid-flow-row lg:grid-cols-1 lg:text-left">
              {days.map((day, dayIndex) => (
                <div key={day.dateTime} className="relative lg:pl-8">
                  <DiamondIcon
                    className={clsx(
                      "absolute left-[-0.5px] top-[0.5625rem] hidden h-1.5 w-1.5 overflow-visible lg:block",
                      dayIndex === 0
                        ? "fill-blue-600 stroke-blue-600"
                        : "fill-transparent stroke-slate-400"
                    )}
                  />
                  <div className="relative">
                    <div
                      className={clsx(
                        "font-mono text-sm",
                        dayIndex === 0 ? "text-blue-600" : "text-slate-500"
                      )}
                    >
                      <Tab className="[&:not(:focus-visible)]:focus:outline-none">
                        <span className="absolute inset-0" />
                        {day.name}
                      </Tab>
                    </div>
                    <time
                      dateTime={day.dateTime}
                      className="mt-1.5 block text-2xl font-semibold tracking-tight text-blue-900"
                    >
                      {day.date}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-16 md:grid-cols-3 [&:not(:focus-visible)]:focus:outline-none">
              {tokensData &&
                tokensData.filter(defined).map((token, index) => (
                  <div key={index}>
                    <div className="group relative transform overflow-hidden rounded-4xl">
                      <div
                        className={clsx(
                          "absolute bottom-6 left-0 right-4 top-0 aspect-square rounded-4xl border transition duration-300 xl:right-6",
                          [
                            "border-blue-300",
                            "border-indigo-300",
                            "border-sky-300",
                          ][index % 3]
                        )}
                      />
                      <div className="relative inset-0 aspect-square max-w-[480px] bg-indigo-50">
                        {token && <Picli {...{ token }} />}
                      </div>
                    </div>
                    <h3 className="mt-8 font-display text-xl font-bold tracking-tight text-slate-900">
                      {token && token.privacy === "public"
                        ? token.name
                        : "Private"}
                    </h3>
                    <p className="mt-1 text-base tracking-tight text-slate-500">
                      {token && token.privacy === "public"
                        ? token.description
                        : "Private"}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </Tab.Group>
      </Container>
    </section>
  );
}
