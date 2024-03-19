"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }) {
  return (
    <>
      <ChakraProvider>
        {children}
        <ToastContainer />
      </ChakraProvider>
    </>
  );
}
