"use client";

import { ReactNode } from "react";
import logo from "@/public/images/logo.png";

interface BoxContainer {
  hasLogo?: boolean;
  title?: string;
  children: ReactNode;
}

export default function BoxContainer({
  hasLogo = false,
  title,
  children,
}: BoxContainer) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center p-10 bg-orange-400 rounded-xl">
        {hasLogo && <img src={logo.src} />}
        <h1 className="m-1">{title}</h1>
        {children}
      </div>
    </div>
  );
}
