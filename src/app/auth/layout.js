"use client";
import Image from "next/image";
import AuthNavbar from "@/components/auth /authNavbar";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }) {
  //loader by default is true and will return false if there is no user
  const [loading, setLoading] = useState(true);
  const route = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //if there is a user then it will take the user to the dashboard
        route.push("/");
      } else {
        // User is signed out
        // ...
        setLoading(false);
        console.log("user is logged out");
      }
    });
  }, []);
  if (loading) {
    //once we figure out which loader to use, we can replace it and remove "Loading..."
    return <p>Loading...</p>;
  }
  return (
    <section className="w-full h-full flex flex-col md:flex-row items-center gap-10 justify-center min-h-screen bg-backgroundPrimary">
      <div className="md:w-1/2 w-full h-full px-4 min-h-screen bg-backgroundSecondary flex items-center justify-center">
        {children}
      </div>
      <div className="md:w-1/2 w-full h-full hidden md:flex md:items-center md:justify-center">
        <Image
          className=""
          src={"/book.png"}
          alt="aibot"
          width={400}
          height={400}
        />
      </div>
    </section>
  );
}
