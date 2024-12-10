import { redirect } from "next/navigation";

import { getAuth } from "@/actions/auth";
import LogIn from "@/components/login/log-in";

const LoginPage = async () => {
  const { data } = await getAuth();

  if (data) {
    redirect("/");
  }

  return <LogIn />;
};

export default LoginPage;
