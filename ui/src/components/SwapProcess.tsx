import React from "react";
import Container from "./Container";
import {
  ArrowDown,
  BusdIcon,
  DottedLine,
  EthereumLogo,
  ProcessIcon,
  MinaLogo,
} from "@/helpers/icons";

const SwapProcess = () => {
  return (
    <Container>
      <div className="w-full h-[276px] bg-[#fff] mt-[24px] flex flex-col gap-[24px] p-[24px] rounded-[12px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ProcessIcon width="24" height="24" />
            <span
              style={{ color: "#090A0B" }}
              className="text-md ml-2 mr-2 font-normal font-inter"
            >
              1 ETH = 3,832 Mina
            </span>
          </div>
          <div className="flex items-center">
            <EthereumLogo width="24" height="24" />

            <span
              style={{ color: "#090A0B" }}
              className="text-md ml-2 mr-2 font-normal font-inter"
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
              className="text-md mt-1 font-inter font-normal"
            >
              ETH
            </span>
          </div>
          <div className="flex items-center">
            <DottedLine />
            <span
              style={{ color: "#77BF3D" }}
              className="text-sm font-inter font-normal"
            >
              DEX
            </span>
            <DottedLine />
          </div>
          <div className="flex flex-col items-center">
            <BusdIcon width="24" height="24" />
            <span
              style={{ color: "#788691" }}
              className="text-md mt-1 font-inter font-normal"
            >
              BUSD
            </span>
          </div>
          <div className="flex items-center">
            <DottedLine />
            <span
              style={{ color: "#77BF3D" }}
              className="text-sm font-inter font-normal"
            >
              MINA
            </span>
            <DottedLine />
          </div>
          <div className="flex flex-col items-center">
            <MinaLogo width="24" height="24" />
            <span
              style={{ color: "#788691" }}
              className="text-md mt-1 font-inter font-normal"
            >
              MINA
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span
            style={{ color: "#788691" }}
            className="text-sm font-inter font-light"
          >
            Expected Received
          </span>
          <span
            style={{ color: "#090A0B" }}
            className="text-sm font-inter font-semibold"
          >
            19,928 Mina
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span
            style={{ color: "#788691" }}
            className="text-sm font-inter font-light"
          >
            Price Impact
          </span>
          <span
            style={{ color: "#090A0B" }}
            className="text-sm font-inter font-semibold"
          >
            0,02% Mina
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span
            style={{ color: "#788691" }}
            className="text-sm font-inter font-light"
          >
            Minumum Received
          </span>
          <span
            style={{ color: "#090A0B" }}
            className="text-sm font-inter font-semibold"
          >
            19,924 Mina
          </span>
        </div>
      </div>
    </Container>
  );
};

export default SwapProcess;
