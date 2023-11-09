import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Header/>
    <main>
      {children} {/* This will render the current route's component */}
    </main>
    <Footer/>
  </>
);

export default Layout;
