"use client";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/me", {
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.success == true) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  if(isloggedIn){
    redirect("/")
  }

  return <div className="text-5xl">test page</div>;
};

export default page;
