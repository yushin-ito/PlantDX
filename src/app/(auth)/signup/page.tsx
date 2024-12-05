import { redirect } from "next/navigation";

import { createServerClient } from "@/functions/client";
import SignUp from "@/components/pages/SignUp";

const SignUpPage = async () => {
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/home");
  }

  return <SignUp />;
};

export default SignUpPage;
