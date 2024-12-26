/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client"


import React from 'react';
import { motion } from "framer-motion"
import Link from 'next/link';

import { useUserInfo } from '@/src/utils/userinfo';


const GetStarted = () => {


    const {userInfo} = useUserInfo()

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center px-4 py-8 text-gray-800 dark:text-white">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold">Welcome to ChatVerse!</h1>
                <p className="mt-4 text-lg">Your journey to seamless communication begins here.</p>
            </motion.div>

            {/* Features Section */}
            <div className="mt-12 grid gap-8 md:grid-cols-3">
                {[
                    {
                        step: "Private Chats",
                        description: "Secure and seamless one-on-one conversations.",
                        icon: "💬",
                    },
                    {
                        step: "Group Chats",
                        description: "Collaborate with friends, family, and teams.",
                        icon: "👥",
                    },
                    {
                        step: "Private Chats",
                        description: "Secure and seamless one-on-one conversations.",
                        icon: "💬",
                    },
                    {
                        step: "Media Sharing",
                        description: "Share photos, videos, and documents effortlessly.",
                        icon: "📎",
                    },
                    {
                        step: "Private Chats",
                        description: "Secure and seamless one-on-one conversations.",
                        icon: "💬",
                    },
                    {
                        step: "Group Chats",
                        description: "Collaborate with friends, family, and teams.",
                        icon: "👥",
                    },
                    
                    
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center"
                    >
                        <div className="text-4xl">{item.icon}</div>
                        <h3 className="mt-4 text-xl font-semibold">{item.step}</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Onboarding Progress */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 2 }}
                className="mt-12 h-2 bg-blue-600 rounded-full"
            ></motion.div>

            {/* Call-to-Action */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="mt-12"
            >
                <button className="px-6 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700">
                    {userInfo === null ? <Link href='/signup'>Signup</Link> : <Link href="/groups">start chat</Link>} 
                </button>
            </motion.div>
        </div>
    );
};

export default GetStarted;