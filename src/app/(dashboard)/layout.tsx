import { ReactNode } from "react";

import NavBar from "@/components/organisms/NavBar";
import HStack from "@/components/atoms/HStack";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <HStack className="size-full bg-gray-50">
      <NavBar />
      <div className="flex-1 overflow-auto">{children}</div>
    </HStack>
  );
};

export default DashboardLayout;
