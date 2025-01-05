"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { jwtPayload } from "@/utils/types";
import { BiArrowFromTop, BiUser } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import Link from "next/link";

interface UserInfo {
  userInfo: jwtPayload;
}

const Logout = ({ userInfo }: UserInfo) => {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [toggel, setToggle] = useState(false);
  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.replace("/");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };
  useEffect(() => {
    const menuUserHandler = (e: any) => {
      if (
        !buttonRef?.current?.contains(e.target) &&
        !menuRef?.current?.contains(e.target)
      ) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", menuUserHandler);
    return () => {
      document.removeEventListener("mousedown", menuUserHandler);
    };
  }, []);
  return (
    <div className="relative" style={{ width: "180px" }}>
      <div
        className="py-2 px-4 border border-indigo-400 rounded-md flex items-center gap-3 justify-between cursor-pointer hover:bg-indigo-400 hover:text-white"
        ref={buttonRef}
        onClick={() => {
          setToggle(!toggel);
        }}
      >
        <div className="line-clamp-1">{userInfo.username}</div>
        <BiArrowFromTop className="text-blue-600 text-2xl" />
      </div>
      {toggel && (
        <div
          className="absolute z-50 p-2 rounded bg-white shadow-md left-0 w-full mt-2 translate-x-1 transition-all"
          style={{ top: "100%" }}
          ref={menuRef}
        >
          <Link
            href={"/user"}
            className="p-2 w-full flex items-center justify-between hover:bg-slate-200"
          >
            <span className="text-sm">{"الصفحة الشخصي"}</span>
            <BiUser className="text-green-600" />
          </Link>
          <button
            className="p-2 w-full flex items-center justify-between hover:bg-slate-200"
            onClick={() => {
              logoutHandler();
            }}
          >
            <span className="text-sm">{"تسجيل الخروج"}</span>
            <LuLogOut className="text-red-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Logout;
