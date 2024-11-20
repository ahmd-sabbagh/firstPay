"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import Button from "../button/Button";

const Logout = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.replace("/");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };
  return <Button text="logout" clickHandel={logoutHandler} type="button" />;
};

export default Logout;
