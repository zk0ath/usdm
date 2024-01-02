import Container from "@/components/Container";
import Image from "next/image";
import React from "react";
import { TheLogo, CurrencyLogo } from "@/helpers/icons";
import Introduction from "@/components/landingPage/introduction";
import NewsSlider from "@/components/landingPage/newsSlider";

const LandingPage = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <Container>
        <div className="flex flex-col pt-[96px]">
          <Introduction />
          <NewsSlider />
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;