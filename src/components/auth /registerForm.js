"use client";
import { auth } from "@/app/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase";
import React, { useState } from "react";
import CustomInput from "../shared/customInput";
import { addDoc, collection,setDoc,doc } from "firebase/firestore";
import Image from "next/image";
const RegisterForm = () => {
  //uses state to handle form changes
  const [registerData, setRegisterData] = useState({
    displayName: "",
    emailAddress: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    //Use e to retrive name and value of input field and then proceed to update register data
    const { name, value } = e.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  //after successfully signing up, it will direct user to login page using router
  const router = useRouter();

  const handleSubmit = (e) => {
    //Preventing page from being refreshed and setting error to null
    e.preventDefault();
    console.log(e.target);
    setError(null);

    // Assuming registerData includes emailAddress, password, and displayName
    const { emailAddress, password, displayName } = registerData;

    createUserWithEmailAndPassword(auth, emailAddress, password)
      //Using firebase to create user auth, email, and password.
      .then((authUser) => {
        //once new user is created, then this method will add a display name
        console.log(authUser);

        // Update the user's display name
        if (authUser.user) {
          updateProfile(authUser.user, {
            displayName: displayName,
          })
            .then(() => {
              console.log("User display name updated successfully.");
              setDoc(doc(db, "authUsers",authUser.user.uid), {
                email: emailAddress,
                displayName: displayName,
                uid: authUser.user.uid,
                showPopup:true,
                friends: [],
                goals:{},
              })
                .then((docRef) => {
                  console.log("Document written with ID: ", docRef.id);
                })
                .catch((e) => {});
            })
            .catch((error) => {
              console.error("Error updating user display name:", error);
            });
        }

        console.log("Success. The user is created in Firebase");
        // router.push("/auth/login");
      })
      .catch((error) => {
        console.log(error.message);
        // An error occurred. Set an error message to be displayed to the user
        setError(error.message);
      });
  };

  return (
    <div className=" w-full bg-backgroundSecondary max-w-[500px] flex flex-col p-4 rounded-2xl h-full shadow-2xl">
      <div className="w-full  flex items-center justify-center flex-col gap-2">
        <Image
          className=""
          src={"/AI-101.png"}
          alt="aibot"
          width={150}
          height={150}
        />
        <div className="text-2xl font-medium">Welcome !</div>
        <div className="text-sm text-center font-light">
          Enter your Credentials to access your account
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <CustomInput
          type="text"
          placeholder="Enter your Name"
          value={registerData.displayName}
          name="displayName"
          label="Name"
          handleChange={handleChange}
        />
        <CustomInput
          type="email"
          placeholder="Enter your Email"
          name="emailAddress"
          value={registerData.emailAddress}
          label="Email Address"
          handleChange={handleChange}
        />
        <CustomInput
          type="password"
          placeholder="Enter your Password"
          name="password"
          value={registerData.password}
          label="Password"
          handleChange={handleChange}
        />
        <div className="flex items-center gap-4 justify-center">
          <input type="checkbox" name="remember" id="remember" />{" "}
          <label htmlFor="remember">Remember for 30 days</label>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <button
          className="bg-buttonColor mt-2 rounded-lg hover:scale-105 hover:shadow-lg w-full py-2 text-white"
          type="submit"
        >
          Signup
        </button>
        <div>
          Already have an account? <Link href={"/auth/login"}>Login</Link>{" "}
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
