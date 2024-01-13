import React, { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import Image from "next/image";
import { ethers } from "ethers";
import {
  ArrowDown,
  EthereumLogo,
  ParticipantsIcon,
  UsdcLogo,
} from "@/helpers/icons";
import AccountMoreButtons from "./AccountMoreButtons";
import OutsideClickHandler from "react-outside-click-handler";
import InformationDialog from "./InformationDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  approve,
  getContract,
  sendContract,
  setResetBalance,
  setAmount,
} from "@/store/dataSlice";
import { debounce } from "lodash";
import { toast } from "react-toastify";


type FromProps = {
  onShowApproveChange: (showApprove: boolean) => void;
};

const From: React.FC<FromProps> = ({ onShowApproveChange }) => {
  const dispatch = useAppDispatch();
  const balance = useAppSelector((state) => state.dataSlice.balance);
  const allowanceBalance = useAppSelector(
    (state) => state.dataSlice.allowanceBalance
  );
  const amount = useAppSelector((state) => state.dataSlice.amount);

  const [showMoreButtons, setShowMoreButtons] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const { activateBrowserWallet, account, deactivate } = useEthers();
  useEffect(() => {
    onShowApproveChange(showApprove);
  }, [showApprove, onShowApproveChange]);
  const handleShowMoreButtons = () => {
    setShowMoreButtons(!showMoreButtons);
  };
  
  const handleSendContract = () => {
    const obj = {
      amount,
      account,
    };

    if (account && amount > 0) dispatch(sendContract(obj));
  };
  const handleAproveContract = () => {
    const obj = {
      amount,
      account,
    };

    if (account && amount > 0) dispatch(approve(obj));
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(account || "")
      .then(() => {
        toast.success(`Text successfully copied to clipboard:${account}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard:", err);
      });
  };

  useEffect(() => {
    if (account) {
      dispatch(getContract(account));
    } else {
      dispatch(setResetBalance());
    }
  }, [account]);

  const updateAmountWithDebounce = debounce(() => {
    try {
      let ut = ethers.utils.parseUnits(amount.toString(), 6);
      let dd = ut.toNumber();
      if(dd > allowanceBalance){
        setShowApprove(true);
      } else {
        setShowApprove(false);
      }
    } catch (error) {
      console.error("Error parsing values:", error);
      // Handle parsing error, perhaps reset the approval state
      setShowApprove(false);
    }
  }, 2000);

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    const numericValue = inputVal === "" ? 0 : parseFloat(inputVal);
    dispatch(setAmount(numericValue));
  };

  useEffect(() => {
    updateAmountWithDebounce();
  }, [amount]);
  return (
    <div className="flex flex-col mr-[32px]">
      <OutsideClickHandler
        onOutsideClick={() => {
          setShowMoreButtons(false);
        }}
      >
        <div
          onClick={account ? handleShowMoreButtons : activateBrowserWallet}
          className="w-[186px] mb-2 cursor-pointer border border-[#8BB7A2] h-[40px] relative p-2 flex items-center rounded-[8px] justify-center"
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
            style={{ color: "#8BB7A2" }}
            className="text-md font-normal font-poppins ml-[8px] overflow-hidden "
          >
            {account ? account : " Connect Wallet"}
          </span>
          {account && (
            <div>
              {" "}
              <ArrowDown fillColor="#8BB7A2" width="24px" height="24px" />
            </div>
          )}

          {showMoreButtons && account && (
            <AccountMoreButtons
              handleDisconnect={deactivate}
              handleCopyToClipboard={handleCopyToClipboard}
            />
          )}
        </div>
      </OutsideClickHandler>
      <div className="w-[604px] h-[160px] flex flex-col rounded-[24px] bg-[#fff] gap-[16px] p-[24px]">
        <div className="flex items-center">
          <span
            style={{ color: "#090A0B" }}
            className="overflow-hidden text-sm font-normal font-inter lining-nums proportional-nums"
          >
            From
          </span>
          <div className="w-[73px] ml-4 h-[24px] border flex items-center justify-center rounded-[8px] border-[#8BB7A2] ">
            <span
              style={{ color: "#8BB7A2" }}
              className="overflow-hidden text-xs font-normal font-inter lining-nums proportional-nums"
            >
              Ethereum
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <UsdcLogo width="33" height="33" />
            <span
              style={{ color: "#090A0B" }}
              className="ml-2 mr-2 text-lg font-semibold font-lexend"
            >
              USDC
            </span>
            <ArrowDown width="24px" height="24px" fillColor="#090A0B" />
          </div>

          <input
            style={{ color: "#090A0B" }}
            placeholder="0.00"
            value={amount > 0 ? amount : ""}
            type="number"
            onChange={handleAmount}
            className="text-2xl ml-2 w-[66px] mr-2 font-semibold font-lexend bg-inherit outline-none"
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
              {ethers.utils.formatUnits(balance, 6)} ETH
            </span>
          </div>
          <span
            style={{ color: "#788691" }}
            className="font-normal text-md font-inter"
          >
            =$6,099.37
          </span>
        </div>
      </div>
    </div>
  );
};

export default From;