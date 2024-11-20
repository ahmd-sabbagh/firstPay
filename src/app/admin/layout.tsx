import SideBar from "@/components/adminSidebar/SideBar";
import { Metadata } from "next";
import React from "react";
interface ChildrenType {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Articles programing",
};

const layout = ({ children }: ChildrenType) => {
  return (
    <section>
      <div className="flex">
        <SideBar />
        <div className="fix-height flex-grow">{children}</div>
      </div>
    </section>
  );
};

export default layout;
