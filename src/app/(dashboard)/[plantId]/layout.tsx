import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { getAuth } from "@/actions/auth";
import Header from "@/components/header";
import NavBar from "@/components/nav-bar";

type DashboardLayoutProps = {
  params: Promise<{ plantId: string }>;
  children: ReactNode;
};

const DashboardLayout = async ({ params, children }: DashboardLayoutProps) => {
  const { plantId } = await params;
  const { data, error } = await getAuth();

  if (error || !data) {
    redirect("/login");
  }

  return (
    <HStack className="size-full">
      <NavBar />
      <VStack className="flex-1 overflow-auto">
        <Header userId={data.user.id} plantId={Number(plantId)} />
        {children}
      </VStack>
    </HStack>
  );
};

export default DashboardLayout;
