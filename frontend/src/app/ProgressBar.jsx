"use client";

import { AppProgressBar as Progress } from "next-nprogress-bar";

export default function ProgressBar({ children }) {
  return (
    <>
      <Progress
        height="4px"
        color="blue"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
}
