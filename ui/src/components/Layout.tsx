import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <main className="h-[100vh]">
      {children} {/* This will render the current route's component */}
    </main>
  </>
);

export default Layout;
