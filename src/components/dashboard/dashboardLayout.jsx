"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./header";
import SideBar from "./sideBar";

import { AuthProvider } from "@/components/context/AuthContext";
import StartingPopup from "@/components/dashboard/startingPopup";
import { auth } from "@/app/firebase";

export default function DashboardLayout({ children }) {
  //loader by default is true and will return false if there is a user
  const [loader, setLoader] = useState(true);
  const [showPopup, setShowPopup] = useState(true);

  const route = useRouter();
  useEffect(() => {
    //This onAuthStateChange is checking the user state every time and giving us the state of the user (logged in or not)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

        setLoader(false);
      } else {
        // User is signed out
        // ...
        //if the user isn't located or there, it will take you to the login page
        route.push("/auth/login");
      }
    });
  }, []);

  if (loader) {
    return <p>Loading...</p>;
  }
  const closePopup = () => {
    setShowPopup(false);
  };
  const handleSetPopup = (value) => {
    setShowPopup(value);
  };
  return (
    <section className="w-full h-full bg-backgroundPrimary">
      <AuthProvider>
        {showPopup && (
          <StartingPopup
            handleSetPopup={handleSetPopup}
            handleClose={closePopup}
          />
        )}
        <div className="flex w-full h-full">
          <SideBar />
          <div className="w-full h-screen flex flex-col overflow-scroll">
            <Header />
            {children}
          </div>
        </div>
      </AuthProvider>
    </section>
  );
}
