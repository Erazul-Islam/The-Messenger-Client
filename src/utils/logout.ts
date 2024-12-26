/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */

"use client"

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const logout = () => {

  const router = useRouter();
  
  Cookies.remove("accessToken");

  router.push("/login");
};
