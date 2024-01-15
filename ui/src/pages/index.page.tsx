import React, { useEffect, useState } from "react";
import ZkappWorkerClient from "../helpers/zkappWorkerClient";
import "../helpers/reactCOIServiceWorker";
import { Spinner } from "@/components/Spinner";
import ToTransaction from "@/components/ToTransaction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import From from "@/components/From";
import To from "@/components/To";
import { ChangeChain } from "@/helpers/icons";
import SwapProcess from "@/components/SwapProcess";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import { useEthers } from "@usedapp/core";
import { sendContract, approve } from "@/store/dataSlice";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Home() {
  const toastState = useSelector((state: RootState) => state.toast);
  const [showApproveButton, setShowApproveButton] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  useEffect(() => {
    // Ensure toastState.type is not null and is a valid key of toast
    if (toastState.message && toastState.type && toastState.type in toast) {
      toast[toastState.type](toastState.message);
    }
  }, [toastState]);
  const handleShowApproveChange = (showApprove: boolean) => {
    setShowApproveButton(showApprove);
  };
  const dispatch = useAppDispatch();
  const initializeState = async () => {
    const zkappWorkerClient = new ZkappWorkerClient();
    await new Promise((resolve) => setTimeout(resolve, 5000));

    await zkappWorkerClient.setActiveInstanceToBerkeley();
  };

  const amount = useAppSelector((state) => state.dataSlice.amount);
  const { account } = useEthers();

  const handleSendContract = async () => {
    const obj = {
      amount,
      account,
    };
    if (account && amount > 0) {
      setIsSending(true); // Start loading
      try {
        await dispatch(sendContract(obj)).unwrap();
        toast.success("Transaction successful");
      } catch (error) {
        toast.error("Error occurred");
        console.error(error);
      } finally {
        setIsSending(false); // Stop loading
      }
    }
  };
  const handleApprove = async () => {
    const obj = {
      amount,
      account,
    };
    if (account && amount > 0) {
      setIsApproving(true); // Start loading
      try {
        await dispatch(approve(obj)).unwrap();
        toast.success("Approval successful");
      } catch (error) {
        toast.error("Error occurred");
        console.error(error);
      } finally {
        setIsApproving(false); // Stop loading
      }
    }
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
      <div className="relative flex items-center">
        <From onShowApproveChange={handleShowApproveChange} />
        <div className="w-[48px] left-[596px] top-[50%] h-[48px] absolute flex items-center justify-center gap-[8px] rounded-[16px] bg-[#F4F5F6]">
          <ChangeChain width="48" height="48" />
        </div>
        <To />
      </div>
      <SwapProcess />
      <Container>
        {showApproveButton ? (
        <button
          disabled={isApproving}
          className={`text-white w-full h-14 mt-6 rounded-lg text-sm font-lexend font-normal flex items-center justify-center transition-transform duration-300 ${
            amount > 0 ? "bg-[#619079]" : "bg-[#8BB7A2]"
          } ${isApproving ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleApprove}
        >
          {isApproving ? <Spinner /> : "Approve"}
        </button>
      ) : (
        <button
          disabled={isSending}
          className={`text-white w-full h-14 mt-6 rounded-lg text-sm font-lexend font-normal flex items-center justify-center transition-transform duration-300 ${
            amount > 0 ? "bg-[#619079]" : "bg-[#8BB7A2]"
          } ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleSendContract}
        >
          {isSending ? <Spinner /> : "Confirm"}
        </button>
      )}
      </Container>
      

      <Footer />
    </main>
  );
}
