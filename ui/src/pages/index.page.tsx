import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { PublicKey } from "o1js";
import GradientBG from "../components/GradientBG";
import BurnForm from "../components/BurnForm";
import MintForm from "../components/MintForm";
import SignatureForm from "../components/SignatureForm";
import LoadingSpinner from "../components/LoadingSpinner";
import TransferForm from "../components/TransferForm";
import styles from "../styles/Home.module.css";
import ZkappWorkerClient from "./zkappWorkerClient";
import "./reactCOIServiceWorker";
import AccountStatus from "../components/AccountStatus";
import WalletStatus from "../components/WalletStatus";
import Footer from "@/components/Footer";
import { useAppSelector } from "@/store/hooks";

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
    creatingTransaction: false,
};

export default function Home() {
    const [state, setState] = useState<HomeState>(initialState);
    const [displayText, setDisplayText] = useState<string>("");
    const [transactionLink, setTransactionLink] = useState<string>("");

    const [mintAmount, setMintAmount] = useState<number>(0);
    const [signatureMintAmount, setSignatureMintAmount] = useState<number>(0);
    const [burnAmount, setBurnAmount] = useState<number>(0);
    const [transferAmount, setTransferAmount] = useState<number>(0);
    const [recipientAddress, setRecipientAddress] = useState<string>("");
    const [transferRecipientAddress, setTransferRecipientAddress] =
        useState<string>("");
    const [senderAddress, setSenderAddress] = useState<string>("");
    const [mintAdminPrivateKey, setMintAdminPrivateKey] = useState<string>("");
    const [burnAdminPrivateKey, setBurnAdminPrivateKey] = useState<string>("");
    const [mintRecipientAddress, setMintRecipientAddress] = useState<string>("");
    const [signatureZkAppPrivKey, setsignatureZkAppPrivKey] =
        useState<string>("");
    const [signatureRecipientAddress, setSignatureRecipientAddress] =
        useState<string>("");
    const [burnRecipientAddress, setBurnRecipientAddress] = useState<string>("");

    useEffect(() => {
        let init = async () => {
            await initializeState();
        };
        init().catch((e) => console.error(e));

        if (state.hasBeenSetup) {
            if (!state.hasWallet) {
                toast.error("Wallet Not Detected! Could not find a wallet.", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            } else if (state.publicKey) {
                toast.success(
                    `Wallet Connected! Public Key: ${state.publicKey.toBase58()}`,
                    {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    }
                );
            }

            if (!state.accountExists && state.publicKey) {
                const faucetLink = `https://faucet.minaprotocol.com/?address=${state.publicKey.toBase58()}`;
                toast.error(
                    <div>
                        Account does not exist.{" "}
                        <a
                            href={faucetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                        >
                            Visit the faucet to fund this fee payer account
                        </a>
                    </div>,
                    {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    }
                );
            } else if (state.accountExists) {
                toast.success("Account is set up and ready to use.", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        }
    }, [state.hasWallet, state.accountExists, state.publicKey]);

    const initializeState = async () => {
        if (state.hasBeenSetup) return;

        setDisplayText("Loading web worker...");
        const zkappWorkerClient = new ZkappWorkerClient();
        await new Promise((resolve) => setTimeout(resolve, 5000));

        setDisplayText("Done loading web worker");

        await zkappWorkerClient.setActiveInstanceToBerkeley();

        const mina = (window as any).mina;

        if (!mina) {
            console.log("No mina wallet detected");
            setState((s) => ({ ...s, hasWallet: false }));
            return;
        }

        const publicKeyBase58: string = (await mina.requestAccounts())[0];
        const publicKey = PublicKey.fromBase58(publicKeyBase58);

        setDisplayText(`Using key:${publicKey.toBase58()}`);

        const res = await zkappWorkerClient.fetchAccount(publicKey);
        const accountExists = res.error == null;

        await zkappWorkerClient.loadContract();
        setDisplayText("Compiling zkApp...");
        if (localStorage.getItem("zkAppCompailed") !== "true") {
            await zkappWorkerClient.compileContract();
            localStorage.setItem("zkAppCompailed", "true");
        }
        setDisplayText("zkApp compiled...");

        const zkappPublicKey = PublicKey.fromBase58(
            "B62qoJyv9wpvLA7Yk2NKJnY24HLgWVNt9aBtYsnSLvUxeAjfRKAuq59"
        );

        await zkappWorkerClient.initZkappInstance(zkappPublicKey);
        setDisplayText("Getting zkApp state...");
        await zkappWorkerClient.fetchAccount(publicKey);

        setDisplayText("");

        console.log("HasWallet set true");
        setState({
            zkappWorkerClient,
            hasWallet: true,
            hasBeenSetup: true,
            publicKey,
            zkappPublicKey,
            accountExists,
            creatingTransaction: false,
        });
    };

    const onTransactionAction = useCallback(
        async (action: "mint" | "burn" | "transfer" | "createSignature") => {
            if (!state.zkappWorkerClient || !state.publicKey) return;

            const mina = (window as any).mina;
            const publicKeyBase58: string = (await mina.requestAccounts())[0];
            const actionMap = {
                mint: async () =>
                    state.zkappWorkerClient?.createMintTransaction(
                        mintRecipientAddress,
                        mintAdminPrivateKey,
                        publicKeyBase58,
                        mintAmount
                    ),
                burn: async () =>
                    state.zkappWorkerClient?.createBurnTransaction(
                        burnRecipientAddress,
                        burnAmount,
                        burnAdminPrivateKey
                    ),
                transfer: async () =>
                    state.zkappWorkerClient?.createTransferTransaction(
                        senderAddress,
                        transferRecipientAddress,
                        transferAmount
                    ),
                createSignature: async () => {
                    return "asd";
                },
            };

            setState((s) => ({ ...s, creatingTransaction: true }));
            setDisplayText(`Creating ${action} transaction...`);
            await actionMap[action]();
            setDisplayText(
                `${action.replace(/^\w/, (c) =>
                    c.toUpperCase()
                )} transaction created. Proving and sending...`
            );
            await state.zkappWorkerClient.proveUpdateTransaction();
            const transactionJSON =
                await state.zkappWorkerClient!.getTransactionJSON();
            console.log(transactionJSON);
            const { hash } = await (window as any).mina.sendTransaction({
                transaction: transactionJSON,
                feePayer: {
                    fee: transactionFee,
                    memo: "",
                },
            });
            const transactionLink = `https://berkeley.minaexplorer.com/transaction/${hash}`;
            console.log(`View transaction at ${transactionLink}`);

            setTransactionLink(transactionLink);
            setDisplayText(transactionLink);

            setState((s) => ({ ...s, creatingTransaction: false }));
        },
        [
            state,
            mintAmount,
            burnAmount,
            transferAmount,
            transferRecipientAddress,
            mintRecipientAddress,
            burnRecipientAddress,
            senderAddress,
            mintAdminPrivateKey,
            burnAdminPrivateKey,
        ]
    );

    const onBurnTokens = () => {
        onTransactionAction("burn");
    };

    const onMintTokens = () => {
        onTransactionAction("mint");
    };

    const onCreateSignature = () => {
        onTransactionAction("createSignature");
    };
    const onTransferTokens = () => {
        onTransactionAction("transfer");
    };

    const isWalletLinked = state.hasWallet === true;
    const isAccountSetup = state.accountExists && state.hasBeenSetup;

    return (
        <GradientBG>
            <main className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center items-center">
                <LoadingSpinner
                    transactionUrl={transactionLink}
                    text={displayText}
                    active={state.creatingTransaction || !isAccountSetup}
                />
                <section className="space-y-8">
                    {isWalletLinked && isAccountSetup && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* <SignatureForm
                                          signatureMintAmount={signatureMintAmount}
                                          setSignatureMintAmount={setSignatureMintAmount}
                                          signatureZkAppPrivKey={signatureZkAppPrivKey}
                                          setsignatureZkAppPrivKey={setsignatureZkAppPrivKey}
                                          signatureRecipientAddress={signatureRecipientAddress}
                                          setSignatureReceipentAddress={setSignatureRecipientAddress}
                                          onCreateSignature={onCreateSignature}
                                      ></SignatureForm> */}
                            <MintForm
                                mintAmount={mintAmount}
                                setMintAmount={setMintAmount}
                                mintRecipientAddress={mintRecipientAddress}
                                mintAdminPrivateKey={mintAdminPrivateKey}
                                setMintAdminPrivateKey={setMintAdminPrivateKey}
                                setMintRecipientAddress={setMintRecipientAddress}
                                onMintTokens={onMintTokens}
                            />
                            <BurnForm
                                burnAmount={burnAmount}
                                setBurnAmount={setBurnAmount}
                                burnRecipientAddress={burnRecipientAddress}
                                setBurnRecipientAddress={setBurnRecipientAddress}
                                burnAdminPrivateKey={burnAdminPrivateKey}
                                setBurnAdminPrivateKey={setBurnAdminPrivateKey}
                                onBurnTokens={onBurnTokens}
                            />
                            <TransferForm
                                transferAmount={transferAmount}
                                setTransferAmount={setTransferAmount}
                                transferRecipientAddress={transferRecipientAddress}
                                setTransferRecipientAddress={setTransferRecipientAddress}
                                senderAddress={senderAddress}
                                setSenderAddress={setSenderAddress}
                                onTransferTokens={onTransferTokens}
                            />
                        </div>
                    )}
                </section>
            </main>
        </GradientBG>
    );
}
