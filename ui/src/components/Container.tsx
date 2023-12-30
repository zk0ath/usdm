import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-[1240px] box-border">{children}</div>;
};

export default Container;
