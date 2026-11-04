import { Navbar } from "@/components/layouts/navbar";
import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar></Navbar>
      {children}
    </div>
  );
}
