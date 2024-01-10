import Container from "@/components/Container";
import Image from "next/image";
import React from "react";
import Introduction from "@/components/landingPage/Introduction";
import NewsSlider from "@/components/landingPage/NewsSlider";

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
