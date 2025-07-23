"use client";

import { userStore } from "@/lib/store";
import axios from "axios";
import React from "react";

const page = () => {
  const user = userStore((state) => state.user);

  console.log(user)
 
  return (
    <div>
     {
        user ? (
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-2xl font-bold mb-4">Profile</h1>
              <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <p className="text-gray-500">Loading...</p>
            </div>
          )
     }
    </div>
  );
};

export default page;
