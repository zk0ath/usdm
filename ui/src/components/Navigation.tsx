import React from "react";
import { PublicKey } from "o1js";
import { useAppDispatch } from "@/store/hooks";
import { setIsAccountExist, setPublicKey } from "@/store/dataSlice";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const connectWallet = async () => {
    const publicKeyBase58: string[] | any = await (window as any).mina
      .requestAccounts()
      .catch((err: any) => err);

    if (!publicKeyBase58?.message) {
      const publicKey = await PublicKey.fromBase58(publicKeyBase58[0]);

      dispatch(setIsAccountExist(publicKeyBase58.length > 0));
      dispatch(setPublicKey(publicKey));
    }
  };
  return (
    <div className="fixed flex items-center justify-center h-[80px] w-full">
      <div className="flex items-center justify-between h-full w-[80%]">
        <span className="text-xl font-bold">USDM</span>
        <div
          onClick={connectWallet}
          className="w-[166px] cursor-pointer border-2 h-[36px] flex items-center justify-center rounded-[8px]"
        >
          Connect Wallet
        </div>
      </div>
    </div>
  );
};

export default Navigation;
