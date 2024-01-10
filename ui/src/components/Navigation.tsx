import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="fixed flex items-center bg-[#f4f5f6] justify-center h-[80px] z-[999] w-full">
      <Container>
        <div className="flex items-center justify-between h-full">
          <span className="text-xl font-bold">USDM</span>
          <div className="flex item-center justify-end">
            <Link
              href="/landing"
              className={`text-md font-normal font-poppins ${
                pathname === "/landing"
                  ? "border-[#9f7976] border-b-2"
                  : "first-letter:"
              } overflow-hidden`}
            >
              Home
            </Link>
            <Link
              href="/"
              className={`text-md ml-[48px] font-normal font-poppins ${
                pathname === "/"
                  ? "border-[#9f7976] border-b-2"
                  : "first-letter:"
              } overflow-hidden`}
            >
              Launch App
            </Link>
            {/* <Link
              href="/detail"
              className={`text-md ml-[48px] font-normal font-poppins ${
                pathname === "/detail"
                  ? "border-[#9f7976] border-b-2"
                  : "first-letter:"
              } overflow-hidden`}
            >
              Detail
            </Link> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navigation;
