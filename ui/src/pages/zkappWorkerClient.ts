import { PublicKey, UInt64, fetchAccount } from 'o1js';
import type { ZkappWorkerRequest, ZkappWorkerResponse, WorkerFunctions } from './zkappWorker';

export default class ZkappWorkerClient {
  private worker: Worker;
  private promises: Record<number, { resolve: (res: any) => void; reject: (err: any) => void }>;
  private nextId: number;

  constructor() {
    this.worker = new Worker(new URL('./zkappWorker.ts', import.meta.url));
    this.promises = {};
    this.nextId = 0;

    this.worker.onmessage = (event: MessageEvent<ZkappWorkerResponse<any>>) => {
      const { id, data } = event.data;
      const promise = this.promises[id];
      if (promise) {
        promise.resolve(data);
        delete this.promises[id];
      }
    };
  }

  private _call<T>(fn: WorkerFunctions, args: T): Promise<any> {
    return new Promise((resolve, reject) => {
      const id = this.nextId++;
      this.promises[id] = { resolve, reject };
      
      const message: ZkappWorkerRequest<T> = {
        id,
        fn,
        args,
      };

      this.worker.postMessage(message);
    });
  }

  // Define explicit return types and method signatures for better type checking and readability
  setActiveInstanceToBerkeley(): Promise<void> {
    return this._call('setActiveInstanceToBerkeley', {});
  }

  loadContract(): Promise<void> {
    return this._call('loadContract', {});
  }

  compileContract(): Promise<void> {
    return this._call('compileContract', {});
  }

  fetchAccount(publicKey: PublicKey): Promise<ReturnType<typeof fetchAccount>> {
    return this._call('fetchAccount', {
      publicKey58: publicKey.toBase58(),
    });
  }

  initZkappInstance(publicKey: PublicKey): Promise<void> {
    return this._call('initZkappInstance', {
      publicKey58: publicKey.toBase58(),
    });
  }

  createMintTransaction(publicKey58: string, amount: number): Promise<void> {
    return this._call('createMintTransaction', { publicKey58, amount });
  }

  proveUpdateTransaction(): Promise<void> {
    return this._call('proveUpdateTransaction', {});
  }

  getTransactionJSON(): Promise<any> {
    return this._call('getTransactionJSON', {});
  }
}
