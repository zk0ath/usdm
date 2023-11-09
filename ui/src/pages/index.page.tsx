import React, { useEffect, useState, useCallback } from 'react';
import { PublicKey } from 'o1js';
import GradientBG from '../components/GradientBG';
import BurnForm from '../components/BurnForm';
import MintForm from '../components/MintForm';
import LoadingSpinner from '../components/LoadingSpinner';
import TransferForm from '../components/TransferForm';
import styles from '../styles/Home.module.css';
import ZkappWorkerClient from './zkappWorkerClient';
import './reactCOIServiceWorker';
import AccountStatus from '../components/AccountStatus';
import WalletStatus from '../components/WalletStatus';
import Footer from '@/components/Footer';

interface HomeState {
    zkappWorkerClient: ZkappWorkerClient | null;
    hasWallet: boolean | false;
    hasBeenSetup: boolean;
    accountExists: boolean;
    publicKey: PublicKey | null;
    zkappPublicKey: PublicKey | null;
    creatingTransaction: boolean;
}

const transactionFee = 0.1;

const initialState: HomeState = {
    zkappWorkerClient: null,
    hasWallet: false,
    hasBeenSetup: false,
    accountExists: false,
    publicKey: null,
    zkappPublicKey: null,
    creatingTransaction: false
};

export default function Home() {
    const [state, setState] = useState<HomeState>(initialState);
    const [displayText, setDisplayText] = useState<string>('');
    const [transactionLink, setTransactionLink] = useState<string>('');

    const [mintAmount, setMintAmount] = useState<number>(0);
    const [burnAmount, setBurnAmount] = useState<number>(0);
    const [transferAmount, setTransferAmount] = useState<number>(0);
    const [recipientAddress, setRecipientAddress] = useState<string>('');
    const [transferRecipientAddress, setTransferRecipientAddress] = useState<string>('');

    useEffect(() => {
        let init = async () => {
            initializeState();
        }
        init().catch(e => console.error(e));
    }, []);

    const initializeState = async () => {
        if (state.hasBeenSetup) return;

        setDisplayText('Loading web worker...');
        const zkappWorkerClient = new ZkappWorkerClient();
        await new Promise(resolve => setTimeout(resolve, 5000));

        setDisplayText('Done loading web worker');

        await zkappWorkerClient.setActiveInstanceToBerkeley();

        const mina = (window as any).mina;

        if (!mina) {
            console.log('No mina wallet detected');
            setState(s => ({ ...s, hasWallet: false }));
            return;
        }

        const publicKeyBase58: string = (await mina.requestAccounts())[0];
        const publicKey = PublicKey.fromBase58(publicKeyBase58);

        setDisplayText(`Using key:${publicKey.toBase58()}`);

        const res = await zkappWorkerClient.fetchAccount(publicKey);
        const accountExists = res.error == null;

        await zkappWorkerClient.loadContract();
        setDisplayText('Compiling zkApp...');
        await zkappWorkerClient.compileContract();
        setDisplayText('zkApp compiled...');

        const zkappPublicKey = PublicKey.fromBase58(
            'B62qrMfhKm3NTrm4BBjdph3Yrf4DL628KiCzn8bCUNr6HfggWeFAkmm'
        );

        await zkappWorkerClient.initZkappInstance(zkappPublicKey);
        setDisplayText('Getting zkApp state...');
        await zkappWorkerClient.fetchAccount(publicKey);

        setDisplayText('');

        console.log('HasWallet set true');
        setState({
            zkappWorkerClient,
            hasWallet: true,
            hasBeenSetup: true,
            publicKey,
            zkappPublicKey,
            accountExists,
            creatingTransaction: false
        });
    };

    const onTransactionAction = useCallback(async (action: 'mint' | 'burn' | 'transfer') => {
        if (!state.zkappWorkerClient || !state.publicKey) return;

        const actionMap = {
            mint: async () => state.zkappWorkerClient?.createMintTransaction(state.publicKey!.toBase58(), mintAmount),
            burn: async () => state.zkappWorkerClient?.createBurnTransaction(state.publicKey!.toBase58(), burnAmount),
            transfer: async () => state.zkappWorkerClient?.createTransferTransaction(state.publicKey!.toBase58(), transferRecipientAddress, transferAmount)
        };

        

        setState(s => ({ ...s, creatingTransaction: true }));
        setDisplayText(`Creating ${action} transaction...`);
        await actionMap[action]();
        setDisplayText(`${action.replace(/^\w/, (c) => c.toUpperCase())} transaction created. Proving and sending...`);
        await state.zkappWorkerClient.proveUpdateTransaction();
        const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON();
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

        
        setState(s => ({ ...s, creatingTransaction: false }));
    }, [state, mintAmount, burnAmount, transferAmount, transferRecipientAddress]);

    const onBurnTokens = useCallback(() => {
        onTransactionAction('burn');
    }, [onTransactionAction]);

    const onMintTokens = useCallback(() => {
        onTransactionAction('mint');
    }, [onTransactionAction]);

    const onTransferTokens = useCallback(() => {
        onTransactionAction('transfer');
    }, [onTransactionAction]);

    const isWalletLinked = state.hasWallet === true;
    const isAccountSetup = state.accountExists && state.hasBeenSetup;

    return (
        <GradientBG>
            <div className={styles.main}>
            <LoadingSpinner transactionUrl={transactionLink} text={displayText} active={state.creatingTransaction || !isAccountSetup } />
                <div className={styles.center}>
                    {isAccountSetup && (
                        <WalletStatus hasWallet={state.hasWallet } publicKey={state.publicKey?.toBase58() || ''} />
                    )}
                    {isAccountSetup && (
                        <AccountStatus accountExists={state.accountExists} publicKey58={state.publicKey?.toBase58()!} />
                    )}
                    
                    {isWalletLinked && isAccountSetup && (
                        <>
                            <div>
                                <MintForm
                                    mintAmount={mintAmount}
                                    setMintAmount={setMintAmount}
                                    onMintTokens={onMintTokens}
                                />
                                <BurnForm
                                    burnAmount={burnAmount}
                                    setBurnAmount={setBurnAmount}
                                    onBurnTokens={onBurnTokens}
                                />
                                <TransferForm
                                    transferAmount={transferAmount}
                                    setTransferAmount={setTransferAmount}
                                    transferRecipientAddress={transferRecipientAddress}
                                    setTransferRecipientAddress={setTransferRecipientAddress}
                                    onTransferTokens={onTransferTokens}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </GradientBG>
    );
}
