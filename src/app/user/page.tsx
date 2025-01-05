import { GetProfileData } from "@/apiCalls/getProfileData";
import Input from "@/components/input/Input";
import { verifyTokenForSite } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import ProfileForm from "./ProfileForm";
import fs from "fs";


const UserPage = async () => {
  const token = cookies().get("jwtCookie")?.value || "";
  if (!token) redirect("/");
  const userData = verifyTokenForSite(token);
  const data = await GetProfileData(userData?.id, token);

  

  return (
    <section>
      <div className="container">
        <div>
          <h1 className="md:mb-8 mt-12 text-center font-medium md:font-semibold text-xl lg:text-3xl">
            {"تعديل الحساب الخاص بك"}
          </h1>
          <ProfileForm userData={data} />
        </div>
      </div>
    </section>
  );
};

export default UserPage;
