"use client";
import Input from "@/components/input/Input";
import SnipperButton from "@/components/SnipperButton";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
interface UserDataProps {
  userData: {
    id: number;
    username: string;
    email: string;
  };
}

const ProfileForm = ({ userData }: UserDataProps) => {
  const router = useRouter();

  const [username, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((username || email || password) == undefined) {
      return toast.error("please change any data", { position: "top-center" });
    }
    try {
      setLoading(true);
      const data = await axios.put(
        `${DOMAIN}/api/users/profile/${userData.id}`,
        {
          username,
          email,
          password,
        }
      );
      router.refresh();
      toast.success(data.data.message);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit} className="inputs">
      <div className="flex flex-col gap-5 w-full md:gap-9 md:w-3/4 m-auto py-10">
        <Input
          lable="الاسم"
          placeHolder="الاسم كاملا"
          type="text"
          value={username || userData.username}
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          type="email"
          lable="البريد الالكتروني"
          placeHolder="اكتب بريدك الالكتروني هنا"
          value={email || userData.email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          lable="الرقم السري الجديد"
          placeHolder="اكتب هنا"
          value={password || ""}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          style={{ backgroundColor: "#3bade2" }}
          className="flex-c w-full text-white font-medium rounded-full py-5 mt-6"
        >
          {loading ? <SnipperButton /> : "تعديل الحساب"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
