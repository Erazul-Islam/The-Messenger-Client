/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";

const getUserInfoFromToken = (token: string) => {
    console.log(token)
    try {

        const decoded = jwt.decode(token);

        if (decoded) {
            return decoded;
        }

        return null;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};


export const getUserInfo = (): JwtPayload | null => {
    const token = Cookies.get("accessToken");
 

    if (token) {
        try {
            const decoded = jwt.decode(token) as JwtPayload;
            return decoded || null; 
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    }

    return null;
};