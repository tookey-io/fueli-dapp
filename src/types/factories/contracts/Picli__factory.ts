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
      {
        internalType: "bool",
        name: "privacy",
        type: "bool",
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
        internalType: "bool",
        name: "privacy",
        type: "bool",
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
  "0x608034620003e35760406001600160401b0382820181811184821017620003cd578252600e83526020906d4675656c6920506963747572657360901b8285015282519383850185811083821117620003cd57845260058552645049434c4960d81b83860152805191808311620003cd576000928354906001938483811c93168015620003c2575b87841014620003ae578190601f938481116200035b575b508790848311600114620002f7578792620002eb575b5050600019600383901b1c191690841b1784555b8651918211620002d75782548381811c91168015620002cc575b86821014620002b85781811162000270575b50849082116001146200020d57839495968293949262000201575b5050600019600383901b1c191690821b1781555b818052600a8352838220338352835260ff848320541615620001c9575b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a692838352600a8152848320338452815260ff8584205416156200018d575b84516126699081620003e98239f35b838352600a815284832090338452528382209060ff19825416179055339160008051602062002a52833981519152339280a4388080806200017e565b818052600a835283822033835283528382208160ff1982541617905533338360008051602062002a528339815191528180a46200013f565b0151905038806200010e565b82845284842090601f198316855b8181106200025a5750978385969798991062000240575b505050811b01815562000122565b015160001960f88460031b161c1916905538808062000232565b898301518455928501929187019187016200021b565b8385528585208280850160051c820192888610620002ae575b0160051c019084905b828110620002a2575050620000f3565b86815501849062000292565b9250819262000289565b634e487b7160e01b85526022600452602485fd5b90607f1690620000e1565b634e487b7160e01b84526041600452602484fd5b015190503880620000b3565b8780528888208794509190601f198416895b8b8282106200034457505084116200032a575b505050811b018455620000c7565b015160001960f88460031b161c191690553880806200031c565b8385015186558a9790950194938401930162000309565b9091508680528787208480850160051c8201928a8610620003a4575b918891869594930160051c01915b828110620003955750506200009d565b89815585945088910162000385565b9250819262000377565b634e487b7160e01b86526022600452602486fd5b92607f169262000086565b634e487b7160e01b600052604160045260246000fd5b600080fdfe608060408181526004918236101561001657600080fd5b600092833560e01c91826301ffc9a7146115235750816306fdde031461149c578163081812fc1461147c578163095ea7b31461130e57816318160ddd146112ef57816323b872dd146112ca578163248a9ca31461129f5781632f2ff15d146111f25781632f745c591461114657816336568abe146110b457816342842e0e146110805781634f6ccce714610fec5781636352211e14610fbb57816370a0823114610f8e57816391d1485414610f4757816395d89b4114610e85578163a217fddf14610e6a578163a22cb46514610d99578163aa46c4a014610938578163b88d4fde146108b2578163c87b56dd14610574578163cd5cfdaf146104bb578163d539139314610480578163d547741f1461043d578163d675cb4214610193575063e985e9c51461014357600080fd5b3461018f578060031936011261018f5760ff8160209361016161160a565b610169611625565b6001600160a01b0391821683526005875283832091168252855220549151911615158152f35b5080fd5b8391503461018f57606036600319011261018f576001600160401b038135602435828111610439576101c8903690850161174a565b90604435838111610435576101e0903690860161174a565b956101e9611848565b818652602091600b835260038288200184518681116104225790879392916102118254611768565b96601f978881116103ce575b508690888311600114610368578b91908361035d575b50508160011b916000199060031b1c19161790555b8752600b835286200193865193841161034a57506102668454611768565b82811161030a575b50809183116001146102a8575083948293949261029d575b50508160011b916000199060031b1c191617905580f35b015190508480610286565b90601f198316958486528286209286905b8882106102f2575050836001959697106102d9575b505050811b01905580f35b015160001960f88460031b161c191690558480806102ce565b806001859682949686015181550195019301906102b9565b8486528186208380860160051c820192848710610341575b0160051c01905b818110610336575061026e565b868155600101610329565b92508192610322565b634e487b7160e01b865260419052602485fd5b015190508c80610233565b838c52878c209190601f1984168d5b8a8282106103b557505090846001959493921061039c575b505050811b019055610248565b015160001960f88460031b161c191690558c808061038f565b8484015186558e9a506001909501949384019301610377565b90919280949596508b52868b208880850160051c820192898610610419575b908c98979695949392910160051c01905b81811061040b575061021d565b8c81558b97506001016103fe565b925081926103ed565b634e487b7160e01b895260418852602489fd5b8580fd5b8480fd5b9190503461047c578060031936011261047c5761047991356104746001610462611625565b93838752600a60205286200154611a63565b611b6e565b80f35b8280fd5b50503461018f578160031936011261018f57602090517f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a68152f35b82843461057157602036600319011261057157819083358152600b60205220906105658254926105576104f0600183016117a2565b95610549610500600285016117a2565b9560ff600561051c610514600389016117a2565b9588016117a2565b960154169661053c82519a8b9a8b5260c060208c015260c08b01906115e5565b91898303908a01526115e5565b9086820360608801526115e5565b9084820360808601526115e5565b90151560a08301520390f35b80fd5b8391503461018f57602091826003193601126105715760219082356105a061059b826120c8565b611c5b565b8152600b8452848120600581015460ff161561088f5785516105c1816116a1565b60078152667072697661746560c81b86820152935b8154808472184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b80831015610882575b50886d04ee2d6d415b85acef810000000080851015610876575b5050662386f26fc1000080841015610869575b506305f5e1008084101561085c575b508361271080851015610850575b50506064831015610842575b600a8093101561083a575b6001968161066b898094016124ab565b9750870101905b61080b575b505087516f03d913730b6b2911d10112934b1b434960851b888201529586959091506106a99060308701908501612428565b72111610113232b9b1b934b83a34b7b7111d101160691b81526106d29060130160028501612428565b6c1116101134b6b0b3b2911d101160991b81526106f590600d0160038501612428565b6e11161011383934bb30b1bc911d101160891b815281519161071f908390600f8401908b016115c2565b0174111610113a3930b739b1b7b232b22fb4b2111d101160591b600f82015260240191019061074d91612428565b6c111610113b30b63ab2911d101160991b8152815191610775908390600d84019088016115c2565b0161227d60f01b600d8201520360101981018252600f0161079690826116d7565b61079f906124dd565b91805180938382017f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c00000090528051908185603d85019201916107df926115c2565b810103601d81018452603d016107f590846116d7565b519181839283528201610807916115e5565b0390f35b600019019082906f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353049086826106725750610677565b60010161065b565b916064600291049201610650565b9093049201838b610644565b600891930492018a610636565b601091930492018a610627565b9093049201888b610614565b820492508990508a6105fa565b855161089a816116a1565b60068152657075626c696360d01b86820152936105d6565b83903461018f57608036600319011261018f576108cd61160a565b906108d6611625565b91604435606435936001600160401b0385116104355736602386011215610435576109106109339486602461047998369301359101611713565b9261092361091e8433611dc1565b611cec565b61092e838383611e89565b612201565b611da1565b83833461018f5760a036600319011261018f5761095361160a565b6001600160401b03929060243584811161047c57610974903690870161174a565b94604435858111610d955761098c903690830161174a565b92608435151560843503610571576109a2611848565b60019384600c54019687600c55878352602098600b8a528688852060643581550190805190838211610d825781908c6109db8554611768565b601f8111610d30575b50508c908d601f8411600114610ccd57508792610cc2575b5050600019600383901b1c191690881b1790555b878352600b8952600287842001918051918211610caf578190610a338454611768565b601f8111610c5f575b508a90601f8311600114610bff578592610bf4575b5050600019600383901b1c191690861b1790555b858152600b8752610a896084356005878420019060ff801983541691151516179055565b845193610a9585611670565b8185526001600160a01b038416928315610bb357610abb610ab5896120c8565b156123dc565b60085488845260098a5287842081905590600160401b821015610ba05750610b9a9593889383610b1286610af9866109339b9883980160085561228c565b90919082549060031b91821b91600019901b1916179055565b610b1b85611be4565b83835260068d528a83208184528d52848b84205584835260078d528a832055610b46610ab5856120c8565b82825260038c528982208054909101905582815260028b5288812080546001600160a01b031916831790557fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a46120e5565b51908152f35b634e487b7160e01b845260419052602483fd5b606490898089519262461bcd60e51b845283015260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152fd5b015190508a80610a51565b8486528b86208994509190601f198416878e5b828210610c485750508411610c2f575b505050811b019055610a65565b015160001960f88460031b161c191690558a8080610c22565b8385015186558c979095019493840193018e610c12565b9091508385528a8520601f840160051c8101918c8510610ca5575b84939291601f8b920160051c01915b828110610c97575050610a3c565b8781558594508a9101610c89565b9091508190610c7a565b634e487b7160e01b845260418552602484fd5b015190508c806109fc565b91908b9450601f198416868a52838a20938a905b828210610d175750508411610cfe575b505050811b019055610a10565b015160001960f88460031b161c191690558c8080610cf1565b8484015186558e97909501949384019390810190610ce1565b858952818920929350601f850160051c830192918510610d78575b84939291601f8d920160051c01915b828110610d6a57508e91506109e4565b8981558594508c9101610d5a565b9091508190610d4b565b634e487b7160e01b865260418752602486fd5b8380fd5b9190503461047c578060031936011261047c57610db461160a565b9060243580151592838203610435576001600160a01b031693338514610e2b5750610dfe9033865260056020528286208587526020528286209060ff801983541691151516179055565b519081527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a380f35b606490602084519162461bcd60e51b8352820152601960248201527822a9219b99189d1030b8383937bb32903a379031b0b63632b960391b6044820152fd5b50503461018f578160031936011261018f5751908152602090f35b50503461018f578160031936011261018f57805190826001805490610ea982611768565b80865291818116908115610f1f5750600114610ee4575b505050610ed2826108079403836116d7565b519182916020835260208301906115e5565b80955082526020948583205b828410610f0c575050508261080794610ed29282010194610ec0565b8054868501880152928601928101610ef0565b6108079750610ed29450602092508693915060ff191682840152151560051b82010194610ec0565b90503461047c578160031936011261047c578160209360ff92610f68611625565b90358252600a86528282206001600160a01b039091168252855220549151911615158152f35b50503461018f57602036600319011261018f57602090610fb4610faf61160a565b611be4565b9051908152f35b8284346105715760203660031901126105715750610fdb60209235611ca2565b90516001600160a01b039091168152f35b9050823461057157602036600319011261057157508035906008548210156110285760208361101a8461228c565b91905490519160031b1c8152f35b608490602084519162461bcd60e51b8352820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b6064820152fd5b50503461018f57610933610479916110973661163b565b919251926110a484611670565b86845261092361091e8433611dc1565b8391503461018f578260031936011261018f576110cf611625565b90336001600160a01b038316036110eb57906104799135611b6e565b608490602085519162461bcd60e51b8352820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152fd5b82843461057157816003193601126105715761116061160a565b6024359061116d81611be4565b82101561119b576001600160a01b031682526006602090815283832091835290815290829020548251908152f35b835162461bcd60e51b8152602081870152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b6064820152608490fd5b90503461047c578160031936011261047c57359061120e611625565b90828452600a60205261122660018286200154611a63565b828452600a60209081528185206001600160a01b039093168086529290528084205460ff1615611254578380f35b828452600a6020528084208285526020528320600160ff1982541617905533917f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d8480a43880808380f35b90503461047c57602036600319011261047c5781602093600192358152600a85522001549051908152f35b8334610571576104796112dc3661163b565b916112ea61091e8433611dc1565b611e89565b50503461018f578160031936011261018f576020906008549051908152f35b90503461047c578160031936011261047c5761132861160a565b6024359290916001600160a01b039190828061134387611ca2565b1694169380851461142f57803314908115611410575b50156113a857848652602052842080546001600160a01b0319168317905561138083611ca2565b167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258480a480f35b6020608492519162461bcd60e51b8352820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c0000006064820152fd5b90508652600560205281862033875260205260ff828720541638611359565b506020608492519162461bcd60e51b8352820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152fd5b8284346105715760203660031901126105715750610fdb60209235611cc5565b50503461018f578160031936011261018f578051908280546114bd81611768565b80855290600190818116908115610f1f57506001146114e857505050610ed2826108079403836116d7565b94508180526020948583205b828410611510575050508261080794610ed29282010194610ec0565b80548685018801529286019281016114f4565b84913461047c57602036600319011261047c573563ffffffff60e01b811680910361047c5760209250637965db0b60e01b8114908115611565575b5015158152f35b63780e9d6360e01b81149150811561157f575b508361155e565b6380ac58cd60e01b8114915081156115b1575b81156115a0575b5083611578565b6301ffc9a760e01b14905083611599565b635b5e139f60e01b81149150611592565b60005b8381106115d55750506000910152565b81810151838201526020016115c5565b906020916115fe815180928185528580860191016115c2565b601f01601f1916010190565b600435906001600160a01b038216820361162057565b600080fd5b602435906001600160a01b038216820361162057565b6060906003190112611620576001600160a01b0390600435828116810361162057916024359081168103611620579060443590565b602081019081106001600160401b0382111761168b57604052565b634e487b7160e01b600052604160045260246000fd5b604081019081106001600160401b0382111761168b57604052565b608081019081106001600160401b0382111761168b57604052565b90601f801991011681019081106001600160401b0382111761168b57604052565b6001600160401b03811161168b57601f01601f191660200190565b92919261171f826116f8565b9161172d60405193846116d7565b829481845281830111611620578281602093846000960137010152565b9080601f830112156116205781602061176593359101611713565b90565b90600182811c92168015611798575b602083101461178257565b634e487b7160e01b600052602260045260246000fd5b91607f1691611777565b90604051918260008254926117b684611768565b90818452600194858116908160001461182557506001146117e2575b50506117e0925003836116d7565b565b9093915060005260209081600020936000915b81831061180d5750506117e0935082010138806117d2565b855488840185015294850194879450918301916117f5565b9150506117e094506020925060ff191682840152151560051b82010138806117d2565b3360009081527faa1d7351356c4ddc11907b1ee0660f579cfdf507235af2ae01ecd22a4b7ceaae602090815260408083205490927f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a69160ff16156118ac5750505050565b6118b5336122ce565b918451906118c2826116bc565b60428252848201926060368537825115611a4f5760308453825190600191821015611a4f5790607860218501536041915b8183116119e15750505061199f57604861199b93869361197f93611970985198899376020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8a860152611947815180928c6037890191016115c2565b8401917001034b99036b4b9b9b4b733903937b6329607d1b6037840152518093868401906115c2565b010360288101875201856116d7565b5192839262461bcd60e51b8452600484015260248301906115e5565b0390fd5b60648486519062461bcd60e51b825280600483015260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b909192600f81166010811015611a3b576f181899199a1a9b1b9c1cb0b131b232b360811b901a611a1185876122bd565b5360041c928015611a27576000190191906118f3565b634e487b7160e01b82526011600452602482fd5b634e487b7160e01b83526032600452602483fd5b634e487b7160e01b81526032600452602490fd5b600090808252602090600a8252604092838120338252835260ff848220541615611a8d5750505050565b611a96336122ce565b91845190611aa3826116bc565b60428252848201926060368537825115611a4f5760308453825190600191821015611a4f5790607860218501536041915b818311611b285750505061199f57604861199b93869361197f93611970985198899376020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8a860152611947815180928c6037890191016115c2565b909192600f81166010811015611a3b576f181899199a1a9b1b9c1cb0b131b232b360811b901a611b5885876122bd565b5360041c928015611a2757600019019190611ad4565b90600091808352600a602052604083209160018060a01b03169182845260205260ff604084205416611b9f57505050565b808352600a602052604083208284526020526040832060ff1981541690557ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b339380a4565b6001600160a01b03168015611c0457600052600360205260406000205490565b60405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608490fd5b15611c6257565b60405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606490fd5b6000908152600260205260409020546001600160a01b0316611765811515611c5b565b611cd161059b826120c8565b6000908152600460205260409020546001600160a01b031690565b15611cf357565b60405162461bcd60e51b815260206004820152602d60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526c1c881bdc88185c1c1c9bdd9959609a1b6064820152608490fd5b60809060208152603260208201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60608201520190565b15611da857565b60405162461bcd60e51b81528061199b60048201611d4e565b906001600160a01b038080611dd584611ca2565b16931691838314938415611e08575b508315611df2575b50505090565b611dfe91929350611cc5565b1614388080611dec565b909350600052600560205260406000208260005260205260ff604060002054169238611de4565b15611e3657565b60405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608490fd5b611ead91611e9684611ca2565b6001600160a01b0393848416939185168414611e2f565b83821693841561207757839182611fbe575060085460008781526009602052604090208190559150600160401b82101561168b57611f1392611efa87610af985600189970160085561228c565b828603611f8b575b50611f0c86611ca2565b1614611e2f565b7fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600084815260046020526040812060018060a01b03199081815416905583825260036020526040822060001981540190558482526040822060018154019055858252600260205284604083209182541617905580a4565b611f9490611be4565b60406000878152600660205281812083825260205288828220558881526007602052205538611f02565b858303611fd0575b50611f1392611efa565b611fdb919250611be4565b60001981019190821161206157611f13928492600090888252602090600782526040918284205482810361202a575b508a84528383812055868452600681528284209184525281205592611fc6565b878552600682528385208386528252838520548886526006835284862082875283528085872055855260078252838520553861200a565b634e487b7160e01b600052601160045260246000fd5b60405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608490fd5b6000908152600260205260409020546001600160a01b0316151590565b9192600092909190803b156121f757612133946040518092630a85bd0160e11b9485835233600484015287602484015260448301526080606483015281878160209a8b9660848301906115e5565b03926001600160a01b03165af18491816121b7575b506121a6575050503d60001461219e573d612162816116f8565b9061217060405192836116d7565b81528091833d92013e5b8051918261219b5760405162461bcd60e51b81528061199b60048201611d4e565b01fd5b50606061217a565b6001600160e01b0319161492509050565b9091508581813d83116121f0575b6121cf81836116d7565b8101031261043957516001600160e01b031981168103610439579038612148565b503d6121c5565b5050915050600190565b9293600093909291803b156122815794849161225b9660405180948193630a85bd0160e11b9788845233600485015260018060a01b0380921660248501526044840152608060648401528260209b8c9760848301906115e5565b0393165af18491816121b757506121a6575050503d60001461219e573d612162816116f8565b505050915050600190565b6008548110156122a757600860005260206000200190600090565b634e487b7160e01b600052603260045260246000fd5b9081518110156122a7570160200190565b60405190606082018281106001600160401b0382111761168b57604052602a82526020820160403682378251156122a7576030905381516001908110156122a757607860218401536029905b80821161236e57505061232a5790565b606460405162461bcd60e51b815260206004820152602060248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b9091600f811660108110156123c7576f181899199a1a9b1b9c1cb0b131b232b360811b901a61239d84866122bd565b5360041c9180156123b257600019019061231a565b60246000634e487b7160e01b81526011600452fd5b60246000634e487b7160e01b81526032600452fd5b156123e357565b60405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606490fd5b60009291815461243781611768565b926001918083169081156124905750600114612454575b50505050565b90919293945060005260209081600020906000915b85831061247f575050505001903880808061244e565b805485840152918301918101612469565b60ff191684525050508115159091020191503880808061244e565b906124b5826116f8565b6124c260405191826116d7565b82815280926124d3601f19916116f8565b0190602036910137565b80511561261f57604051606081018181106001600160401b0382111761168b57604052604081527f4142434445464748494a4b4c4d4e4f505152535455565758595a61626364656660208201527f6768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2f60408201528151600292838201809211612061576003918290046001600160fe1b038116810361206157612582908594951b6124ab565b936020850193829183518401925b8381106125ce57505050505106806001146125bb576002146125b0575090565b603d90600019015390565b50603d9081600019820153600119015390565b85600491979293949701918251600190603f9082828260121c16880101518453828282600c1c16880101518385015382828260061c1688010151888501531685010151878201530195929190612590565b5060405161262c81611670565b600081529056fea2646970667358221220af14207c5e75b60cd7ae4ad09ed2d51aab293d0db63db428779ecf7dc9d9bbaf64736f6c634300081300332f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d";

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
