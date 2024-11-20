"use client";
import Input from "@/components/input/Input";
import { DOMAIN } from "@/utils/constants";
import Link from "next/link";

import { useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import { useRouter } from "next/navigation";
import SnipperButton from "@/components/SnipperButton";

function Form() {
  const router = useRouter();

  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "")
      return toast.error("name empty", { position: "top-center" });
    if (email === "")
      return toast.error("email empty", {
        position: "top-center",
      });
    if (password === "")
      return toast.error("password empty", {
        position: "top-center",
      });
    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/users/register`, {
        username,
        email,
        password,
      });
      router.replace("/");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="inputs">
      <div className="flex flex-col gap-5 md:gap-9">
        <Input
          lable="الاسم"
          placeHolder="الاسم كاملا"
          type="text"
          value={username}
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          type="email"
          lable="البريد الالكتروني"
          placeHolder="اكتب بريدك الالكتروني هنا"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          lable="كلمة المرور"
          placeHolder="اكتب كلمة المرور هنا"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <Link className="mt-3 text-sm text-main block" href={"/"}>
        {"نسيت كلمة المرور"}
      </Link>
      <button
        type="submit"
        style={{ backgroundColor: "#3bade2" }}
        className="flex-c w-full text-white font-medium rounded-full py-5 mt-10"
      >
        {loading ? <SnipperButton /> : "تسجيل الدخول"}
      </button>
    </form>
  );
}

export default Form;
