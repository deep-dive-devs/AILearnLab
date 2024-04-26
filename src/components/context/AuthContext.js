// AuthContext.js
"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { auth, db } from "@/app/firebase";
// assuming you have Firebase initialized

// Create a context for user authentication
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      const usersCollection = collection(db, "authUsers");
      const usersSnapshot = await getDocs(usersCollection);

      const usersList = await Promise.all(
        usersSnapshot.docs.map(async (doc) => {
          const usersData = doc.data();
          const friendPromises = usersData?.friends?.map(async (friendRef) => {
            const friendDoc = await getDoc(friendRef);
            if (friendDoc.exists()) {
              return friendDoc.data();
            } else {
              console.error("Friend document not found:", friendRef.id);
              return null;
            }
          });

          const friends = friendPromises
            ? await Promise.all(friendPromises)
            : [
              
            ];
          usersData.friends = friends;
          return usersData;
        })
      );

      setUsers(usersList);
    };

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      setLoading(false);
      if (authUser) {
        await getUsers();
      }
    });

    return () => unsubscribe();
  }, [isUpdated]);
  const updateData = () => {
    setIsUpdated(!isUpdated);
  };
  return (
    <AuthContext.Provider value={{ user, loading, users, updateData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
