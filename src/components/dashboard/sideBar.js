"use client";
import Image from "next/image";
import React from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";

const SideBar = () => {
  const path = usePathname();
  const route = useRouter();
  const activeLink = (url) => {
    if (path === url) {
      return "bg-primary !text-white";
    } else {
      return "";
    }
  };
  const handleLogOut = () => {
    //when logout button is clicked, it will sign user out and redirect to login page.
    signOut(auth)
      .then(() => {
        console.log("logged out");
        route.push("/auth/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const sideBarLinks = [
    { icon: <FaHome size={22} />, item: "Home", url: "/" },
    {
      icon: <HiOutlineDesktopComputer />,
      item: "Goals",
      url: "/goals",
    },
    {
      icon: <HiOutlineDesktopComputer />,
      item: "Practice",
      url: "/practice",
    },
    { icon: <FaUser />, item: "Profile", url: "/profile" },
  ];
  return (
    <div className=" bg-backgroundSecondary flex flex-col w-1/3 h-full min-h-screen items-start py-10 pl-2 pr-4 relative">
      <Image src={"/AI-101.png"} alt="logo" width={250} height={250} />
      <div className="h-full w-full ">
        <div className="flex flex-col mt-20 gap-12 items-start">
          {sideBarLinks.map((singleLink, index) => (
            <Link
              href={singleLink.url}
              key={index}
              className={`flex flex-row items-center justify-start w-full px-3 rounded-md py-2 text-primary gap-2 ${activeLink(
                singleLink.url
              )}`}
            >
              <div>{singleLink.icon}</div>
              <div className="text-lg font-medium ">{singleLink.item}</div>
            </Link>
          ))}
        </div>

        <div
          className="flex flex-row items-center justify center cursor-pointer gap-2 absolute bottom-10"
          onClick={handleLogOut}
        >
          <div>
            <CiLogout />
          </div>

          <div className="text-lg font-medium  text-[#9197b3] ">LogOut</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
