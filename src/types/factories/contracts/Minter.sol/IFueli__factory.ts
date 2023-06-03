/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IFueli,
  IFueliInterface,
} from "../../../contracts/Minter.sol/IFueli";

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

export class IFueli__factory {
  static readonly abi = _abi;
  static createInterface(): IFueliInterface {
    return new utils.Interface(_abi) as IFueliInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IFueli {
    return new Contract(address, _abi, signerOrProvider) as IFueli;
  }
}
