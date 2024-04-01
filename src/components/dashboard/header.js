'use client'
import React from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="px-4 py-5">
      <h3>Hello {user?.displayName}</h3>
    </div>
  );
};

export default Header;
