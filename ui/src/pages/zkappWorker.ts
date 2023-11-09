import { Mina, PublicKey, UInt64, fetchAccount } from 'o1js';
import type { TokenContract } from '../../../contracts/src/TokenContract';

// Create a generic type for state properties to simplify the code
type StateProperty<T> = T | null;

// Define the initial state with more explicit typing
const state: {
  TokenContract: StateProperty<typeof TokenContract>,
  zkapp: StateProperty<TokenContract>,
  transaction: StateProperty<Awaited<ReturnType<typeof Mina.transaction>>>,
} = {
  TokenContract: null,
  zkapp: null,
  transaction: null,
};

// Define arguments types for better type checking
interface FetchAccountArgs {
  publicKey58: string;
}

interface CreateMintTransactionArgs {
  publicKey58: string;
  amount: number;
}

interface CreateBurnTransactionArgs {
  publicKey58: string;
  amount: number;
}

interface CreateTransferTransactionArgs {
  senderPublicKey58: string;
  receiverPublicKey58: string;
  amount: number;
}

// Define a dictionary to hold the functions for easier management and extensibility
const functions: Record<string, Function> = {
  setActiveInstanceToBerkeley: async () => {
    const Berkeley = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');
    console.log('Berkeley Instance Created');
    Mina.setActiveInstance(Berkeley);
  },
  loadContract: async () => {
    const { TokenContract } = await import('../../../contracts/build/src/TokenContract.js');
    state.TokenContract = TokenContract;
  },
  compileContract: async () => {
    if (state.TokenContract) await state.TokenContract.compile();
  },
  fetchAccount: async ({ publicKey58 }: FetchAccountArgs) => {
    const publicKey = PublicKey.fromBase58(publicKey58);
    return await fetchAccount({ publicKey });
  },
  initZkappInstance: async ({ publicKey58 }: FetchAccountArgs) => {
    const publicKey = PublicKey.fromBase58(publicKey58);
    if (state.TokenContract) state.zkapp = new state.TokenContract(publicKey);
  },
  createMintTransaction: async ({ publicKey58, amount }: CreateMintTransactionArgs) => {
    const transaction = await Mina.transaction(() => {
      state.zkapp?.mint(PublicKey.fromBase58(publicKey58), UInt64.from(amount));
    });
    state.transaction = transaction;
  },
  createBurnTransaction: async ({ publicKey58, amount }: CreateBurnTransactionArgs) => {
    const transaction = await Mina.transaction(() => {
      state.zkapp?.burn(PublicKey.fromBase58(publicKey58), UInt64.from(amount));
    });
    state.transaction = transaction;
  },
  createTransferTransaction: async ({ senderPublicKey58, receiverPublicKey58, amount }: CreateTransferTransactionArgs) => {
    const transaction = await Mina.transaction(() => {
      state.zkapp?.transfer(PublicKey.fromBase58(senderPublicKey58),PublicKey.fromBase58(receiverPublicKey58), UInt64.from(amount));
    });
    state.transaction = transaction;
  },
  proveUpdateTransaction: async () => {
    if (state.transaction) await state.transaction.prove();
  },
  getTransactionJSON: async () => {
    return state.transaction?.toJSON();
  },
};

export type WorkerFunctions = keyof typeof functions;

export interface ZkappWorkerRequest<T> {
  id: number;
  fn: WorkerFunctions;
  args: T;
}

export interface ZkappWorkerResponse<T> {
  id: number;
  data: T;
}

if (typeof window !== 'undefined') {
  addEventListener('message', async (event: MessageEvent<ZkappWorkerRequest<unknown>>) => {
    if (typeof functions[event.data.fn] === 'function') {
      const returnData = await functions[event.data.fn](event.data.args);
      const message: ZkappWorkerResponse<unknown> = {
        id: event.data.id,
        data: returnData,
      };
      postMessage(message);
    }
  });
}

console.log('Web Worker Successfully Initialized.');
