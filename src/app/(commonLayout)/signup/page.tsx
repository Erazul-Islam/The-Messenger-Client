/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client";

import React, {  useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";



import { useRouter } from "next/navigation";
import TSForm from "@/src/components/form/form";
import TSInput from "@/src/components/form/input";

import { toast } from "sonner";

const SignupUser = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

  

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const userData = {
            ...data,
            role: "MEMBER", 
        };
        setLoading(true);

        try {
            const response = await fetch("https://the-messenger-xs42.onrender.com/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });


            if (response.ok) {
                toast.success("User registered successfully")
                router.push('/login')
            } else {
                // Handle HTTP errors (e.g., registration failed)
                const errorData = await response.json();
                toast.error("Registration failed: email must be unique " + errorData.message);
                setLoading(false);
            }
        } catch (error) {
      
            toast.error(`An error occurred: ${error} `);
            setLoading(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
            <h3 className="my-2 text-xl text-pink-500 font-bold">Please Sign up</h3>
            <div className="w-[35%]">
                <TSForm

                    onSubmit={onSubmit}
                >
                    <div className="py-3">
                        <TSInput required label="Name" name="name" size="sm" />
                    </div>
                    <div className="py-3">
                        <TSInput required label="Email" name="email" size="sm" />
                    </div>
                    <div className="py-3">
                        <TSInput
                            label="Password"
                            name="password"
                            required
                            size="sm"
                            type="password"
                        />
                    </div>
                    <Button
                        className="my-3 w-full rounded-sm bg-pink-600 text-white"
                        size="lg"
                        type="submit"
                    >
                        {loading? "signing.." : "Sign in"}
                    </Button>
                </TSForm>
                <div className="text-center">
                    Already have an account ? <Link href={"/login"}>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default SignupUser;