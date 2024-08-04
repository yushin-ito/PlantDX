import { useContext } from "react";
import { AuthContext } from "@/src/context/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
