"use client";
import React from "react";
import CustomInput from "../shared/customInput";

const RegisterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <div className="bg-backgroundSecondary flex flex-col p-4 rounded-2xl shadow-2xl">
      <div>
        <div className="text-3xl font-medium">Welcome !</div>
        <div className="text-base font-medium">
          Enter your Credentials to access your account
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <CustomInput
          type="text"
          placeholder="Enter your Name"
          name="name"
          label="Name"
        />
        <CustomInput
          type="email"
          placeholder="Enter your Email"
          name="emailAddress"
          label="Email Address"
        />
        <CustomInput
          type="password"
          placeholder="Enter your Password"
          name="password"
          label="Password"
        />
        <div className="flex items-center gap-4 justify-center">
          <input type="checkbox" name="remember" id="remember" />{" "}
          <label htmlFor="remember">Remember for 30 days</label>
        </div>
        <button className="bg-buttonColor mt-2 rounded-lg hover:scale-105 hover:shadow-lg w-full py-2 text-white" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
