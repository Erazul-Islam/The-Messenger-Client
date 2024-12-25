/* eslint-disable prettier/prettier */
"use client";
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */

import { FieldValues, SubmitHandler } from "react-hook-form";

import { useState } from "react";

import Cookies from "js-cookie"

import { Button } from "@nextui-org/button";

import Link from "next/link";
import TSForm from "@/src/components/form/form";
import TSInput from "@/src/components/form/input";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



/* eslint-disable prettier/prettier */
const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true)

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.success === true) {
                const { accessToken } = response.data.data

                Cookies.set('accessToken', accessToken, { expires: 1 })

                toast.success("Logged in successfully")

                router.push('/')
            }


        } catch (err: any) {

        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
                <h3 className="my-2 text-2xl text-pink-700 font-bold">Please log in</h3>
                <p className="mb-4"></p>
                <div className="w-[35%]">
                    <TSForm
                        onSubmit={onSubmit}
                    >
                        <div className="py-3">
                            <TSInput label="Email" name="email" type="email" />
                        </div>
                        <div className="py-3">
                            <TSInput label="Password" name="password" type="password" />
                        </div>

                        <Button
                            className="my-3 w-full rounded-sm  bg-pink-700 font-semibold text-white"
                            size="lg"
                            type="submit"
                        >
                            {loading ? "Logging" : 'Login'}
                        </Button>
                    </TSForm>
                    <div className="md:flex justify-evenly">
                        <div className="text-center">
                            Don&lsquo;t have account ? <Link href={"/register"}> <p className="text-pink-500">Register</p> </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;