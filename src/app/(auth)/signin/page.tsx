import { redirect } from "next/navigation";

import { createServerClient } from "@/functions/client";
import SignIn from "@/components/pages/SignIn";

const SignInPage = async () => {
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/home");
  }

  return <SignIn />;
};

export default SignInPage;
