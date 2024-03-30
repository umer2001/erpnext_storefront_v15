import { PropsWithChildren } from "react";
import { Breadcrumb } from "../breadcrumb";
import { Menu } from "../menu";
import Header from "./Header";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      {/* <Menu /> */}
      <div className="lg:px-64 py-6 content">
        {/* <Breadcrumb /> */}
        <div>{children}</div>
      </div>
    </div>
  );
};
