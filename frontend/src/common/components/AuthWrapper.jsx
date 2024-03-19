"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";

const AuthWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const token = Cookies.get("token");
      const userRes = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (userRes?.data?.success) {
        setUser(userRes?.data?.user);
        return setLoading(false);
      } else {
        return setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return toast.error("something went wrong");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }

  router.push("/signin");
  Cookies.remove("token");

  return <>This Page is authenticated now you will redirected</>;
};

export default AuthWrapper;
