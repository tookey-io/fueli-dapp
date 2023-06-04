import { Address } from "viem";

export type Deployment = {
  startBlock: number;
  picli: Address;
  fueli: Address;
  minter: Address;
};

export const deployments: Partial<Record<number, Deployment>> = {
  361: {
    startBlock: 20729513,
    fueli: "0xe5CF7D6eF5eF210b77a66b1E622a8a632FAb8542",
    picli: "0xe6176a8F8b5166E2Eb91d7dCA7E88C7C71B0B2e9",
    minter: "0xFad1B93D95a980D883631f816Ae5111D4737f46F",
  },
  1337: {
    startBlock: 0,
    fueli: "0x6fCC03Bd5d18e875a7E09Fc90ab41D66be1f6E2c",
    picli: "0x455c8b23db52dcAa249b3C01610CAD886a5271B9",
    minter: "0xD6729e9109c78dfA444Ac967C1A3Bf242748d1A6",
  },
};
