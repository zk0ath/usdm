import React, { useEffect } from "react";
import ZkappWorkerClient from "../helpers/zkappWorkerClient";
import "../helpers/reactCOIServiceWorker";
import FromTransaction from "@/components/FromTransaction";
import ToTransaction from "@/components/ToTransaction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import From from "@/components/From";
import To from "@/components/To";
import { ChangeChain } from "@/helpers/icons";
import SwapProcess from "@/components/SwapProcess";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import { useEthers } from "@usedapp/core";
import { sendContract } from "@/store/dataSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const initializeState = async () => {
    const zkappWorkerClient = new ZkappWorkerClient();
    await new Promise((resolve) => setTimeout(resolve, 5000));

    await zkappWorkerClient.setActiveInstanceToBerkeley();
  };

  const amount = useAppSelector((state) => state.dataSlice.amount);
  const { account } = useEthers();

  const handleSendContract = () => {
    const obj = {
      amount,
      account,
    };
    if (account && amount > 0) dispatch(sendContract(obj));
  };

  useEffect(() => {
    initializeState();
  }, []);

  return (
    <main className="main-area mx-auto bg-[#fff] flex flex-col items-center justify-center">
      <h1
        style={{ color: "#090A0B" }}
        className="font-semibold font-lexend text-4xl mb-[30px] mt-[96px]"
      >
        Swap- Cross Chain
      </h1>
      <div className="flex items-center relative">
        <From />
        <div className="w-[48px] left-[596px] top-[50%] h-[48px] absolute flex items-center justify-center gap-[8px] rounded-[16px] bg-[#F4F5F6]">
          <ChangeChain width="48" height="48" />
        </div>
        <To />
      </div>
      <SwapProcess />
      <Container>
        <button
          style={{ color: "#fff" }}
          onClick={handleSendContract}
          className={`w-full h-[56px] mt-[24px] rounded-[16px] text-sm font-lexend font-normal ${
            amount > 0 ? "bg-[#619079]" : "bg-[#8BB7A2]"
          } flex items-center justify-center`}
        >
          Confirm
        </button>
      </Container>

      <Footer />
    </main>
  );
}
