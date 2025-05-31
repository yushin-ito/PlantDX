import { redirect } from "next/navigation";

import { getAuth } from "@/actions/auth";
import WalkthroughContainer from "@/components/walkthrough/walkthrough.container";

const WalkthroughPage = async () => {
  const { data, error } = await getAuth();

  if (error || !data) {
    redirect("/login");
  }

  return <WalkthroughContainer userId={data.user.id} />;
};

export default WalkthroughPage;
