import Image from "next/image";
import React from "react";

const AuthNavbar = () => {
  return (
    <div className="w-full flex items-center justify-center py-10">
      <Image src={"/AI-101.png"} alt="logo" width={500} height={500} />
    </div>
  );
};

export default AuthNavbar;
