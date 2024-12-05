import { ReactNode } from "react";

import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import Navbar from "@/components/layouts/Navbar";
import Header from "@/components/layouts/Header";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <HStack className="size-full">
      <Navbar />
      <VStack className="flex-1 overflow-auto">
        <Header />
        {children}
      </VStack>
    </HStack>
  );
};

export default DashboardLayout;
