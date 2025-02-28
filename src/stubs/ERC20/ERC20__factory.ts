import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { PromiseOrValue } from "@masa-finance/masa-contracts-identity/dist/typechain/common";
import { Contract, ContractFactory, Overrides, Signer, utils } from "ethers";

import { ERC20, ERC20Interface } from "./ERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
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
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
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
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
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
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000cfb38038062000cfb833981016040819052620000349162000187565b81516200004990600390602085019062000068565b5080516200005f90600490602084019062000068565b5050506200031c565b828054620000769062000283565b90600052602060002090601f0160209004810192826200009a5760008555620000e5565b82601f10620000b557805160ff1916838001178555620000e5565b82800160010185558215620000e5579182015b82811115620000e5578251825591602001919060010190620000c8565b50620000f3929150620000f7565b5090565b5b80821115620000f35760008155600101620000f8565b6000620001256200011f8462000220565b62000201565b905082815260208101848484011115620001425762000142600080fd5b6200014f84828562000250565b509392505050565b600082601f8301126200016d576200016d600080fd5b81516200017f8482602086016200010e565b949350505050565b600080604083850312156200019f576200019f600080fd5b82516001600160401b03811115620001ba57620001ba600080fd5b620001c88582860162000157565b92505060208301516001600160401b03811115620001e957620001e9600080fd5b620001f78582860162000157565b9150509250929050565b60006200020d60405190565b90506200021b8282620002b4565b919050565b60006001600160401b038211156200023c576200023c620002fc565b620002478262000312565b60200192915050565b60005b838110156200026d57818101518382015260200162000253565b838111156200027d576000848401525b50505050565b6002810460018216806200029857607f821691505b60208210811415620002ae57620002ae620002e6565b50919050565b620002bf8262000312565b81018181106001600160401b0382111715620002df57620002df620002fc565b6040525050565b634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b601f01601f191690565b6109cf806200032c6000396000f3fe608060405234801561001057600080fd5b50600436106100995760003560e01c806306fdde031461009e578063095ea7b3146100bc57806318160ddd146100dc57806323b872dd146100ed578063313ce56714610100578063395093511461010f57806370a082311461012257806395d89b411461014b578063a457c2d714610153578063a9059cbb14610166578063dd62ed3e14610179575b600080fd5b6100a661018c565b6040516100b391906107ff565b60405180910390f35b6100cf6100ca3660046105e9565b61021e565b6040516100b391906107f1565b6002545b6040516100b391906108b2565b6100cf6100fb366004610599565b610238565b60126040516100b391906108c0565b6100cf61011d3660046105e9565b61025c565b6100e0610130366004610533565b6001600160a01b031660009081526020819052604090205490565b6100a661027e565b6100cf6101613660046105e9565b61028d565b6100cf6101743660046105e9565b6102d3565b6100e061018736600461055c565b6102e1565b60606003805461019b90610923565b80601f01602080910402602001604051908101604052809291908181526020018280546101c790610923565b80156102145780601f106101e957610100808354040283529160200191610214565b820191906000526020600020905b8154815290600101906020018083116101f757829003601f168201915b5050505050905090565b60003361022c81858561030c565b60019150505b92915050565b6000336102468582856103c0565b61025185858561040a565b506001949350505050565b60003361022c81858561026f83836102e1565b61027991906108ce565b61030c565b60606004805461019b90610923565b6000338161029b82866102e1565b9050838110156102c65760405162461bcd60e51b81526004016102bd906108a2565b60405180910390fd5b610251828686840361030c565b60003361022c81858561040a565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166103325760405162461bcd60e51b81526004016102bd90610892565b6001600160a01b0382166103585760405162461bcd60e51b81526004016102bd90610827565b6001600160a01b0380841660008181526001602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906103b39085906108b2565b60405180910390a3505050565b60006103cc84846102e1565b9050600019811461040457818110156103f75760405162461bcd60e51b81526004016102bd90610837565b610404848484840361030c565b50505050565b6001600160a01b0383166104305760405162461bcd60e51b81526004016102bd90610882565b6001600160a01b0382166104565760405162461bcd60e51b81526004016102bd90610817565b6001600160a01b0383166000908152602081905260409020548181101561048f5760405162461bcd60e51b81526004016102bd90610872565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906104c69084906108ce565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161051091906108b2565b60405180910390a3610404565b80356102328161097c565b803561023281610993565b60006020828403121561054857610548600080fd5b6000610554848461051d565b949350505050565b6000806040838503121561057257610572600080fd5b600061057e858561051d565b925050602061058f8582860161051d565b9150509250929050565b6000806000606084860312156105b1576105b1600080fd5b60006105bd868661051d565b93505060206105ce8682870161051d565b92505060406105df86828701610528565b9150509250925092565b600080604083850312156105ff576105ff600080fd5b600061060b858561051d565b925050602061058f85828601610528565b8015155b82525050565b6000610630825190565b8084526020840193506106478185602086016108f7565b601f01601f19169290920192915050565b602381526000602082017f45524332303a207472616e7366657220746f20746865207a65726f206164647281526265737360e81b602082015291505b5060400190565b602281526000602082017f45524332303a20617070726f766520746f20746865207a65726f206164647265815261737360f01b60208201529150610694565b602681526000602082017f45524332303a207472616e7366657220616d6f756e7420657863656564732062815265616c616e636560d01b60208201529150610694565b602581526000602082017f45524332303a207472616e736665722066726f6d20746865207a65726f206164815264647265737360d81b60208201529150610694565b602481526000602082017f45524332303a20617070726f76652066726f6d20746865207a65726f206164648152637265737360e01b60208201529150610694565b602581526000602082017f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77815264207a65726f60d81b60208201529150610694565b80610620565b60ff8116610620565b60208101610232828461061c565b602080825281016108108184610626565b9392505050565b6020808252810161023281610658565b602080825281016102328161069b565b6020808252810161023281601d81527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000602082015260400190565b60208082528101610232816106da565b602080825281016102328161071d565b602080825281016102328161075f565b60208082528101610232816107a0565b6020810161023282846107e2565b6020810161023282846107e8565b600082198211156108e1576108e1610950565b500190565b60006001600160a01b038216610232565b60005b838110156109125781810151838201526020016108fa565b838111156104045750506000910152565b60028104600182168061093757607f821691505b6020821081141561094a5761094a610966565b50919050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602260045260246000fd5b610985816108e6565b811461099057600080fd5b50565b8061098556fea2646970667358221220c82e4109432c4e4925a381e0bcc9fce830920732a1baa24afbdbe7dd1864b6ad64736f6c63430008070033";

type ERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20ConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20__factory extends ContractFactory {
  constructor(...args: ERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ERC20> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC20>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override attach(address: string): ERC20 {
    return super.attach(address) as ERC20;
  }
  override connect(signer: Signer): ERC20__factory {
    return super.connect(signer) as ERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20Interface {
    return new utils.Interface(_abi) as ERC20Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC20 {
    return new Contract(address, _abi, signerOrProvider) as ERC20;
  }
}
