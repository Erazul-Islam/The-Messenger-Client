/* eslint-disable prettier/prettier */
"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import io from "socket.io-client";

import ChatSkeleton from "@/src/components/ui/skeleton/chatBoxSkeleton";
import { useUserInfo } from "@/src/utils/userinfo";
import Rightbar, { TGroup } from "@/src/components/ui/dashboard/rightbar/rightbar";
import Sidebar from "@/src/components/ui/dashboard/sidebar/Sidebar";

const socket = io("http://localhost:5000");

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
                    `http://localhost:5000/api/group/see-group/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setGroups(res.data.data);

                setIsLoading(false);
            } catch (err) {


                toast.error("Failed to fetch groups. Please try again.");
                setIsLoading(false);
            }
        };

        fetchGroups();
    }, [token, id]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/message/view/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(res)
                setMessages(res.data.data);
            } catch (error) {
                toast.error("Failed to fetch messages. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        if (id && token) fetchMessages();
    }, [id, token]);


    useEffect(() => {
        socket.on("receiveMessage", ({ content, userId, createdAt }) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { content, userId, createdAt },
            ]);
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
                groupId: id,
                userId: userId,

            };

            console.log(messageData)

            setLoading(true);

            try {
                // Send message to backend
                const res = await axios.post(
                    `http://localhost:5000/api/message/send/${id}/${userId}`,
                    messageData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log(res)
                socket.emit("sendMessage", messageData);


                setMessages((prevMessages) => [
                    ...prevMessages,
                    { ...messageData, createdAt: new Date().toISOString() },
                ]);


                setNewMessage("");
                messageInputRef.current?.focus();
            } catch (error) {
                console.log(error)
                toast.error("Failed to send message. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    console.log("message", messages)

    return (
        <div className="lg:flex">
            <div className="">
                <Sidebar />
            </div>
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
                    {messages.length === 0 && !isLoading ? (
                        <div>No messages yet.</div>
                    ) : isLoading ? (
                        <ChatSkeleton />
                    ) : (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${index % 2 === 0 ? "items-start" : "justify-end items-end"} space-x-3`}
                            >
                                <div
                                    className={`${index % 2 === 0
                                        ? "bg-gray-300 text-black"
                                        : "bg-blue-500 text-white"
                                        } px-4 py-2 rounded-lg max-w-xs`}
                                >
                                    <p className="text-sm">{message.content}</p>
                                    <p className="text-sm">{message.user.name}</p>
                                    <p className="text-xs text-white-500 mt-1">
                                        {new Date(message.createdAt).toLocaleTimeString()}
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
