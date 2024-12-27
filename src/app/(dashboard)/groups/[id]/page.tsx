/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import io from "socket.io-client";


import { useUserInfo } from "@/src/utils/userinfo";
import Rightbar, { TGroup } from "@/src/components/ui/dashboard/rightbar/rightbar";
import Sidebar from "@/src/components/ui/dashboard/sidebar/Sidebar";

const socket = io("https://the-messenger-xs42.onrender.com");

const Chat = () => {
    const { id } = useParams();
    const { userInfo } = useUserInfo();
    const [groups, setGroups] = useState<TGroup[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false)
    const token = Cookies.get("accessToken");

    const messageInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await axios.get(
                    `https://the-messenger-xs42.onrender.com/api/group/see-group/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setGroups(res.data.data);

                setIsLoading(false);
            } catch (err) {
                toast.error(`Failed to fetch groups. ${err}`);
                setIsLoading(false);
            }
        };

        fetchGroups();
    }, [token, id]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(
                    `https://the-messenger-xs42.onrender.com/api/message/view/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setMessages((prevMessages) => {
                    const newMessages = res.data?.data?.filter(
                        (message: any) =>
                            !prevMessages.some(
                                (prevMessage) => prevMessage.content === message.content && prevMessage.createdAt === message.createdAt
                            )
                    );

                    return [...prevMessages, ...newMessages];
                });
            } catch (error) {
                toast.error(`Failed to fetch messages.${error}.`);
            } finally {
                setIsLoading(false);
            }
        };

        if (id && token) fetchMessages();
    }, [id, token]);

    useEffect(() => {
        socket.on("receiveMessage", ({ content, userId, groupId, userName, createdAt }) => {

            if (content && userId && createdAt) {
                const newMessage = { content, userId, groupId, userName, createdAt };

                setMessages((prevMessages) => {
                    // Avoid adding duplicate messages
                    if (
                        !prevMessages.some(
                            (message) =>
                                message.content === newMessage.content &&
                                message.createdAt === newMessage.createdAt
                        )
                    ) {
                        return [...prevMessages, newMessage];
                    }

                    return prevMessages;
                });
            }
            scrollToBottom();
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    const handleSendMessage = async () => {
        
        if (newMessage.trim()) {
            const userId = userInfo?.id;
            const messageData = {
                content: newMessage,
                userId: userId,
                groupId: id,
                userName: userInfo?.name,
                createdAt: new Date().toISOString()
            };


            setLoading(true);

            try {

                await axios.post(
                    `https://the-messenger-xs42.onrender.com/api/message/send/${id}/${userId}`,
                    messageData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );


                socket.emit("sendMessage", messageData);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    messageData
                ]);


                setNewMessage("");
                messageInputRef.current?.focus();
            } catch (error) {

                toast.error(`Failed to send message. ${error}`);
            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <div className="lg:flex justify-between lg:ml-[235px] lg:mr-[235px]">
            <div className="">
                <Sidebar />
            </div>
            <div className="flex flex-col lg:h-[700px] w-[400px] bg-gray-100 shadow-lg ">
                {/* Chat Header */}
                <div className="bg-blue-600 text-white p-4 flex shadow-lg items-center justify-between">
                    <h2 className="text-lg font-serif">Chat Room</h2>
                    <button className="text-sm bg-blue-800 px-2 py-1 rounded hover:bg-blue-700">
                        Welcome
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                    {messages.length === 0 && !isLoading ? (
                        <div className="font-serif">No messages yet.</div>
                    ) :  (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"} my-2`}
                            >
                                <div
                                    className={`${index % 2 === 0
                                        ? "bg-gray-100"
                                        : "bg-blue-100"
                                        } px-5 py-3 rounded-lg max-w-md shadow`}
                                >
                                    <p className={`text-sm font-bold mb-1 ${index % 2 === 0 ? "text-pink-600" : "text-blue-600"}`}>
                                        {message?.userName}
                                    </p>
                                    <p className={`text-sm ${index % 2 === 0 ? "text-gray-700" : "text-gray-800"}`}>
                                        {message?.content}
                                    </p>
                                    <p className={`text-xs mt-2 ${index % 2 === 0 ? "text-gray-500" : "text-gray-600"}`}>
                                        {message?.createdAt ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-gray-200 flex items-center space-x-3">
                    <input
                        ref={messageInputRef}
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={loading || !newMessage.trim()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? "Sending..." : "Send"}
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
