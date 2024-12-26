/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */

"use client"

import React from 'react';
import { useUserInfo } from '@/src/utils/userinfo';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';

import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

type FormData = {
    name: string;
    type: string;
};

const Dashboard = () => {
    const { userInfo } = useUserInfo();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const router = useRouter()

    if (!userInfo) {
        return <Spinner style={{alignItems:"center", justifyContent:'center'}} />;
    }

    const userId = userInfo.id;

    const token = Cookies.get("accessToken");


    const onSubmit: SubmitHandler<FormData> = async (data: { name: string; type: string }) => {


        try {
            // Create group request
            await axios.post(
                `https://the-messenger-xs42.onrender.com/api/group/create-group/${userId}`,
                {
                    name: data.name,
                    type: data.type,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success('Group created successfully!');
            router.push("/groups")
        } catch (err) {
            toast.error(`Failed to create group. ${err} `);

        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-6 px-4">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Create Group</h2>

            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium">Group Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('name', { required: 'Group name is required' })}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="type" className="block text-gray-700 font-medium">Group Type</label>
                        <select
                            id="type"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('type', { required: 'Group type is required' })}
                        >
                            <option value="GENERAL_CHAT">General Chat</option>
                            <option value="ADMIN_CHAT">Admin Chat</option>
                        </select>
                        {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Create Group
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
