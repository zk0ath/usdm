import { ArrowRight } from "@/helpers/icons";
import React from "react";

const NewsSlider = () => {
  return (
    <div className="flex items-center mt-[120px] mb-[280px] justify-center">
      <div
        style={{ border: "1px solid #CDE4F9" }}
        className="w-[300px] h-[200px] flex flex-col p-[24px] rounded-[24px]"
      >
        <span
          style={{ color: "#0F1C49" }}
          className="text-[20px] font-normal font-lexend"
        >
          ETHEREUM GIVEAWAY
        </span>
        <span
          style={{ color: "#130F49" }}
          className="text-[16px] font-normal font-lexend opacitiy-[0.6]"
        >
          Deposite now and win free Ethereum!
        </span>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <span
              style={{ color: "#4F86FF" }}
              className="text-[16px] font-normal font-lexend"
            >
              Deposito Now
            </span>
            <ArrowRight width="16" height="16" />
          </div>
          <div className="w-[84px] h-[84px] rounded-[12px] bg-[#B6C6FF]" />
        </div>
      </div>
      <div
        style={{ border: "1px solid #CDE4F9" }}
        className="w-[300px] ml-[40px] h-[200px] flex flex-col p-[24px] rounded-[24px]"
      >
        <span
          style={{ color: "#0F1C49" }}
          className="text-[20px] font-normal font-lexend"
        >
          BUY AND SELL CRYPTO
        </span>
        <span
          style={{ color: "#130F49" }}
          className="text-[16px] font-normal font-lexend opacitiy-[0.6]"
        >
          Buy and sell popular digital currencies
        </span>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <span
              style={{ color: "#4F86FF" }}
              className="text-[16px] font-normal font-lexend"
            >
              Buy Now
            </span>
            <ArrowRight width="16" height="16" />
          </div>
          <div className="w-[84px] h-[84px] rounded-[12px] bg-[#B6C6FF]"></div>
        </div>
      </div>
      <div
        style={{ border: "1px solid #CDE4F9" }}
        className="w-[300px] h-[200px] ml-[40px] flex flex-col p-[24px] rounded-[24px]"
      >
        <span
          style={{ color: "#0F1C49" }}
          className="text-[20px] font-normal font-lexend"
        >
          TRACK YOUR PORTFOLI
        </span>
        <span
          style={{ color: "#130F49" }}
          className="text-[16px] font-normal font-lexend opacitiy-[0.6]"
        >
          Keep track of them in the one place.
        </span>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <span
              style={{ color: "#4F86FF" }}
              className="text-[16px] font-normal font-lexend"
            >
              Track Now
            </span>
            <ArrowRight width="16" height="16" />
          </div>
          <div className="w-[84px] h-[84px] rounded-[12px] bg-[#B6C6FF]"></div>
        </div>
      </div>
    </div>
  );
};

export default NewsSlider;