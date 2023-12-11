import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { PublicKey } from "o1js";
import GradientBG from "../components/GradientBG";
import ZkappWorkerClient from "./zkappWorkerClient";
import "./reactCOIServiceWorker";
import FromTransaction from "@/components/FromTransaction";
import ToTransaction from "@/components/ToTransaction";

export default function Home() {
  return (
    <GradientBG>
      <main className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center items-center">
        {/* <LoadingSpinner
          transactionUrl={transactionLink}
          text={displayText}
          active={state.creatingTransaction || !isAccountSetup}
        /> */}
        <section className="space-y-8">
          <FromTransaction />
          <ToTransaction />
        </section>
      </main>
    </GradientBG>
  );
}
