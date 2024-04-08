"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "../../../components/shared/customInput";
import { toast } from "sonner";
import { auth, db, storage } from "@/app/firebase";
import {
  AuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useAuth } from "@/components/context/AuthContext";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

const Profile = () => {
  const header =  window.location.pathname.split("/").slice(1)[0][0].toUpperCase()+window.location.pathname.slice(2)
  const [userDataForm, setUserDataForm] = useState({
    displayName: "",
    location: "",
    photoURL: "",
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errorPassword, setErrorPassword] = useState(null);
  const [changeFormUserData, setChangeFormUserData] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [error, setError] = useState(null);
  const { user, loading, users, updateData } = useAuth();
  console.log(user);

  useEffect(() => {
    const getUser = () => {
      if (!user || !users) return null;
      const authenticatedUser = users.find((u) => u.uid === user.uid);

      return authenticatedUser;
    };
    const popUser = getUser();
    console.log(popUser);
    setUserDataForm({
      displayName: popUser?.displayName,
      location: popUser?.location || "",
      photoURL: popUser?.photoURL || "",
    });
  }, [user, users]);

  const handleChange = (e) => {
    //Use e to retrive name and value of input field and then proceed to update register data
    const { name, value } = e.target;
    setUserDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setChangeFormUserData(true);
  };

  const handleSecondFormChange = (e) => {
    //Use e to retrive name and value of input field and then proceed to update register data
    const { name, value } = e.target;
    setPasswordForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setChangePassword(true);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setErrorPassword(null);
    setChangePassword(false);

    try {
      const { oldPassword, newPassword, confirmPassword } = passwordForm;
      if (newPassword !== confirmPassword) {
        setErrorPassword("Passwords do not match");
        return;
      }
      if (oldPassword === confirmPassword) {
        setErrorPassword("You cannot use the Old passwrod Again");
        return;
      }
      // Re-authenticate user for security (you may need to implement this part)
      const recentUser = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(recentUser, credential);
      // Change password
      await updatePassword(recentUser, newPassword);
      toast.success("Password Changed Successfully");
    } catch (error) {
      console.log(error);
      setErrorPassword(error.message);
    }
  };
  const handleUserData = async (e) => {
    e.preventDefault();
    setError(null);
    setChangeFormUserData(false);
    try {
      const { displayName, location, photoURL } = userDataForm;
      if (!displayName) {
        setError("Name is required");
        return;
      }
      let imageUrl = photoURL;
      if (imageUpload !== null) {
        const imageRef = storageRef(storage, `${uuidv4()}`);

        const snapshot = await uploadBytes(imageRef, imageUpload);
        imageUrl = await getDownloadURL(snapshot.ref);
      }
      const userQ = query(
        collection(db, "authUsers"),
        where("uid", "==", user.uid)
      );

      // Execute the user query
      const userQuerySnapshot = await getDocs(userQ);

      // Update the user document
      if (!userQuerySnapshot.empty) {
        const userDocRef = userQuerySnapshot.docs[0].ref;
        await updateProfile(user, {
          displayName: displayName,
          photoURL: imageUrl,
        });
        await updateDoc(userDocRef, {
          displayName: displayName,
          location: location,
          photoURL: imageUrl,
        });
      } else {
        toast.error("User document not found");
      }
      toast.success("User Info Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error updating user info: " + error.message);

      setError(error.message);
    }
  };
  console.log(userDataForm);
  return (
    <>
    <div className="flex justify-between bg-white p-8 rounded-xl mb-2 mx-3">
        <h1 className="font-extrabold text-primary text-6xl">{header}</h1>
      </div>
    <div className="bg-backgroundTertiary flex flex-col min-h-[80vh] h-full mx-3 p-5 rounded-lg">
      <div className="m-3">Search</div>
      <div className="flex justify-center items-center gap-5">
        <div className="w-[60%] bg-white p-10 rounded-2xl ">
          <h2 className="text-2xl font-bold">User Profile</h2>
          <form onSubmit={handleUserData}>
            {imageUpload ? (
              <Image
                src={URL.createObjectURL(imageUpload)}
                width={400}
                height={400}
                className="h-40 object-cover rounded-full w-40"
                alt="Preview"
              />
            ) : userDataForm.photoURL && userDataForm.photoURL !== "" ? (
              <Image
                src={userDataForm.photoURL}
                width={400}
                height={400}
                className="h-40 object-cover rounded-full w-40"
                alt="Preview"
              />
            ) : (
              <Image
                src="/profileIcon.jpg"
                width={400}
                height={400}
                className="h-40 object-cover rounded-full w-40"
                alt="Preview"
              />
            )}

            <label htmlFor="fileInput">
              <div className="bg-buttonColor text-sm cursor-pointer mt-2 rounded-lg hover:scale-105 hover:shadow-lg px-4 w-fit py-2 text-white">
                Choose Image
              </div>
              <input
                id="fileInput"
                style={{ display: "none" }}
                accept="image/png,image/jpeg"
                type="file"
                onChange={(e) => {
                  setImageUpload(e.target.files[0]);
                  setChangeFormUserData(true);
                }}
              />
            </label>
            <CustomInput
              name={"displayName"}
              label={"Name:"}
              handleChange={handleChange}
              type="text"
              placeholder="Enter your Name"
              value={userDataForm.displayName}
            />
            <CustomInput
              name={"location"}
              label={"Location:"}
              handleChange={handleChange}
              type="text"
              placeholder="Enter your Location"
              value={userDataForm.location}
            />
            {error && <p className="text-red-600">{error}</p>}
            <button
              className="bg-buttonColor mt-2 rounded-lg hover:scale-105 hover:shadow-lg w-full py-2 text-white"
              type="submit"
              disabled={!changeFormUserData}
            >
              Save
            </button>
          </form>
        </div>
        <div className="w-[37%] bg-white p-10 rounded-2xl">
          <h2 className="text-xl font-bold">Account Information</h2>
          <form onSubmit={handleChangePassword}>
            <CustomInput
              name={"oldPassword"}
              label={"Old Password:"}
              handleChange={handleSecondFormChange}
              type="password"
              placeholder="Enter your Old Passwrod"
              value={passwordForm.oldPassword}
            />
            <CustomInput
              name={"newPassword"}
              label={"New Password:"}
              handleChange={handleSecondFormChange}
              type="password"
              placeholder="Enter your New Passwrod"
              value={passwordForm.newPassword}
            />
            <CustomInput
              name={"confirmPassword"}
              label={"Confirm Password:"}
              handleChange={handleSecondFormChange}
              type="password"
              placeholder="Enter your Password Again"
              value={passwordForm.confirmPassword}
            />
            {errorPassword && <p className="text-red-600">{errorPassword}</p>}
            <button
              className="bg-buttonColor mt-2 rounded-lg hover:scale-105 hover:shadow-lg w-full py-2 text-white"
              type="submit"
              disabled={!changePassword}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};
export default Profile;
