/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
"use server"


import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import axiosInstance from "../providers/axiosinstance";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/login", userData);

        if (data.success) {
            const cookieStore = await cookies(); 

            cookieStore.set("accessToken", data?.accessToken);
        }

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const logout = async () => {
    const cookieStore = await cookies(); 
    cookieStore.delete("accessToken");
};

export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    let decodedToken = null;

    if (accessToken) {
        decodedToken = await jwtDecode(accessToken);

        return {
            _id: decodedToken._id,
            email: decodedToken.email,
            password: decodedToken.password,
            role: decodedToken.role,
            name: decodedToken.name,
        };
    }

    return decodedToken;
};