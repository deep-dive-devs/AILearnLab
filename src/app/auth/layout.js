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
    <section className="w-full px-5 h-full flex flex-col md:flex-row items-center gap-10 justify-center min-h-screen bg-backgroundPrimary">
      <Image
        className=""
        src={"/AI-101.png"}
        alt="aibot"
        width={400}
        height={400}
        />
        {children}
    </section>
  );
}
