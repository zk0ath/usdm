import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setIsAccountExist, setPublicKey } from "@/store/dataSlice";
import Image from "next/image";
import OutsideClickHandler from "react-outside-click-handler";
import { ArrowDown, MinaLogo } from "@/helpers/icons";
import AccountMoreButtons from "./AccountMoreButtons";
import { toast } from "react-toastify";

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

const ToTransaction = () => {
  const dispatch = useAppDispatch();
  const [auroAccount, setAuroAccount] = useState(null);
  const [showMoreButtons, setShowMoreButtons] = useState(false);

  const handleShowMoreButtons = () => {
    setShowMoreButtons(!showMoreButtons);
  };

  const connectWallet = async () => {
    const account: string[] | any = await (window as any).mina
      .requestAccounts()
      .catch((err: any) => err);

    if (account) {
      setAuroAccount(account[0]);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(auroAccount || "")
      .then(() => {
        toast.success(`Text successfully copied to clipboard:${auroAccount}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard:", err);
      });
  };

  useEffect(() => {
    const getAccount = async () => {
      const account: string[] | any = await (window as any).mina.getAccounts();

      if (account) {
        setAuroAccount(account[0]);
      }

      return account[0];
    };
    getAccount();
  }, []);
  return (
    <div className="w-[650px] mt-4 flex flex-col">
      <div className="flex items-center justify-between">
        <span
          style={{ color: "#554747" }}
          className="text-md font-normal font-poppins ml-[8px] overflow-hidden "
        >
          To
        </span>
        <OutsideClickHandler
          onOutsideClick={() => {
            setShowMoreButtons(false);
          }}
        >
          <div
            onClick={auroAccount ? handleShowMoreButtons : connectWallet}
            className="w-[186px] cursor-pointer bg-[#d7c7c7] h-[40px] relative p-2 flex items-center rounded-[8px] justify-center"
          >
            {auroAccount ? (
              <Image
                src="/images/auro.png"
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
              {auroAccount ? auroAccount : " Connect Wallet"}
            </span>
            {auroAccount && (
              <div>
                {" "}
                <ArrowDown width="24px" height="24px" />
              </div>
            )}

            {showMoreButtons && auroAccount && (
              <AccountMoreButtons
                handleDisconnect={() => {}}
                handleCopyToClipboard={handleCopyToClipboard}
              />
            )}
          </div>
        </OutsideClickHandler>
      </div>
      <div className="flex w-full p-[12px] bg-[#dfd5d6] rounded-[8px] mt-4">
        <div className="w-[158px] h-[158px] flex flex-col items-center  rounded-[8px] bg-[#d7c7c7]">
          <span
            style={{ color: "#666" }}
            className="text-md  font-poppins mt-[8px]"
          >
            Network
          </span>
          <div className="mt-[12px]">
            <MinaLogo width="56" height="56" />
          </div>
          <span
            style={{ color: "#222" }}
            className="text-md  font-poppins mt-[12px]"
          >
            Mina
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
                USDM
              </span>
            </div>
          </div>
          <div className="w-[100%] flex mt-[12px]">
            <div className="w-[80%] h-[73px] bg-[#d7c7c7] p-2 flex flex-col rounded-[8px] ">
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
            <div className="w-[20%] flex flex-col p-2 h-[73px] ml-2">
              <span
                style={{ color: "#222" }}
                className="text-md font-poppins font-light"
              >
                Balance
              </span>
              <span
                style={{ color: "#222" }}
                className="text-md font-poppins font-light mt-2"
              >
                -
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToTransaction;
