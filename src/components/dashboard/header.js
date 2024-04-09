'use client'
import React from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const header =  window.location.pathname === "/"? "Welcome" : window.location.pathname.split("/").slice(1)[0][0].toUpperCase()+window.location.pathname.slice(2)
  const { user } = useAuth();

  return (
    <div className="flex flex-col px-4 py-5">
      <h3 className="mb-8"> Hello {user?.displayName}</h3>
      <div className="flex justify-between bg-white p-8 rounded-xl mb-2">
        <h1 className="font-extrabold text-primary text-6xl">{header}</h1>
      </div>
    </div>
  );
};

export default Header;
