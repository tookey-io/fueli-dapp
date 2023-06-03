/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IERC20Mint,
  IERC20MintInterface,
} from "../../../contracts/Minter.sol/IERC20Mint";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IERC20Mint__factory {
  static readonly abi = _abi;
  static createInterface(): IERC20MintInterface {
    return new utils.Interface(_abi) as IERC20MintInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC20Mint {
    return new Contract(address, _abi, signerOrProvider) as IERC20Mint;
  }
}