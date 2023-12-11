import React from "react";
import { FC } from "react";
import { Typography } from "@mui/material";
import { useEthers } from "@usedapp/core";

interface IIcons {
  fillColor?: string;
  width?: number;
  height?: number;
  transform?: string;
  className?: string;
}

const ParticipantsIcon: FC<IIcons> = ({ fillColor }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill={fillColor}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 2C2 1.44687 1.55313 1 1 1C0.446875 1 0 1.44687 0 2V12.5C0 13.8813 1.11875 15 2.5 15H15C15.5531 15 16 14.5531 16 14C16 13.4469 15.5531 13 15 13H2.5C2.225 13 2 12.775 2 12.5V2ZM14.7063 4.70625C15.0969 4.31563 15.0969 3.68125 14.7063 3.29063C14.3156 2.9 13.6812 2.9 13.2906 3.29063L10 6.58437L8.20625 4.79063C7.81563 4.4 7.18125 4.4 6.79063 4.79063L3.29063 8.29062C2.9 8.68125 2.9 9.31563 3.29063 9.70625C3.68125 10.0969 4.31563 10.0969 4.70625 9.70625L7.5 6.91563L9.29375 8.70938C9.68437 9.1 10.3188 9.1 10.7094 8.70938L14.7094 4.70937L14.7063 4.70625Z" />
  </svg>
);

const FromTransaction = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  console.log("account", account);

  return (
    <div className="w-[650px]  flex flex-col">
      <div className="flex items-center justify-between">
        <span>From</span>
        <div
          onClick={activateBrowserWallet}
          className="w-[186px] cursor-pointer bg-[#070528] h-[40px] flex items-center rounded-[8px] justify-center"
        >
          <ParticipantsIcon fillColor="gray" />
          <span
            style={{ color: "#eee" }}
            className="text-md font-normal font-poppins ml-[8px]"
          >
            Connect Wallet
          </span>
        </div>
      </div>
      <div className="flex w-full p-[12px] bg-[#2A2A4E] rounded-[8px] mt-4">
        <div className="w-[158px] h-[158px] flex flex-col items-center justify-center rounded-[8px] bg-[#57576E]">
          <div className="w-[56px] h-[56px] rounded-full bg-[#a9a9ae]" />
          <span
            style={{ color: "#fff" }}
            className="text-md  font-poppins pt-[8px]"
          >
            Select network
          </span>
        </div>
        <div className="flex flex-col w-full h-[158px] ml-[12px]">
          <div className="w-full h-[73px] bg-[#57576E] p-2 flex flex-col rounded-[8px]">
            <span
              style={{ color: "#eee" }}
              className="text-sm font-poppins font-light"
            >
              Asset
            </span>
            <div className="flex mt-2">
              <div className="w-[24px] h-[24px] rounded-full bg-[#a9a9ae] mr-2" />
              <span
                style={{ color: "#fff" }}
                className="text-md font-poppins font-medium"
              >
                Select
              </span>
            </div>
          </div>
          <div className="w-[80%] h-[73px] bg-[#57576E] p-2 flex flex-col rounded-[8px] mt-[12px]">
            <span
              style={{ color: "#eee" }}
              className="text-sm font-poppins font-light"
            >
              Amount
            </span>
            <input
              style={{ color: "#fff" }}
              placeholder="0.00"
              type="number"
              className="mt-2 bg-inherit outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FromTransaction;
