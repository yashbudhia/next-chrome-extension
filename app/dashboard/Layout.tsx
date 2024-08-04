import Sidebar from "@/components/dashboard/SidebarCode";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto ">
        <main>{children}</main>
      </div>
      <Toaster />
    </div>
  );
};
export default Layout;
