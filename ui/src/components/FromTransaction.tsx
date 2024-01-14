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
} from "@/store/dataSlice";
import { debounce } from "lodash";
import { toast } from "react-toastify";

const FromTransaction = () => {
  const dispatch = useAppDispatch();
  const balance = useAppSelector((state) => state.dataSlice.balance);
  const allowanceBalance = useAppSelector(
    (state) => state.dataSlice.allowanceBalance
  );

  const [showMoreButtons, setShowMoreButtons] = useState(false);
  const [amount, setAmount] = useState(0);
  const [showApprove, setShowApprove] = useState(false);
  const { activateBrowserWallet, account, deactivate } = useEthers();

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
      // const allowanceBalanceBN = ethers.BigNumber.from(allowanceBalance);
      // const amountBN = ethers.utils.parseUnits(amount.toString(), 6); // Assuming 6 decimal places, adjust as needed
  
      // if (amountBN.gt(allowanceBalanceBN)) {
      //   setShowApprove(true);
      // } else {
      //   setShowApprove(false);
      // }
    } catch (error) {
      console.error("Error parsing values:", error);
      // Handle parsing error, perhaps reset the approval state
      setShowApprove(false);
    }
  }, 1000);

  const handleAmount = (e: any) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    updateAmountWithDebounce();
  }, [amount]);

  return (
    <>
      <div className="w-[650px]  flex flex-col">
        <div className="flex items-center justify-between">
          <span
            style={{ color: "#554747" }}
            className="text-md font-normal font-poppins ml-[8px] overflow-hidden "
          >
            From
          </span>
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
                <AccountMoreButtons
                  handleDisconnect={deactivate}
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
              className="text-md  font-poppins mt-[8px] mb-[12px]"
            >
              Network
            </span>
            <UsdcLogo width="56" height="56" />
            <span
              style={{ color: "#222" }}
              className="text-md  font-poppins mt-[12px]"
            >
              Usdc
            </span>
          </div>
          <div className="flex flex-col w-full h-[158px] ml-[12px]">
            <div className="w-full h-[73px] bg-[#d7c7c7] p-2 flex flex-col rounded-[8px]">
              <span
                style={{ color: "#222" }}
                className="text-sm font-light font-poppins"
              >
                Asset
              </span>
              <div className="flex mt-2">
                <UsdcLogo width="24" height="24" />
                <span
                  style={{ color: "#222" }}
                  className="ml-2 font-medium text-md font-poppins"
                >
                  USDC
                </span>
              </div>
            </div>
            <div className="w-[100%] flex mt-[12px]">
              <div className="w-[80%] h-[73px] bg-[#d7c7c7] p-2 flex flex-col rounded-[8px] ">
                <span
                  style={{ color: "#222" }}
                  className="text-sm font-light font-poppins"
                >
                  Amount
                </span>
                <input
                  style={{ color: "#222" }}
                  placeholder="0.00"
                  value={amount > 0 ? amount : ""}
                  type="number"
                  onChange={handleAmount}
                  className="mt-2 outline-none bg-inherit"
                />
              </div>
              <div className="w-[20%] flex flex-col p-2 h-[73px] ml-2">
                <span
                  style={{ color: "#222" }}
                  className="font-light text-md font-poppins"
                >
                  Balance
                </span>
                <span
                  style={{ color: "#222" }}
                  className="mt-2 font-light text-md font-poppins"
                >
                  {ethers.utils.formatUnits(balance, 6)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showApprove ? (
        <button
          className="w-[120px] h-[40px] bg-[#D6C7C6] text-md font-poppins font-medium rounded-[8px] mt-4 flex items-center justify-center transaction-button"
          onClick={handleAproveContract}
        >
          Approve
        </button>
      ) : (
        <button
          className="w-[120px] h-[40px] bg-[#D6C7C6] text-md font-poppins font-medium rounded-[8px] mt-4 flex items-center justify-center transaction-button"
          onClick={handleSendContract}
        >
          Send
        </button>
      )}
      <InformationDialog />
    </>
  );
};

export default FromTransaction;
