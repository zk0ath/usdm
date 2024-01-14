import React from "react";
import Container from "./Container";
import { useSelector } from "react-redux";
import { RootState } from "./../store";
import {
  ArrowDown,
  BusdIcon,
  DottedLine,
  EthereumLogo,
  ProcessIcon,
  MinaLogo
} from "@/helpers/icons";

const SwapProcess = () => {
  const isSendingContract = useSelector((state: RootState) => state.dataSlice.isSendingContract);
  return (
    <Container>
      <div className="w-full h-[276px] bg-[#fff] mt-[24px] flex flex-col gap-[24px] p-[24px] rounded-[12px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ProcessIcon width="24" height="24" />
            <span
              style={{ color: "#090A0B" }}
              className="ml-2 mr-2 font-normal text-md font-inter"
            >
              1 ETH = 3,832 Mina
            </span>
          </div>
          <div className="flex items-center">
            <EthereumLogo width="24" height="24" />

            <span
              style={{ color: "#090A0B" }}
              className="ml-2 mr-2 font-normal text-md font-inter"
            >
              0.00856392
            </span>
            <ArrowDown width="24px" height="24px" fillColor="#090A0B" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <EthereumLogo width="24" height="24" />
            <span
              style={{ color: "#788691" }}
              className="mt-1 font-normal text-md font-inter"
            >
              ETH
            </span>
          </div>
          <div className="flex items-center">
            <DottedLine animated={isSendingContract} />
            <span
              style={{ color: "#77BF3D" }}
              className="text-sm font-normal font-inter"
            >
              DEX
            </span>
            <DottedLine animated={isSendingContract} />
          </div>
          <div className="flex flex-col items-center">
            <BusdIcon width="24" height="24" />
            <span
              style={{ color: "#788691" }}
              className="mt-1 font-normal text-md font-inter"
            >
              Bridge
            </span>
          </div>
          <div className="flex items-center">
            <DottedLine />
            <span
              style={{ color: "#77BF3D" }}
              className="text-sm font-normal font-inter"
            >
              USDM
            </span>
            <DottedLine />
          </div>
          <div className="flex flex-col items-center">
            <MinaLogo width="24" height="24" />
            <span
              style={{ color: "#788691" }}
              className="mt-1 font-normal text-md font-inter"
            >
              MINA
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span
            style={{ color: "#788691" }}
            className="text-sm font-light font-inter"
          >
            Expected Received
          </span>
          <span
            style={{ color: "#090A0B" }}
            className="text-sm font-semibold font-inter"
          >
            19,928 Mina
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span
            style={{ color: "#788691" }}
            className="text-sm font-light font-inter"
          >
            Price Impact
          </span>
          <span
            style={{ color: "#090A0B" }}
            className="text-sm font-semibold font-inter"
          >
            0,02% Mina
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span
            style={{ color: "#788691" }}
            className="text-sm font-light font-inter"
          >
            Minumum Received
          </span>
          <span
            style={{ color: "#090A0B" }}
            className="text-sm font-semibold font-inter"
          >
            19,924 Mina
          </span>
        </div>
      </div>
    </Container>
  );
};

export default SwapProcess;
