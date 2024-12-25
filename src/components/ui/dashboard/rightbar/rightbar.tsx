/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

import React from 'react';
import RightbarSkeleton from '../../skeleton/RightBarSkeleton';

type User = {
    id: string;
    email: string;
    password: string;
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
    isLoading : boolean
 };


const Rightbar: React.FC<GroupMembersProps> = ({ groups,isLoading }) => {

    console.log("Rightbar", groups)

    if(isLoading){
       return <RightbarSkeleton/>
    }

    return (
        <div>
            <div className="p-6 bg-white shadow-lg h-screen rounded-lg w-[300px]">
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rightbar;