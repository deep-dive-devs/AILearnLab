"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../../components/dashboard/header";
import SideBar from "../../components/dashboard/sideBar";
import { auth } from "../firebase";
import { AuthProvider } from "@/components/context/AuthContext";

export default function DashboardLayout({ children }) {
  //loader by default is true and will return false if there is a user
  const [loader, setloader] = useState(true);
  const route = useRouter();
  useEffect(() => {
    //This onAuthStateChange is checking the user state every time and giving us the state of the user (logged in or not)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        // ...
        console.log("uid", uid);
        setloader(false);
      } else {
        // User is signed out
        // ...
        //if the user isn't located or there, it will take you to the login page
        route.push("/auth/login");
        console.log("user is logged out");
      }
    });
  }, []);
  if (loader) {
    return <p>Loading...</p>;
  }
  return (
    <section className="w-full h-full bg-backgroundPrimary">
      <AuthProvider>
        <div className="flex w-full h-full">
          <SideBar />
          <div className="w-full h-full">
            <Header />
            {children}
          </div>
        </div>
      </AuthProvider>
    </section>
  );
}
