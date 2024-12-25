/* eslint-disable prettier/prettier */

"use client"

import Rightbar, { TGroup } from '@/src/components/ui/dashboard/rightbar/rightbar';
import ChatSkeleton from '@/src/components/ui/skeleton/chatBoxSkeleton';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';


const Chat = () => {

    const { id } = useParams()

    const [groups, setGroups] = useState<TGroup[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    console.log(groups)

    const token = Cookies.get("accessToken");

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/group/see-group/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setGroups(res.data.data);
                setIsLoading(false);
            } catch (err) {
                setIsError(true);
                toast.error("Failed to fetch groups. Please try again.");
                setIsLoading(false);
            }
        };

        fetchGroups();
    }, [token]);

    

    return (
        <div className='flex'>
            <div className="flex flex-col h-screen w-[400px] bg-gray-100 shadow-lg mr-[100px]">
                {/* Chat Header */}
                <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold">Chat Room</h2>
                    <button className="text-sm bg-blue-800 px-2 py-1 rounded hover:bg-blue-700">
                        Leave
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                    {/* Incoming Message */}
                    <div className="flex items-start space-x-3">
                        <div className="bg-gray-300 text-black px-4 py-2 rounded-lg max-w-xs">
                            <p className="text-sm">
                                Hi! How can {id}
                            </p>
                        </div>
                    </div>

                    {/* Outgoing Message */}
                    <div className="flex items-end justify-end space-x-3">
                        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs">
                            <p className="text-sm">I need help with designing a chat box.</p>
                        </div>
                    </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-gray-200 flex items-center space-x-3">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Send
                    </button>
                </div>
            </div>
            <div>
                <Rightbar isLoading={isLoading} groups={groups} />
            </div>
        </div>
    );
};

export default Chat;