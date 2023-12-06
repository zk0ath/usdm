import React from "react";

const Navigation = () => {
  return (
    <div className="flex items-center justify-center h-[80px] w-full">
      <div className="flex items-center justify-between h-full w-[80%]">
        <span className="text-xl font-bold">USDM</span>
        <div className="w-[166px] cursor-pointer border-2 h-[36px] flex items-center justify-center rounded-[8px]">
          Connect Wallet
        </div>
      </div>
    </div>
  );
};

export default Navigation;
