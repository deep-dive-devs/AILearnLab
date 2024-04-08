'use client'
import React from "react";
import { useAuth } from "../context/AuthContext";

const Header = ({headerText}) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col px-4 py-5">
      <h3 className="mb-2"> Hello {user?.displayName}</h3>
    </div>
  );
};

export default Header;
