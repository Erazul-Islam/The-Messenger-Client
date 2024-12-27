/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client"

import React from 'react';

const RightbarSkeleton: React.FC = () => {
    return (
        <div className="p-6 bg-white lg:h-[700px] shadow-lg rounded-lg w-[300px]">
            {/* Skeleton for Group Header */}
            <div className="border-b pb-4 mb-4">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>

            {/* Skeleton for Members List */}
            <div>
                <div className="h-5 bg-gray-300 rounded w-1/2 mb-4"></div>
                <ul className="space-y-3">
                    {[...Array(2)].map((_, index) => (
                        <li
                            key={index}
                            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
                        >
                            <div>
                                <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                            <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RightbarSkeleton;
