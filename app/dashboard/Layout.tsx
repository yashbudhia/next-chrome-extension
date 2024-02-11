"use client";

import Sidebar from "@/components/dashboard/sidebar";
import { ReactNode } from "react";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  );
};

export default Layout;
