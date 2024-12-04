import { ReactNode } from "react";

import HStack from "@/components/atoms/HStack";
import NavBar from "@/components/organisms/NavBar";
import VStack from "@/components/atoms/VStack";
import Header from "@/components/organisms/Header";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <HStack className="size-full">
      <NavBar />
      <VStack className="flex-1 overflow-auto">
        <Header />
        {children}
      </VStack>
    </HStack>
  );
};

export default DashboardLayout;
