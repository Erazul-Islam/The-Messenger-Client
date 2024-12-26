/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
"use server"

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getCurrentUser = async () => {
    const accessToken = Cookies.get("accessToken");

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