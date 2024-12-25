/* eslint-disable prettier/prettier */
"use server"

import axios from "axios";
import Cookies from "js-cookie";

import envConfig from "@/src/config/envConfig";


const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});

axiosInstance.interceptors.request.use(
  function (config) {

    const accessToken = Cookies.get("accessToken")

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;