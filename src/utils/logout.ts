/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const logout = () => {

  Cookies.remove("accessToken");
  const router = useRouter();
  router.push("/login");
};
