"use client";
import { Button } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
import Products from "./components/Products";

const Home = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    Cookies.remove("token");
    router.push("/signin");
  };
  return (
    <div>
      <div className="justify-between p-6 bg-[#C9CEEC] flex  items-center">
        <h3>welcome to the site</h3>{" "}
        <Button colorScheme="red" type="button" onClick={logoutHandler}>
          Logout
        </Button>
      </div>

      <Products />
    </div>
  );
};

export default Home;
