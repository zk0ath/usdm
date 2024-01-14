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
const To = () => {
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
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <OutsideClickHandler
          onOutsideClick={() => {
            setShowMoreButtons(false);
          }}
        >
          <div
            onClick={auroAccount ? handleShowMoreButtons : connectWallet}
            className="w-[186px] cursor-pointer mb-2 border border-[#8BB7A2] h-[40px] relative p-2 flex items-center rounded-[8px] justify-center"
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
              style={{ color: "#8BB7A2" }}
              className="text-md font-normal font-poppins ml-[8px] overflow-hidden "
            >
              {auroAccount ? auroAccount : " Connect Wallet"}
            </span>
            {auroAccount && (
              <div>
                {" "}
                <ArrowDown width="24px" height="24px" fillColor="#8BB7A2" />
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
      <div className="w-[604px] h-[160px] flex flex-col rounded-[24px] bg-[#fff] gap-[16px] p-[24px]">
        <div className="flex items-center">
          <span
            style={{ color: "#090A0B" }}
            className="overflow-hidden text-sm font-normal font-inter lining-nums proportional-nums"
          >
            To
          </span>
          <div className="w-[73px] ml-4 h-[24px] border flex items-center justify-center rounded-[8px] border-[#8BB7A2] ">
            <span
              style={{ color: "#8BB7A2" }}
              className="overflow-hidden text-xs font-normal font-inter lining-nums proportional-nums"
            >
              Mina
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MinaLogo width="33" height="33" />
            <span
              style={{ color: "#090A0B" }}
              className="ml-2 mr-2 text-lg font-semibold font-lexend"
            >
              Usdm
            </span>
            <ArrowDown width="24px" height="24px" fillColor="#090A0B" />
          </div>
          <input
            style={{ color: "#090A0B" }}
            placeholder="0.00"
            type="number"
            className="text-2xl  w-[66px] font-semibold font-lexend bg-inherit outline-none"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <span
              style={{ color: "#788691" }}
              className="mr-2 text-sm font-normal font-inter"
            >
              Available:
            </span>
            <span
              style={{ color: "#090A0B" }}
              className="mr-2 text-sm font-normal font-inter"
            >
              0 USDM
            </span>
          </div>
          <span
            style={{ color: "#788691" }}
            className="font-normal text-md font-inter"
          >
            =$2.000
          </span>
        </div>
      </div>
    </div>
  );
};

export default To;
