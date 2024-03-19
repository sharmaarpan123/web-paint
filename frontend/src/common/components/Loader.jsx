"use client";

import React from "react";
import { Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <div className="fixed inset-0 min-h-screen min-w-full z-[100] flex items-center justify-center bg-black bg-opacity-20">
      <Spinner />
    </div>
  );
};

export default Loader;
