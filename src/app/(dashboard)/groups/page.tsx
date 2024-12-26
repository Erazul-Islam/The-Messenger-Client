/* eslint-disable prettier/prettier */

"use client"

import axios from 'axios';
import Cookies from 'js-cookie';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation';


type Group = {
    id: string;
    name: string;
    type: string;
};

const GroupPage = () => {

    const [groups, setGroups] = useState<Group[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const router = useRouter()

    const token = Cookies.get("accessToken");

    const icons = [
        "📚", "🎮", "🎨", "💼", "🏀", "🖥️", "🎶", "⚽", "🌍", "🍔", "🧩", "💻",
    ];


    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/group/see-group`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setGroups(res.data.data);

                setIsLoading(false);
            } catch (err) {
                setIsError(true);
                toast.error(`Failed to fetch groups. ${err}`);
                setIsLoading(false);
            }
        };

        fetchGroups();
    }, [token]);


    const handleClick = (groupId: string) => {
        router.push(`groups/${groupId}`)
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
            <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
                Groups
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group, index) => {
                    const randomIcon = icons[Math.floor(Math.random() * icons.length)]; 

                    return (
                        <motion.div
                            key={group.id}
                            className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow"
                            onClick={() => handleClick(group.id)}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="text-4xl text-center">{randomIcon}</div> {/* Display the random icon */}
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                {group.name}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">Type: {group.type}</p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default GroupPage;