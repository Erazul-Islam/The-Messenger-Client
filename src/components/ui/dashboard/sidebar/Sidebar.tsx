/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */

"use client";

import React, { useEffect, useState } from "react";
import {
  MdDashboard,
  MdGroup,
  MdLogout,
} from "react-icons/md";

import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import SidebarSkeleton from "../../skeleton/Skeleton";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useUserInfo } from "@/src/utils/userinfo";

type Group = {
  id: string;
  name: string;
  type: string;
};

const Sidebar = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false)
  const [isError, setIsError] = useState(false);
  
  const router = useRouter()
  const {userInfo} = useUserInfo()

  const token = Cookies.get("accessToken");

  const pathname = usePathname()

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get(`https://the-messenger-xs42.onrender.com/api/group/see-group`, {
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

  const filteredGroups = groups.filter((group) => {
    if (userInfo?.role === "ADMIN") {
      return true;  // Admin can see all groups
    } else if (userInfo?.role === "MEMBER" && group.type !== "ADMIN_CHAT") {
      return true;  // Member cannot see ADMIN_CHAT group
    }
    return false;
  });

  const menuItems = [
    {
      title: "Main",
      list: [
        ...(userInfo?.role === "ADMIN"
          ? [
              {
                title: "Admin Panel",
                path: "/adminDashboard",
                icon: <MdDashboard />,
              },
            ]
          : []),
      ],
    },
    {
      title: "Groups",
      list: filteredGroups.map((group: Group) => ({
        title: group.name,
        path: `/groups/${group.id}`,
        icon: <MdGroup />,
      })),
    },
  ];

  const handleLogout = () => {
    Cookies.remove("accessToken");
    toast.success("Logged out successfully!");
    router.push('/login')
  };

  if (isLoading) {
    return <SidebarSkeleton />;
  }

  if (isError) {
    return <div>Failed to load groups. Try again later.</div>;
  }

  return (
    <aside className="bg-white shadow-lg h-[500px] w-[350px] overflow-y-auto text-gray-500 lg:h-[700px] lg:w-[300px]">
      <nav>
        <ul className="space-y-4 p-6">
          {menuItems.map((category) => (
            <li key={category.title}>
              <h2 className="text-sm uppercase font-serif mb-2">{category.title}</h2>
              <ul className="space-y-2">
                {category.list.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className={`flex items-center space-x-3 p-2 rounded md:hover:bg-blue-600 md:hover:text-white ${pathname === item.path && 'bg-blue-600 text-white'} `}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      <footer className="mt-3 ml-8">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 p-4 mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          <MdLogout />
          <span>Logout</span>
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;
