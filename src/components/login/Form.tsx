"use client";
import Link from "next/link";
import Input from "../input/Input";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import SnipperButton from "../SnipperButton";

function Form() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "")
      return toast.error("email empty", {
        position: "top-center",
        className: "foo-bar",
      });
    if (password === "")
      return toast.error("password empty", {
        position: "top-center",
        className: "foo-bar",
      });
    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/users/login`, { email, password });
      router.replace("/");
      router.refresh();
      // setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="inputs">
      <div className="flex flex-col gap-5 md:gap-9">
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
        disabled={loading}
      >
        {loading ? <SnipperButton /> : "تسجيل الدخول"}
      </button>
    </form>
  );
}

export default Form;
