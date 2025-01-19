/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Bet, BetInterface } from "../../contracts/Bet";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "player1",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "player2",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "resolved",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AlreadyPaid",
    type: "error",
  },
  {
    inputs: [],
    name: "BetAlreadyResolved",
    type: "error",
  },
  {
    inputs: [],
    name: "BetNotPaid",
    type: "error",
  },
  {
    inputs: [],
    name: "BetNotResolved",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidUser",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "betDetails",
    outputs: [
      {
        internalType: "address payable",
        name: "player1",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "player2",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "resolved",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "started",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "player1Paid",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "player2Paid",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fund",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBetDetails",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "player1",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "player2",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "resolved",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "started",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "player1Paid",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "player2Paid",
            type: "bool",
          },
        ],
        internalType: "struct Bet.BetDetails",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "health1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "health2",
        type: "uint256",
      },
    ],
    name: "resolveBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516116433803806116438339818101604052810190610032919061042b565b84600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036100a55760006040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161009c91906104b5565b60405180910390fd5b6100b48161025860201b60201c565b506040518061010001604052808573ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182151581526020016000151581526020016000815260200160001515815260200160001515815250600160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040820151816002015560608201518160030160006101000a81548160ff02191690831515021790555060808201518160030160016101000a81548160ff02191690831515021790555060a0820151816004015560c08201518160050160006101000a81548160ff02191690831515021790555060e08201518160050160016101000a81548160ff02191690831515021790555090505050505050506104d0565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061034c82610321565b9050919050565b61035c81610341565b811461036757600080fd5b50565b60008151905061037981610353565b92915050565b600061038a82610321565b9050919050565b61039a8161037f565b81146103a557600080fd5b50565b6000815190506103b781610391565b92915050565b6000819050919050565b6103d0816103bd565b81146103db57600080fd5b50565b6000815190506103ed816103c7565b92915050565b60008115159050919050565b610408816103f3565b811461041357600080fd5b50565b600081519050610425816103ff565b92915050565b600080600080600060a086880312156104475761044661031c565b5b60006104558882890161036a565b9550506020610466888289016103a8565b9450506040610477888289016103a8565b9350506060610488888289016103de565b925050608061049988828901610416565b9150509295509295909350565b6104af81610341565b82525050565b60006020820190506104ca60008301846104a6565b92915050565b611164806104df6000396000f3fe60806040526004361061007b5760003560e01c80638da5cb5b1161004e5780638da5cb5b1461011d578063b60d428814610148578063f2fde38b14610152578063fa6776db1461017b5761007b565b80635b36a67b146100805780635cb5804a146100b2578063715018a6146100db5780638a2fd029146100f2575b600080fd5b34801561008c57600080fd5b50610095610192565b6040516100a9989796959493929190610e4e565b60405180910390f35b3480156100be57600080fd5b506100d960048036038101906100d49190610efd565b61023c565b005b3480156100e757600080fd5b506100f0610525565b005b3480156100fe57600080fd5b50610107610539565b604051610114919061100c565b60405180910390f35b34801561012957600080fd5b50610132610680565b60405161013f9190611049565b60405180910390f35b6101506106a9565b005b34801561015e57600080fd5b5061017960048036038101906101749190611090565b610a0c565b005b34801561018757600080fd5b50610190610a92565b005b60018060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154908060030160009054906101000a900460ff16908060030160019054906101000a900460ff16908060040154908060050160009054906101000a900460ff16908060050160019054906101000a900460ff16905088565b600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141580156102ed57506001800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b15610324576040517ffd684c3b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160030160009054906101000a900460ff161561036d576040517e0bce4400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160030160019054906101000a900460ff166103b6576040517fb5820ebf00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000821180156103c65750600081115b156103fd576040517fb5820ebf00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018060030160006101000a81548160ff021916908315150217905550600082036104a3576001800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc600260016002015461047291906110ec565b9081150290604051600060405180830381858888f1935050505015801561049d573d6000803e3d6000fd5b50610521565b600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60026001600201546104f491906110ec565b9081150290604051600060405180830381858888f1935050505015801561051f573d6000803e3d6000fd5b505b5050565b61052d610c0d565b6105376000610c94565b565b610541610d60565b6001604051806101000160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820160009054906101000a900460ff161515151581526020016003820160019054906101000a900460ff16151515158152602001600482015481526020016005820160009054906101000a900460ff161515151581526020016005820160019054906101000a900460ff161515151581525050905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60016002015434146106e7576040517f2c5211c600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415801561079857506001800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b156107cf576040517ffd684c3b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614801561083e5750600160050160009054906101000a900460ff165b15610875576040517fd70a0e3000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480156108e35750600160050160019054906101000a900460ff165b1561091a576040517fd70a0e3000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16036109945760018060050160006101000a81548160ff021916908315150217905550610a0a565b6001800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1603610a095760018060050160016101000a81548160ff0219169083151502179055505b5b565b610a14610c0d565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610a865760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610a7d9190611049565b60405180910390fd5b610a8f81610c94565b50565b600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614158015610b4357506001800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b15610b7a576040517ffd684c3b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160050160009054906101000a900460ff168015610ba85750600160050160019054906101000a900460ff165b15610bd95760018060030160016101000a81548160ff02191690831515021790555042600160040181905550610c0b565b6040517fed664c1c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b610c15610d58565b73ffffffffffffffffffffffffffffffffffffffff16610c33610680565b73ffffffffffffffffffffffffffffffffffffffff1614610c9257610c56610d58565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610c899190611049565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b604051806101000160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600015158152602001600015158152602001600081526020016000151581526020016000151581525090565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e0482610dd9565b9050919050565b610e1481610df9565b82525050565b6000819050919050565b610e2d81610e1a565b82525050565b60008115159050919050565b610e4881610e33565b82525050565b600061010082019050610e64600083018b610e0b565b610e71602083018a610e0b565b610e7e6040830189610e24565b610e8b6060830188610e3f565b610e986080830187610e3f565b610ea560a0830186610e24565b610eb260c0830185610e3f565b610ebf60e0830184610e3f565b9998505050505050505050565b600080fd5b610eda81610e1a565b8114610ee557600080fd5b50565b600081359050610ef781610ed1565b92915050565b60008060408385031215610f1457610f13610ecc565b5b6000610f2285828601610ee8565b9250506020610f3385828601610ee8565b9150509250929050565b610f4681610df9565b82525050565b610f5581610e1a565b82525050565b610f6481610e33565b82525050565b61010082016000820151610f816000850182610f3d565b506020820151610f946020850182610f3d565b506040820151610fa76040850182610f4c565b506060820151610fba6060850182610f5b565b506080820151610fcd6080850182610f5b565b5060a0820151610fe060a0850182610f4c565b5060c0820151610ff360c0850182610f5b565b5060e082015161100660e0850182610f5b565b50505050565b6000610100820190506110226000830184610f6a565b92915050565b600061103382610dd9565b9050919050565b61104381611028565b82525050565b600060208201905061105e600083018461103a565b92915050565b61106d81611028565b811461107857600080fd5b50565b60008135905061108a81611064565b92915050565b6000602082840312156110a6576110a5610ecc565b5b60006110b48482850161107b565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006110f782610e1a565b915061110283610e1a565b925082820261111081610e1a565b91508282048414831517611127576111266110bd565b5b509291505056fea26469706673582212207a6fc82ddb6660519ddb570e662937ee632d4c7b175de0e42034f6eb2dfbb0a364736f6c634300081c0033";

type BetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Bet__factory extends ContractFactory {
  constructor(...args: BetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    initialOwner: AddressLike,
    player1: AddressLike,
    player2: AddressLike,
    amount: BigNumberish,
    resolved: boolean,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      initialOwner,
      player1,
      player2,
      amount,
      resolved,
      overrides || {}
    );
  }
  override deploy(
    initialOwner: AddressLike,
    player1: AddressLike,
    player2: AddressLike,
    amount: BigNumberish,
    resolved: boolean,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      initialOwner,
      player1,
      player2,
      amount,
      resolved,
      overrides || {}
    ) as Promise<
      Bet & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Bet__factory {
    return super.connect(runner) as Bet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BetInterface {
    return new Interface(_abi) as BetInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Bet {
    return new Contract(address, _abi, runner) as unknown as Bet;
  }
}
