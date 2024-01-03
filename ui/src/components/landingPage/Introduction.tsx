import { CurrencyLogo, TheLogo } from "@/helpers/icons";
import React from "react";
import Image from "next/image";

const Introduction = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col  justify-center w-[625px]">
        <div className="relative mt-[96px]">
          <div className="absolute bg-[#fff] z-20 top-[-84px] left-[-79px]">
            <TheLogo />
          </div>
          <span className="font-inter text-[72px] relative font-normal tracking-tighter leading-[82px]">
            The easiest way to buy & sell cryptocurrency
            <div className="absolute right-[-36px] bottom-[8px] bg-[#fff]">
              <CurrencyLogo />
            </div>
          </span>
        </div>
        <span
          style={{ color: "#130F49" }}
          className="font-light mt-[33px] font-lexend tracking-tighter text-[24px] opacity-[0.9]"
        >
          Invest in crypto — all in one place.
        </span>
        <div className="w-[182px] mt-[65px] cursor-pointer bg-[#4F86FF] h-[80px] flex items-center justify-center rounded-[20px]">
          <span
            style={{ color: "#fff" }}
            className="text-[18px] font-normal font-lexend"
          >
            Start Now
          </span>
        </div>
      </div>
      <div className="relative">
        <Image
          width={329}
          height={200}
          src={"/images/iphone12.png"}
          alt="iphone12"
          className="absolute bottom-4 z-20 left-[20%]"
        />
        <div className="w-[542px] h-[542px] rounded-r-full rounded-l-full bg-[#EBF5FF]"></div>
        <div className="w-[542px] h-[271px] absolute bg-[#fff] top-0 z-10" />
      </div>
    </div>
  );
};

export default Introduction;