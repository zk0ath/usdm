import MintForm from "@/components/MintForm";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ZkappWorkerClient from "../../helpers/zkappWorkerClient";

const Detail = () => {
  const [mintAmount, setMintAmount] = useState<number>(0);
  const [mintAdminPrivateKey, setMintAdminPrivateKey] = useState<string>("");
  const [mintRecipientAddress, setMintRecipientAddress] = useState<string>("");

  const transactionFee = 0.1;

  const onTransactionAction = async (
    action: "mint" | "burn" | "transfer" | "createSignature"
  ) => {
    const zkappWorkerClient = new ZkappWorkerClient();

    const mina = (window as any).mina;
    const publicKeyBase58: string = (await mina.requestAccounts())[0];
    const actionMap: any = {
      mint: async () =>
        zkappWorkerClient?.createMintTransaction(
          mintRecipientAddress,
          mintAdminPrivateKey,
          publicKeyBase58,
          mintAmount
        ),
      createSignature: async () => {
        return "asd";
      },
    };

    if (
      action === "mint" &&
      (!mintRecipientAddress || !mintAdminPrivateKey || !mintAmount)
    ) {
      return toast.error("Fill all fields for the mint", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

    await actionMap[action]();

    await zkappWorkerClient.proveUpdateTransaction();
    const transactionJSON = await zkappWorkerClient!.getTransactionJSON();
    const { hash } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: "",
      },
    });
    const transactionLink = `https://berkeley.minaexplorer.com/transaction/${hash}`;
    console.log(`View transaction at ${transactionLink}`);
  };
  const onMintTokens = () => {
    onTransactionAction("mint");
  };
  return (
    <div className="main-area h-full pt-[80px] flex items-center justify-center">
      <MintForm
        mintAmount={mintAmount}
        setMintAmount={setMintAmount}
        mintRecipientAddress={mintRecipientAddress}
        mintAdminPrivateKey={mintAdminPrivateKey}
        setMintAdminPrivateKey={setMintAdminPrivateKey}
        setMintRecipientAddress={setMintRecipientAddress}
        onMintTokens={onMintTokens}
      />
    </div>
  );
};

export default Detail;
