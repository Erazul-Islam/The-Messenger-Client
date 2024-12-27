/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
"use client";

import React from "react";

const SidebarSkeleton = () => {
  return (
    <aside className="bg-white shadow-lg h-[500px] w-[350px] lg:h-[700px] lg:-[300px] overflow-visible lg:w-[300px] p-6 animate-pulse">
      <header className="mb-6">
        <div className="h-6 w-32 bg-gray-300 rounded"></div>
      </header>
      <nav>
        <ul className="space-y-4">
          {Array.from({ length: 2 }).map((_, idx) => (
            <li key={idx}>
              <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
              <ul className="space-y-2">
                {Array.from({ length: 2 }).map((_, subIdx) => (
                  <li key={subIdx}>
                    <div className="flex items-center space-x-3 p-2">
                      <div className="h-6 w-6 bg-gray-300 rounded"></div>
                      <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      <footer className="mt-8">
        <div className="flex items-center space-x-2 px-4 py-2">
          <div className="h-6 w-6 bg-gray-300 rounded"></div>
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
        </div>
      </footer>
    </aside>
  );
};

export default SidebarSkeleton;
