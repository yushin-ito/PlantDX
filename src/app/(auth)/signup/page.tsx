import { redirect } from "next/navigation";

import { getAuth } from "@/actions/auth";
import SignUp from "@/components/singup/sign-up";

const SignUpPage = async () => {
  const { data } = await getAuth();

  if (data) {
    redirect("/");
  }

  return <SignUp />;
};

export default SignUpPage;
