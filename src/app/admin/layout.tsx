import SideBar from "@/components/adminSidebar/SideBar";
import { verifyTokenForSite } from "@/utils/verifyToken";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
interface ChildrenType {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Articles programing",
};

const layout = ({ children }: ChildrenType) => {
  const token = cookies().get("jwtCookie")?.value || "";
  if (!token) redirect("/");
  const userData = verifyTokenForSite(token);
  if (!userData?.isAdmin) redirect("/");
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
