import { PropsWithChildren } from "react";
import Header from "./Header";
import LangSelect from "../LangSelect";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col relative">
      <Header />
      {/* <Menu /> */}
      <div className="lg:px-64 py-6 content">
        {/* <Breadcrumb /> */}
        <div>{children}</div>
      </div>
      <LangSelect className="fixed bottom-16 right-4 w-max max-w-[180px] z-30" />
    </div>
  );
};
