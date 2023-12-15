import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="fixed flex items-center justify-center h-[80px] w-full">
      <div className="flex items-center justify-between h-full w-[80%]">
        <span className="text-xl font-bold">USDM</span>
        <div className="flex item-center justify-end">
          <Link
            href="/"
            className={`text-md font-normal font-poppins ${
              pathname === "/" ? "border-[#9f7976] border-b-2" : "first-letter:"
            } overflow-hidden`}
          >
            Home
          </Link>
          <Link
            href="/detail"
            className={`text-md ml-[48px] font-normal font-poppins ${
              pathname === "/detail"
                ? "border-[#9f7976] border-b-2"
                : "first-letter:"
            } overflow-hidden`}
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
