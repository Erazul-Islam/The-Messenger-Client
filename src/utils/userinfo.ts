/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */

"use client"

import { useState, useEffect } from "react";
import { getUserInfo } from "../utils/auth.info"; // Import the getUserInfo function
import { JwtPayload } from "jsonwebtoken";

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<JwtPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const user = getUserInfo(); 
    if (user) {
      setUserInfo(user); 
    }
    setLoading(false);
  }, []);

  return { userInfo, loading };
};
