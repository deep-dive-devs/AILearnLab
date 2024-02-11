"use client"
import React from "react";
import SideBar from "../../components/dashboard/sideBar";
import { useAuth } from "@/components/context/AuthContext";

const Page = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not authenticated. Redirect to login page.</p>;
  }

  return <div>{user.email}</div>;
};

export default Page;
