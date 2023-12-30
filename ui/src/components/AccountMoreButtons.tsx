import React from "react";

interface propTypes {
  handleDisconnect: () => void;
  handleCopyToClipboard: () => void;
}

const AccountMoreButtons = ({
  handleDisconnect,
  handleCopyToClipboard,
}: propTypes) => {
  return (
    <div className="w-[176px]  h-auto flex flex-col cursor-pointer p-2 bg-[#fff] border border-[#8BB7A2] absolute top-[44px] rounded-[8px] z-10 right-0">
      <span
        style={{ color: "#555" }}
        onClick={handleCopyToClipboard}
        className="text-md font-normal hover:bg-[#f4f5f6] p-2 rounded-[8px] font-poppins"
      >
        Coppy adress
      </span>
      <span
        style={{ color: "#555" }}
        className="text-md font-normal hover:bg-[#f4f5f6] mt-4 p-2 rounded-[8px] font-poppins"
      >
        Change wallet
      </span>
      <span
        style={{ color: "#555" }}
        onClick={handleDisconnect}
        className="text-md font-normal hover:bg-[#f4f5f6] p-2 rounded-[8px]  mt-4 font-poppins"
      >
        Disconnect
      </span>
    </div>
  );
};

export default AccountMoreButtons;
