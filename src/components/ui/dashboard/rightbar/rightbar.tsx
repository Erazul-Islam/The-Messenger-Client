/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import RightbarSkeleton from '../../skeleton/RightBarSkeleton';
import { Button } from '@nextui-org/button';
import { useUserInfo } from '@/src/utils/userinfo';
import { toast } from 'sonner';
import axios from 'axios';
import Cookies from 'js-cookie';


type User = {
    id: string;
    email: string;
    name: string;
    role: string;
};

type UserGroup = {
    id: string;
    userId: string;
    groupId: string;
    user: User;
};

export type TGroup = {
    id: string;
    name: string;
    type: string;
    createdBy: string;
    userGroups: UserGroup[];
};

type GroupMembersProps = {
    groups: TGroup[];
    isLoading: boolean
    setGroups: React.Dispatch<React.SetStateAction<TGroup[]>>;
};


const Rightbar: React.FC<GroupMembersProps> = ({ groups, isLoading, setGroups }) => {

    const { userInfo } = useUserInfo()
    const [loadingGroup, setLoadingGroup] = useState<string | null>(null);
    const token = Cookies.get("accessToken");

    const handleJoinGroup = async (groupId: string) => {
        if (userInfo === null) {
            toast.error("Please log in first")

            return
        }
        setLoadingGroup(groupId)

        try {
            const response = await axios.post(`https://the-messenger-xs42.onrender.com/api/group/join-group/${userInfo?.id}/${groupId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (response.status === 201) {
                toast.success("Successfully joined the group")
                setGroups((prevGroups) => 
                    prevGroups.map((group) =>
                        group.id === groupId 
                            ? {
                                ...group,
                                userGroups : [
                                    ...group.userGroups,
                                    {
                                        id : '',
                                        userId : userInfo.id,
                                        groupId,
                                        user : {
                                            id : userInfo.id,
                                            name : userInfo.name,
                                            email : userInfo.email,
                                            role : userInfo.role
                                        }
                                    }
                                ]
                            } 
                            : group
                    )
                )

            }
        }
        catch (err) {

            toast.error("Something went wrong")
        }
        finally {
            setLoadingGroup(null);
        }
    }

    const isUserInGroup = (group: TGroup) => {
        return group.userGroups.some((userGroup) => userGroup.user.id === userInfo?.id);
    };

    if (isLoading) {
        return <RightbarSkeleton />
    }

    return (
        <div>
            <div className="p-6 bg-white overflow-y-auto lg:mb-0 mb-10 w-[350px] h-[500px] lg:h-[700px] shadow-lg rounded-lg lg:w-[300px]">
                {groups.map((group) => (
                    <div key={group.id} className="mb-8">
                        {/* Group Header */}
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">{group.name}</h2>
                            <p className="text-sm text-gray-500 capitalize">Type: {group.type}</p>
                        </div>

                        {/* Members List */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Members</h3>
                            {group.userGroups.length > 0 ? (
                                <ul className="space-y-3">
                                    {group.userGroups.map((userGroup) => (
                                        <li
                                            key={userGroup.id}
                                            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{userGroup.user.name}</p>
                                                <p className="text-sm text-gray-500">{userGroup.user.email}</p>
                                            </div>
                                            <span
                                                className={`text-xs font-semibold px-3 py-1 rounded-full ${userGroup.user.role === 'ADMIN'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-green-100 text-green-700'
                                                    }`}
                                            >
                                                {userGroup.user.role}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">No members found.</p>
                            )}
                        </div>
                        {isUserInGroup(group) ? (
                            <Button color="primary" className="mt-4 rounded-md" disabled>
                                Joined
                            </Button>
                        ) : loadingGroup === group.id ? (
                            <Button isLoading color="primary" className="mt-4">

                            </Button>
                        ) : (
                            <Button color="success" className="mt-4 rounded-md" onClick={() => handleJoinGroup(group.id)}>
                                Join Group
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rightbar;