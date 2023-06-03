/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IERC721Mint,
  IERC721MintInterface,
} from "../../../contracts/Minter.sol/IERC721Mint";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IERC721Mint__factory {
  static readonly abi = _abi;
  static createInterface(): IERC721MintInterface {
    return new utils.Interface(_abi) as IERC721MintInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC721Mint {
    return new Contract(address, _abi, signerOrProvider) as IERC721Mint;
  }
}
