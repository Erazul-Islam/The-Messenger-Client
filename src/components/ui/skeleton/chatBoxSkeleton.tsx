/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
"use client";

import React from "react";

const ChatSkeleton = () => {
  return (
    <div className="flex flex-col lg:h-[700px] w-[400px] lg:mr-[300px] bg-gray-100 shadow-lg animate-pulse">
      {/* Skeleton Header */}
      <div className="bg-gray-300 p-4 flex items-center justify-between">
        <div className="h-6 bg-gray-400 rounded w-24"></div>
        <div className="h-8 bg-gray-400 rounded w-16"></div>
      </div>

      {/* Skeleton Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {/* Incoming Message Skeleton */}
        <div className="flex items-start space-x-3">
          <div className="h-6 bg-gray-300 rounded-lg w-3/4"></div>
        </div>

        {/* Outgoing Message Skeleton */}
        <div className="flex items-end justify-end space-x-3">
          <div className="h-6 bg-gray-400 rounded-lg w-3/4"></div>
        </div>

        {/* Additional Skeleton Messages */}
        {[...Array(3)].map((_, index) => (
          <div
            className={`${
              index % 2 === 0 ? "flex items-start space-x-3" : "flex items-end justify-end space-x-3"
            }`}
            key={index}
          >
            <div className="h-6 bg-gray-300 rounded-lg w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Skeleton Input */}
      <div className="p-4 bg-gray-200 flex items-center space-x-3">
        <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
        <div className="h-10 bg-gray-400 rounded-lg w-16"></div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
