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
  MdOutlineSettings,
  MdLogout,
} from "react-icons/md";

import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

type Group = {
  id: string;
  name: string;
  type: string;
};

const Sidebar = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const token = Cookies.get("accessToken");

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
        toast.error("Failed to fetch groups. Please try again.");
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, [token]);

  const menuItems = [
    {
      title: "Main",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <MdDashboard />,
        },
      ],
    },
    {
      title: "Groups",
      list: groups.map((group: Group) => ({
        title: group.name,
        path: `/groups/${group.id}`,
        icon: <MdGroup />,
      })),
    },
    {
      title: "Settings",
      list: [
        {
          title: "Account Settings",
          path: "/settings",
          icon: <MdOutlineSettings />,
        },
      ],
    },
  ];

  const handleLogout = () => {
    Cookies.remove("accessToken");
    toast.success("Logged out successfully!");
  };

  if (isLoading) {
    return <div>Loading groups...</div>;
  }

  if (isError) {
    return <div>Failed to load groups. Try again later.</div>;
  }

  return (
    <div>
      <div>
        <div>
          <span>Administrator</span>
        </div>
      </div>
      <ul>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span>{cat.title}</span>
            {cat.list?.map((item) => (
              <a href={item.path} key={item.title}>
                {item.icon}
                <span>{item.title}</span>
              </a>
            ))}
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
