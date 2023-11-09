import { useEffect, useState } from 'react';
import './reactCOIServiceWorker';
import ZkappWorkerClient from './zkappWorkerClient';
import { PublicKey } from 'o1js';
import GradientBG from '../components/GradientBG.js';
import styles from '../styles/Home.module.css';
import { FaSpinner } from 'react-icons/fa';

let transactionFee = 0.1;

export default function Home() {
  const [state, setState] = useState({
    zkappWorkerClient: null as null | ZkappWorkerClient,
    hasWallet: null as null | boolean,
    hasBeenSetup: false,
    accountExists: false,
    // currentNum: null as null | Field,
    publicKey: null as null | PublicKey,
    zkappPublicKey: null as null | PublicKey,
    creatingTransaction: false
  });

  const [displayText, setDisplayText] = useState('');
  const [transactionlink, setTransactionLink] = useState('');

  const [mintAmount, setMintAmount] = useState(0);

  const loadingSpinner = (
    <div className="flex justify-center items-center">
      <FaSpinner className="animate-spin h-5 w-5 mr-3" />
      Processing...
    </div>
  );

  useEffect(() => {
    async function timeout(seconds: number): Promise<void> {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, seconds * 1000);
      });
    }

    (async () => {
      if (!state.hasBeenSetup) {
        setDisplayText('Loading web worker...');
        console.log('Loading web worker...');
        const zkappWorkerClient = new ZkappWorkerClient();
        await timeout(5);

        setDisplayText('Done loading web worker');
        console.log('Done loading web worker');

        await zkappWorkerClient.setActiveInstanceToBerkeley();

        const mina = (window as any).mina;

        if (mina == null) {
          setState({ ...state, hasWallet: false });
          return;
        }

        const publicKeyBase58: string = (await mina.requestAccounts())[0];
        const publicKey = PublicKey.fromBase58(publicKeyBase58);

        console.log(`Using key:${publicKey.toBase58()}`);
        setDisplayText(`Using key:${publicKey.toBase58()}`);

        setDisplayText('Checking if fee payer account exists...');
        console.log('Checking if fee payer account exists...');

        const res = await zkappWorkerClient.fetchAccount(publicKey);
        const accountExists = res.error == null;

        await zkappWorkerClient.loadContract();

        console.log('Compiling zkApp...');
        setDisplayText('Compiling zkApp...');
        await zkappWorkerClient.compileContract();
        console.log('zkApp compiled');
        setDisplayText('zkApp compiled...');

        const zkappPublicKey = PublicKey.fromBase58(
          'B62qrMfhKm3NTrm4BBjdph3Yrf4DL628KiCzn8bCUNr6HfggWeFAkmm'
        );

        await zkappWorkerClient.initZkappInstance(zkappPublicKey);

        console.log('Getting zkApp state...');
        setDisplayText('Getting zkApp state...');
        await zkappWorkerClient.fetchAccount(publicKey);

        setDisplayText('');

        setState({
          ...state,
          zkappWorkerClient,
          hasWallet: true,
          hasBeenSetup: true,
          publicKey,
          zkappPublicKey,
          accountExists
        });
      }
    })();
  }, []);

  // -------------------------------------------------------
  // Wait for account to exist, if it didn't

  useEffect(() => {
    (async () => {
      let mainContent;
      if (state.hasBeenSetup && state.accountExists) {
        mainContent = (
          <div style={{ justifyContent: 'center', alignItems: 'center' }}>
            {/* ... */}
            {state.creatingTransaction && loadingSpinner}
            <input
              type="number"
              value={mintAmount}
              onChange={(e) => setMintAmount(parseInt(e.target.value))}
              placeholder="Enter amount to mint"
              className={styles.input}
            />
            <button
              className={styles.card}
              onClick={onSendTransaction}
              disabled={state.creatingTransaction}
            >
              Mint
            </button>
            {/* ... */}
          </div>
        );
      }
    })();
  }, [state.hasBeenSetup]);

  // -------------------------------------------------------
  // Send a transaction

  const onSendTransaction = async () => {
    setState({ ...state, creatingTransaction: true });
    setDisplayText('Creating a transaction...');
    console.log('Creating a transaction...');

    if (state.zkappWorkerClient) {
      await state.zkappWorkerClient.fetchAccount(state.publicKey!);

      console.log(`Minting ${mintAmount} tokenss...`);
      console.log('Public Key, ', state.publicKey?.toBase58())
      
      await state.zkappWorkerClient.createMintTransaction(state.publicKey?.toBase58()!, mintAmount);
      console.log('Mint transaction created');
    }

    setDisplayText('Creating proof...');
    console.log('Creating proof...');
    await state.zkappWorkerClient!.proveUpdateTransaction();

    console.log('Requesting send transaction...');
    setDisplayText('Requesting send transaction...');
    const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON();

    console.log('Transaction json: ', transactionJSON)
    setDisplayText('Getting transaction JSON...');
    console.log('Getting transaction JSON...');
    const { hash } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: ''
      }
    });
    const transactionLink = `https://berkeley.minaexplorer.com/transaction/${hash}`;
    console.log(`View transaction at ${transactionLink}`);

    setTransactionLink(transactionLink);
    setDisplayText(transactionLink);

    setState({ ...state, creatingTransaction: false });
  };

  // -------------------------------------------------------
  // Refresh the current state

  const onRefreshCurrentNum = async () => {
    console.log('Getting zkApp state...');
      setDisplayText('Getting zkApp state...');

      await state.zkappWorkerClient!.fetchAccount(state.zkappPublicKey!);

      // If you have additional logic to update the state with the fetched data, you can uncomment and adjust the following lines
      // const currentNum = await state.zkappWorkerClient!.getNum();
      // setState({ ...state, currentNum });
      // console.log(`Current state in zkApp: ${currentNum.toString()}`);

      setDisplayText(''); // Clear display text or update it with relevant information
  };

  // -------------------------------------------------------
  // Create UI elements

  let hasWallet;
  if (state.hasWallet != null && !state.hasWallet) {
    const auroLink = 'https://www.aurowallet.com/';
    const auroLinkElem = (
      <a href={auroLink} target="_blank" rel="noreferrer">
        Install Auro wallet here
      </a>
    );
    hasWallet = <div>Could not find a wallet. {auroLinkElem}</div>;
  }

  const stepDisplay = transactionlink ? (
    <a href={displayText} target="_blank" rel="noreferrer">
      View transaction
    </a>
  ) : (
    displayText
  );

  let setup = (
    <div
      className={styles.start}
      style={{ fontWeight: 'bold', fontSize: '1.5rem', paddingBottom: '5rem' }}
    >
      {stepDisplay}
      {hasWallet}
    </div>
  );

  let accountDoesNotExist;
  if (state.hasBeenSetup && !state.accountExists) {
    const faucetLink =
      'https://faucet.minaprotocol.com/?address=' + state.publicKey!.toBase58();
    accountDoesNotExist = (
      <div >
        <span style={{ paddingRight: '1rem' }}>Account does not exist.</span>
        <a href={faucetLink} target="_blank" rel="noreferrer">
          Visit the faucet to fund this fee payer account
        </a>
      </div>
    );
  }

  let mainContent;
  if (state.hasBeenSetup && state.accountExists) {
    mainContent = (
      <div style={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* <div className={styles.center} style={{ padding: 0 }}>
          Current state in zkApp: {state.currentNum!.toString()}{' '}
        </div> */}
        <input
          type="number"
          value={mintAmount}
          onChange={(e) => setMintAmount(parseInt(e.target.value))}
          placeholder="Enter amount to mint"
          className={styles.input}
        />
        <button
          className={styles.card}
          onClick={onSendTransaction}
          disabled={state.creatingTransaction}
        >
          Send Transaction
        </button>
        {/* <button className={styles.card} onClick={onRefreshCurrentNum}>
          Get Latest State
        </button> */}
      </div>
    );
  }

  return (
    <GradientBG>
      <div className={styles.main} style={{ padding: 0 }}>
        {loadingSpinner} {/* This line includes the spinner based on status */}
        <div className={styles.center} style={{ padding: 0 }}>
          {setup}
          {accountDoesNotExist}
          {mainContent}
        </div>
      </div>
    </GradientBG>
  );
}