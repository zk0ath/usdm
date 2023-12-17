import React, { useEffect } from "react";
import ZkappWorkerClient from "./zkappWorkerClient";
import "./reactCOIServiceWorker";
import FromTransaction from "@/components/FromTransaction";
import ToTransaction from "@/components/ToTransaction";
import { useAppDispatch } from "@/store/hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const initializeState = async () => {
    const zkappWorkerClient = new ZkappWorkerClient();
    await new Promise((resolve) => setTimeout(resolve, 5000));

    await zkappWorkerClient.setActiveInstanceToBerkeley();
  };

  useEffect(() => {
    initializeState();
  }, []);

  return (
    <main className="main-area mx-auto bg-[#fff]  h-full flex flex-col justify-center items-center">
      <FromTransaction />
      <ToTransaction />
    </main>
  );
}
