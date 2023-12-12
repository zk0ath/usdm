import React, { useState } from "react";
import { useEthers } from "@usedapp/core";
import Image from "next/image";
import { ArrowDown, ParticipantsIcon } from "@/helpers/icons";
import AccountMoreButtons from "./AccountMoreButtons";
import OutsideClickHandler from "react-outside-click-handler";

const FromTransaction = () => {
  const [showMoreButtons, setShowMoreButtons] = useState(false);
  const { activateBrowserWallet, account, deactivate } = useEthers();
  console.log("account", account);

  const handleShowMoreButtons = () => {
    setShowMoreButtons(!showMoreButtons);
  };

  return (
    <div className="w-[650px]  flex flex-col">
      <div className="flex items-center justify-between">
        <span>From</span>
        <OutsideClickHandler
          onOutsideClick={() => {
            setShowMoreButtons(false);
          }}
        >
          <div
            onClick={account ? handleShowMoreButtons : activateBrowserWallet}
            className="w-[186px] cursor-pointer bg-[#d7c7c7] h-[40px] relative p-2 flex items-center rounded-[8px] justify-center"
          >
            {account ? (
              <Image
                src="/images/metamask.png"
                width={24}
                height={24}
                alt="Picture of the author"
              />
            ) : (
              <ParticipantsIcon fillColor="gray" />
            )}
            <span
              style={{ color: "#222" }}
              className="text-md font-normal font-poppins ml-[8px] overflow-hidden "
            >
              {account ? account : " Connect Wallet"}
            </span>
            {account && (
              <div>
                {" "}
                <ArrowDown width="24px" height="24px" />
              </div>
            )}

            {showMoreButtons && account && (
              <AccountMoreButtons handleDisconnect={deactivate} />
            )}
          </div>
        </OutsideClickHandler>
      </div>
      <div className="flex w-full p-[12px] bg-[#dfd5d6] rounded-[8px] mt-4">
        <div className="w-[158px] h-[158px] flex flex-col items-center justify-center rounded-[8px] bg-[#d7c7c7]">
          <div className="w-[56px] h-[56px] rounded-full bg-[#a9a9ae]" />
          <span
            style={{ color: "#222" }}
            className="text-md  font-poppins pt-[8px]"
          >
            Select network
          </span>
        </div>
        <div className="flex flex-col w-full h-[158px] ml-[12px]">
          <div className="w-full h-[73px] bg-[#d7c7c7] p-2 flex flex-col rounded-[8px]">
            <span
              style={{ color: "#222" }}
              className="text-sm font-poppins font-light"
            >
              Asset
            </span>
            <div className="flex mt-2">
              <div className="w-[24px] h-[24px] rounded-full bg-[#a9a9ae] mr-2" />
              <span
                style={{ color: "#222" }}
                className="text-md font-poppins font-medium"
              >
                Select
              </span>
            </div>
          </div>
          <div className="w-[80%] h-[73px] bg-[#d7c7c7] p-2 flex flex-col rounded-[8px] mt-[12px]">
            <span
              style={{ color: "#222" }}
              className="text-sm font-poppins font-light"
            >
              Amount
            </span>
            <input
              style={{ color: "#222" }}
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
