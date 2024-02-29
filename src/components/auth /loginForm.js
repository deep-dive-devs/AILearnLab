"use client";
import { auth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CustomInput from "../shared/customInput";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    emailAddress: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    //Use e to retrive name and value of input field and then proceed to update login data
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(loginData);
  //after successfully logging in, it will direct user to application
  const router = useRouter();

  const handleSubmit = (e) => {
    //Preventing page from being refreshed and setting error to null
    e.preventDefault();
    console.log(e.target);
    setError(null);

    // Assuming loginData includes emailAddress and password
    const { emailAddress, password } = loginData;

    signInWithEmailAndPassword(auth, emailAddress, password)
      //Using firebase to login user auth, email, and password.
      .then((authUser) => {
        console.log(authUser);

        console.log("Success. The user is Logged In");
        // router.push("/auth/login");
      })
      .catch((error) => {
        console.log(error.message);
        // An error occurred. Set an error message to be displayed to the user
        setError(error.message);
      });
  };

  return (
    <div className="bg-backgroundSecondary flex flex-col p-4 rounded-2xl shadow-2xl">
      <div>
        <div className="text-3xl font-medium">Welcome Back!</div>
        <div className="text-base font-medium">
          Enter your Credentials to access your account
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <CustomInput
          type="email"
          placeholder="Enter your Email"
          name="emailAddress"
          label="Email Address"
          handleChange={handleChange}
        />
        <CustomInput
          type="password"
          placeholder="Enter your Password"
          name="password"
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
          Sign In
        </button>
        <div>
          Do not have an account? <Link href={"/auth/register"}>Sign up</Link>{" "}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
