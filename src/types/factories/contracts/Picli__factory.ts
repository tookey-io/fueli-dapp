/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Picli, PicliInterface } from "../../contracts/Picli";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "prompt",
        type: "string",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "init",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "image",
        type: "string",
      },
      {
        internalType: "string",
        name: "videoId",
        type: "string",
      },
      {
        internalType: "string",
        name: "videoUrl",
        type: "string",
      },
    ],
    name: "inject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "meta",
    outputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "prompt",
        type: "string",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        internalType: "string",
        name: "image",
        type: "string",
      },
      {
        internalType: "string",
        name: "videoId",
        type: "string",
      },
      {
        internalType: "string",
        name: "videoUrl",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608034620003f7576040906001600160401b0381830181811183821017620003e1578352600e82526020906d4675656c6920506963747572657360901b8284015283519084820182811082821117620003e157855260058252645049434c4960d81b838301528351818111620003e1576000928354916001968784811c94168015620003d6575b87851014620003c2578190601f948581116200036f575b5087908583116001146200030b578792620002ff575b5050600019600383901b1c191690871b1784555b8051928311620002eb5785548681811c91168015620002e0575b86821014620002cc579081838594931162000277575b50859183116001146200021357849262000207575b5050600019600383901b1c191690841b1783555b808052600a8252838120338252825260ff848220541615620001cf575b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a691828252600a8152848220338352815260ff85832054161562000194575b505050600c5401600c55516126ba9081620003fd8239f35b828252600a815284822090338352528381208360ff19825416179055339160008051602062002ab7833981519152339280a43880806200017c565b808052600a825283812033825282528381208360ff1982541617905533338260008051602062002ab78339815191528180a46200013d565b0151905038806200010c565b8685528585208794509190601f198416865b8882821062000260575050841162000246575b505050811b01835562000120565b015160001960f88460031b161c1916905538808062000238565b8385015186558a9790950194938401930162000225565b909192508685528585208380860160051c820192888710620002c2575b9186958a929594930160051c01915b828110620002b3575050620000f7565b878155869550899101620002a3565b9250819262000294565b634e487b7160e01b85526022600452602485fd5b90607f1690620000e1565b634e487b7160e01b84526041600452602484fd5b015190503880620000b3565b8780528888208a94509190601f198416895b8b8282106200035857505084116200033e575b505050811b018455620000c7565b015160001960f88460031b161c1916905538808062000330565b8385015186558d979095019493840193016200031d565b9091508680528787208580850160051c8201928a8610620003b8575b918b91869594930160051c01915b828110620003a95750506200009d565b8981558594508b910162000399565b925081926200038b565b634e487b7160e01b86526022600452602486fd5b93607f169362000086565b634e487b7160e01b600052604160045260246000fd5b600080fdfe608060408181526004918236101561001657600080fd5b600092833560e01c91826301ffc9a71461158f5750816306fdde0314611508578163081812fc146114e8578163095ea7b31461137a57816318160ddd1461135b57816323b872dd14611336578163248a9ca31461130b5781632f2ff15d1461125e5781632f745c59146111b257816336568abe1461112057816342842e0e146110ec5781634f6ccce7146110585781636352211e1461102757816370a0823114610ffa57816391d1485414610fb357816395d89b4114610ef1578163a217fddf14610ed6578163a22cb46514610e0e578163b88d4fde14610d8d578163c87b56dd14610ac5578163ccb993f81461070b578163cd5cfdaf14610645578163d2209ad914610211578163d5391393146101d6578163d547741f14610193575063e985e9c51461014357600080fd5b3461018f578060031936011261018f5760ff81602093610161611676565b610169611691565b6001600160a01b0391821683526005875283832091168252855220549151911615158152f35b5080fd5b919050346101d257806003193601126101d2576101cf91356101ca60016101b8611691565b93838752600a60205286200154611ab4565b611bbf565b80f35b8280fd5b50503461018f578160031936011261018f57602090517f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a68152f35b83833461018f57608036600319011261018f5761022c611676565b6001600160401b0393906024358581116106415761024d903690840161179b565b9160443586811161063d57610265903690830161179b565b9461026e611899565b600c5495868252602097600b895286832095606435875560018097019080519083821161062a5781908c6102a285546117b9565b601f81116105d8575b50508c908d601f84116001146105755750879261056a575b5050600019600383901b1c191690881b1790555b878352600b89526002878420019180519182116105575781906102fa84546117b9565b601f8111610507575b508a90601f83116001146104a757859261049c575b5050600019600383901b1c191690861b1790555b845193610338856116dc565b8185526001600160a01b03841692831561045b5761035e61035889612119565b1561242d565b60085488845260098a5287842081905590600160401b821015610448575061044295938893836103b58661039c8661043d9b988398016008556122dd565b90919082549060031b91821b91600019901b1916179055565b6103be85611c35565b83835260068d528a83208184528d52848b84205584835260078d528a8320556103e961035885612119565b82825260038c528982208054909101905582815260028b5288812080546001600160a01b031916831790557fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a4612136565b611df2565b51908152f35b634e487b7160e01b845260419052602483fd5b606490898089519262461bcd60e51b845283015260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152fd5b015190508a80610318565b8486528b86208994509190601f198416878e5b8282106104f057505084116104d7575b505050811b01905561032c565b015160001960f88460031b161c191690558a80806104ca565b8385015186558c979095019493840193018e6104ba565b9091508385528a8520601f840160051c8101918c851061054d575b84939291601f8b920160051c01915b82811061053f575050610303565b8781558594508a9101610531565b9091508190610522565b634e487b7160e01b845260418552602484fd5b015190508c806102c3565b91908b9450601f198416868a52838a20938a905b8282106105bf57505084116105a6575b505050811b0190556102d7565b015160001960f88460031b161c191690558c8080610599565b8484015186558e97909501949384019390810190610589565b858952818920929350601f850160051c830192918510610620575b84939291601f8d920160051c01915b82811061061257508e91506102ab565b8981558594508c9101610602565b90915081906105f3565b634e487b7160e01b865260418752602486fd5b8580fd5b8480fd5b82843461070857602036600319011261070857816107049184358152600b60205220916106f68354936106e861067d600183016117f3565b966106da61068d600285016117f3565b956106b160056106aa6106a2600389016117f3565b9588016117f3565b96016117f3565b966106cd82519b8c9b8c5260c060208d015260c08c0190611651565b918a8303908b0152611651565b908782036060890152611651565b908582036080870152611651565b9083820360a0850152611651565b0390f35b80fd5b8391503461018f57608036600319011261018f576001600160401b03813560243582811161064157610740903690850161179b565b60443583811161063d57610757903690860161179b565b91606435848111610ac15761076f903690870161179b565b96610778611899565b818752602091600b835260039485838a200185518881116109f3578061079e83546117b9565b97601f98898111610a73575b5087908d8a8411600114610a115792610a06575b50508160011b91600019908a1b1c19161790555b818952600b845287838a2001908051908882116109f3576107f383546117b9565b8781116109b3575b50859087831160011461094c57600595949392918c9183610941575b50508160011b91600019908a1b1c19161790555b8852600b835287200194875194851161092e575061084985546117b9565b8281116108ee575b5080918411600114610889575084958394959361087e575b50508260011b92600019911b1c191617905580f35b015191508580610869565b9190601f198416968587528387209387905b8982106108d6575050846001969798106108bc575b50505050811b01905580f35b01519060f884600019921b161c19169055848080806108b0565b8060018597829496860151815501960193019061089b565b8587528187208380870160051c820192848810610925575b0160051c01905b81811061091a5750610851565b87815560010161090d565b92508192610906565b634e487b7160e01b875260419052602486fd5b015190508d80610817565b838c52868c209190601f1984168d5b8982821061099d5750509160019391856005999897969410610985575b505050811b01905561082b565b0151600019838c1b60f8161c191690558d8080610978565b600185968293968601518155019501930161095b565b838c52868c208880850160051c8201928986106109ea575b0160051c01905b8181106109df57506107fb565b8c81556001016109d2565b925081926109cb565b634e487b7160e01b8b5260418a5260248bfd5b015190508d806107be565b8581528981209350601f198516905b8a828210610a5d575050908460019594939210610a45575b505050811b0190556107d2565b0151600019838c1b60f8161c191690558d8080610a38565b6001859682939686015181550195019301610a20565b909150838d52878d208980850160051c8201928a8610610ab8575b859493910160051c909101908e5b828210610aaa5750506107aa565b81558493506001018e610a9c565b92508192610a8e565b8680fd5b8391503461018f5760209182600319360112610708576021908235610af1610aec82612119565b611cac565b8152600b84528481209284868554808572184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b80831015610d80575b50846d04ee2d6d415b85acef810000000080851015610d74575b5050662386f26fc1000080841015610d67575b506305f5e10080841015610d5a575b508561271080851015610d4e575b50506064831015610d40575b600a80931015610d38575b60019781610b928a8094016124fc565b9850880101905b610d04575b50505093610be993610c5e61070497610c9f956015610c3b81610c16600f99610ca49d519c8d9a6f03d913730b6b2911d10112934b1b434960851b838d015260308c01908901612479565b7f222c20226465736372697074696f6e223a2022222c2022696d616765223a202281520160038701612479565b741116101130b734b6b0ba34b7b72fbab936111d101160591b81520160058501612479565b74111610113a3930b739b1b7b232b22fb4b2111d101160591b8152019101612479565b6c111610113b30b63ab2911d101160991b8152610c84825180938b600d8501910161162e565b0161227d60f01b600d82015203601019810184520182611728565b61252e565b92610cf5603d825180967f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c00000087830152610ce58151809289868601910161162e565b810103601d810187520185611728565b51928284938452830190611651565b600019019082906f181899199a1a9b1b9c1cb0b131b232b360811b8282061a835304908115610d335787610b99565b610b9e565b600101610b82565b916064600291049201610b77565b9093049201858c610b6b565b600891930492018b610b5d565b601091930492018b610b4e565b9093049201848c610b3b565b820492508390508b610b21565b83903461018f57608036600319011261018f57610da8611676565b90610db1611691565b91604435606435936001600160401b03851161063d573660238601121561063d57610deb61043d948660246101cf98369301359101611764565b92610dfe610df98433611e12565b611d3d565b610e09838383611eda565b612252565b919050346101d257806003193601126101d257610e29611676565b9060243591821515809303610641576001600160a01b031692338414610e985750338452600560205280842083855260205280842060ff1981541660ff8416179055519081527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a380f35b6020606492519162461bcd60e51b8352820152601960248201527822a9219b99189d1030b8383937bb32903a379031b0b63632b960391b6044820152fd5b50503461018f578160031936011261018f5751908152602090f35b50503461018f578160031936011261018f57805190826001805490610f15826117b9565b80865291818116908115610f8b5750600114610f50575b505050610f3e82610704940383611728565b51918291602083526020830190611651565b80955082526020948583205b828410610f78575050508261070494610f3e9282010194610f2c565b8054868501880152928601928101610f5c565b6107049750610f3e9450602092508693915060ff191682840152151560051b82010194610f2c565b9050346101d257816003193601126101d2578160209360ff92610fd4611691565b90358252600a86528282206001600160a01b039091168252855220549151911615158152f35b50503461018f57602036600319011261018f5760209061102061101b611676565b611c35565b9051908152f35b828434610708576020366003190112610708575061104760209235611cf3565b90516001600160a01b039091168152f35b90508234610708576020366003190112610708575080359060085482101561109457602083611086846122dd565b91905490519160031b1c8152f35b608490602084519162461bcd60e51b8352820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b6064820152fd5b50503461018f5761043d6101cf91611103366116a7565b91925192611110846116dc565b868452610dfe610df98433611e12565b8391503461018f578260031936011261018f5761113b611691565b90336001600160a01b0383160361115757906101cf9135611bbf565b608490602085519162461bcd60e51b8352820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152fd5b8284346107085781600319360112610708576111cc611676565b602435906111d981611c35565b821015611207576001600160a01b031682526006602090815283832091835290815290829020548251908152f35b835162461bcd60e51b8152602081870152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b6064820152608490fd5b9050346101d257816003193601126101d257359061127a611691565b90828452600a60205261129260018286200154611ab4565b828452600a60209081528185206001600160a01b039093168086529290528084205460ff16156112c0578380f35b828452600a6020528084208285526020528320600160ff1982541617905533917f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d8480a43880808380f35b9050346101d25760203660031901126101d25781602093600192358152600a85522001549051908152f35b8334610708576101cf611348366116a7565b91611356610df98433611e12565b611eda565b50503461018f578160031936011261018f576020906008549051908152f35b9050346101d257816003193601126101d257611394611676565b6024359290916001600160a01b03919082806113af87611cf3565b1694169380851461149b5780331490811561147c575b501561141457848652602052842080546001600160a01b031916831790556113ec83611cf3565b167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258480a480f35b6020608492519162461bcd60e51b8352820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c0000006064820152fd5b90508652600560205281862033875260205260ff8287205416386113c5565b506020608492519162461bcd60e51b8352820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152fd5b828434610708576020366003190112610708575061104760209235611d16565b50503461018f578160031936011261018f57805190828054611529816117b9565b80855290600190818116908115610f8b575060011461155457505050610f3e82610704940383611728565b94508180526020948583205b82841061157c575050508261070494610f3e9282010194610f2c565b8054868501880152928601928101611560565b8491346101d25760203660031901126101d2573563ffffffff60e01b81168091036101d25760209250637965db0b60e01b81149081156115d1575b5015158152f35b63780e9d6360e01b8114915081156115eb575b50836115ca565b6380ac58cd60e01b81149150811561161d575b811561160c575b50836115e4565b6301ffc9a760e01b14905083611605565b635b5e139f60e01b811491506115fe565b60005b8381106116415750506000910152565b8181015183820152602001611631565b9060209161166a8151809281855285808601910161162e565b601f01601f1916010190565b600435906001600160a01b038216820361168c57565b600080fd5b602435906001600160a01b038216820361168c57565b606090600319011261168c576001600160a01b0390600435828116810361168c5791602435908116810361168c579060443590565b602081019081106001600160401b038211176116f757604052565b634e487b7160e01b600052604160045260246000fd5b608081019081106001600160401b038211176116f757604052565b90601f801991011681019081106001600160401b038211176116f757604052565b6001600160401b0381116116f757601f01601f191660200190565b92919261177082611749565b9161177e6040519384611728565b82948184528183011161168c578281602093846000960137010152565b9080601f8301121561168c578160206117b693359101611764565b90565b90600182811c921680156117e9575b60208310146117d357565b634e487b7160e01b600052602260045260246000fd5b91607f16916117c8565b9060405191826000825492611807846117b9565b9081845260019485811690816000146118765750600114611833575b505061183192500383611728565b565b9093915060005260209081600020936000915b81831061185e57505061183193508201013880611823565b85548884018501529485019487945091830191611846565b91505061183194506020925060ff191682840152151560051b8201013880611823565b3360009081527faa1d7351356c4ddc11907b1ee0660f579cfdf507235af2ae01ecd22a4b7ceaae602090815260408083205490927f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a69160ff16156118fd5750505050565b6119063361231f565b918451906119138261170d565b60428252848201926060368537825115611aa05760308453825190600191821015611aa05790607860218501536041915b818311611a32575050506119f05760486119ec9386936119d0936119c1985198899376020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8a860152611998815180928c60378901910161162e565b8401917001034b99036b4b9b9b4b733903937b6329607d1b60378401525180938684019061162e565b01036028810187520185611728565b5192839262461bcd60e51b845260048401526024830190611651565b0390fd5b60648486519062461bcd60e51b825280600483015260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b909192600f81166010811015611a8c576f181899199a1a9b1b9c1cb0b131b232b360811b901a611a62858761230e565b5360041c928015611a7857600019019190611944565b634e487b7160e01b82526011600452602482fd5b634e487b7160e01b83526032600452602483fd5b634e487b7160e01b81526032600452602490fd5b600090808252602090600a8252604092838120338252835260ff848220541615611ade5750505050565b611ae73361231f565b91845190611af48261170d565b60428252848201926060368537825115611aa05760308453825190600191821015611aa05790607860218501536041915b818311611b79575050506119f05760486119ec9386936119d0936119c1985198899376020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8a860152611998815180928c60378901910161162e565b909192600f81166010811015611a8c576f181899199a1a9b1b9c1cb0b131b232b360811b901a611ba9858761230e565b5360041c928015611a7857600019019190611b25565b90600091808352600a602052604083209160018060a01b03169182845260205260ff604084205416611bf057505050565b808352600a602052604083208284526020526040832060ff1981541690557ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b339380a4565b6001600160a01b03168015611c5557600052600360205260406000205490565b60405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608490fd5b15611cb357565b60405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606490fd5b6000908152600260205260409020546001600160a01b03166117b6811515611cac565b611d22610aec82612119565b6000908152600460205260409020546001600160a01b031690565b15611d4457565b60405162461bcd60e51b815260206004820152602d60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526c1c881bdc88185c1c1c9bdd9959609a1b6064820152608490fd5b60809060208152603260208201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60608201520190565b15611df957565b60405162461bcd60e51b8152806119ec60048201611d9f565b906001600160a01b038080611e2684611cf3565b16931691838314938415611e59575b508315611e43575b50505090565b611e4f91929350611d16565b1614388080611e3d565b909350600052600560205260406000208260005260205260ff604060002054169238611e35565b15611e8757565b60405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608490fd5b611efe91611ee784611cf3565b6001600160a01b0393848416939185168414611e80565b8382169384156120c85783918261200f575060085460008781526009602052604090208190559150600160401b8210156116f757611f6492611f4b8761039c8560018997016008556122dd565b828603611fdc575b50611f5d86611cf3565b1614611e80565b7fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600084815260046020526040812060018060a01b03199081815416905583825260036020526040822060001981540190558482526040822060018154019055858252600260205284604083209182541617905580a4565b611fe590611c35565b60406000878152600660205281812083825260205288828220558881526007602052205538611f53565b858303612021575b50611f6492611f4b565b61202c919250611c35565b6000198101919082116120b257611f64928492600090888252602090600782526040918284205482810361207b575b508a84528383812055868452600681528284209184525281205592612017565b878552600682528385208386528252838520548886526006835284862082875283528085872055855260078252838520553861205b565b634e487b7160e01b600052601160045260246000fd5b60405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608490fd5b6000908152600260205260409020546001600160a01b0316151590565b9192600092909190803b1561224857612184946040518092630a85bd0160e11b9485835233600484015287602484015260448301526080606483015281878160209a8b966084830190611651565b03926001600160a01b03165af1849181612208575b506121f7575050503d6000146121ef573d6121b381611749565b906121c16040519283611728565b81528091833d92013e5b805191826121ec5760405162461bcd60e51b8152806119ec60048201611d9f565b01fd5b5060606121cb565b6001600160e01b0319161492509050565b9091508581813d8311612241575b6122208183611728565b8101031261064157516001600160e01b031981168103610641579038612199565b503d612216565b5050915050600190565b9293600093909291803b156122d2579484916122ac9660405180948193630a85bd0160e11b9788845233600485015260018060a01b0380921660248501526044840152608060648401528260209b8c976084830190611651565b0393165af184918161220857506121f7575050503d6000146121ef573d6121b381611749565b505050915050600190565b6008548110156122f857600860005260206000200190600090565b634e487b7160e01b600052603260045260246000fd5b9081518110156122f8570160200190565b60405190606082018281106001600160401b038211176116f757604052602a82526020820160403682378251156122f8576030905381516001908110156122f857607860218401536029905b8082116123bf57505061237b5790565b606460405162461bcd60e51b815260206004820152602060248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b9091600f81166010811015612418576f181899199a1a9b1b9c1cb0b131b232b360811b901a6123ee848661230e565b5360041c91801561240357600019019061236b565b60246000634e487b7160e01b81526011600452fd5b60246000634e487b7160e01b81526032600452fd5b1561243457565b60405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606490fd5b600092918154612488816117b9565b926001918083169081156124e157506001146124a5575b50505050565b90919293945060005260209081600020906000915b8583106124d0575050505001903880808061249f565b8054858401529183019181016124ba565b60ff191684525050508115159091020191503880808061249f565b9061250682611749565b6125136040519182611728565b8281528092612524601f1991611749565b0190602036910137565b80511561267057604051606081018181106001600160401b038211176116f757604052604081527f4142434445464748494a4b4c4d4e4f505152535455565758595a61626364656660208201527f6768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2f604082015281516002928382018092116120b2576003918290046001600160fe1b03811681036120b2576125d3908594951b6124fc565b936020850193829183518401925b83811061261f575050505051068060011461260c57600214612601575090565b603d90600019015390565b50603d9081600019820153600119015390565b85600491979293949701918251600190603f9082828260121c16880101518453828282600c1c16880101518385015382828260061c16880101518885015316850101518782015301959291906125e1565b5060405161267d816116dc565b600081529056fea2646970667358221220f9a24da6bb88374daca6be911d96e7877ed50da975da947fc4ea4b417726a22d64736f6c634300081300332f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d";

type PicliConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PicliConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Picli__factory extends ContractFactory {
  constructor(...args: PicliConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Picli> {
    return super.deploy(overrides || {}) as Promise<Picli>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Picli {
    return super.attach(address) as Picli;
  }
  override connect(signer: Signer): Picli__factory {
    return super.connect(signer) as Picli__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PicliInterface {
    return new utils.Interface(_abi) as PicliInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Picli {
    return new Contract(address, _abi, signerOrProvider) as Picli;
  }
}