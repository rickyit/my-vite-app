import Header from "@/components/Header";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <main className="container mx-auto my-4">{children}</main>
    </div>
  );
};

export default Layout;
