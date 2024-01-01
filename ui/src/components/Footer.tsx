import React from "react";
import Container from "./Container";
import {
  TelegramLogo,
  YoutubeLogo,
  MediumLogo,
  TwitterLogo,
} from "@/helpers/icons";

const Footer = () => {
  return (
    <div className="w-full h-[384px] rounded-t-[48px] bg-[#E9EBED] mt-[80px] flex items-start justify-center">
      <Container>
        <div className="flex mt-[64px] ">
          <div className="flex flex-col gap-[24px] w-[392px]">
            <h2 className="text-xl font-bold">USDM</h2>
            <span
              style={{ color: "#788691" }}
              className="text-sm font-light font-inter"
            >
              Ronafolk is world first DeFi multi-cross-chain NFT payment system
              that can be used to purchase NFTs using thousands of Tokens across
              all of our supported chains.
            </span>
            <div className="flex gap-[24px] items-center">
              <TelegramLogo />
              <TwitterLogo />
              <YoutubeLogo />
              <MediumLogo />
            </div>
          </div>
          <div className="flex flex-col ml-[120px] gap-[12px]">
            <span
              style={{ color: "#090A0B" }}
              className="text-sm font-inter font-normal"
            >
              Features
            </span>
            <span
              style={{ color: "#788691" }}
              className="text-sm font-inter font-light"
            >
              Dashboard
            </span>
            <span
              style={{ color: "#788691" }}
              className="text-sm font-inter font-light"
            >
              Swap
            </span>
            <span
              style={{ color: "#788691" }}
              className="text-sm font-inter font-light"
            >
              Hub
            </span>
            <span
              style={{ color: "#788691" }}
              className="text-sm font-inter font-light"
            >
              Mining Pool
            </span>
          </div>
          <div className="flex flex-col ml-[80px] gap-[12px]">
            <span
              style={{ color: "#090A0B" }}
              className="text-sm font-inter font-normal"
            >
              Service
            </span>
            <span
              style={{ color: "#788691" }}
              className="text-sm font-inter font-light"
            >
              Contact Us
            </span>
            <span
              style={{ color: "#788691" }}
              className="text-sm font-inter font-light"
            >
              Tokennomics
            </span>
            <span
              style={{ color: "#788691" }}
              className="text-sm font-inter font-light"
            >
              Live Tech Support
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
