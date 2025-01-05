"use client";

import SnipperButton from "@/components/SnipperButton";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  user: {
    id: number;
    isAdmin: boolean;
  };
}
const AdminEdit = ({ user }: Props) => {
  const router = useRouter();
  const [state, setState] = useState(user.isAdmin);
  const [loading, setLoading] = useState(false);
  const [openSelected, setOpenSelected] = useState(false);
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === user.isAdmin) {
      return toast.warning("change any data");
    }
    try {
      const data = await axios.put(`${DOMAIN}/api/users/profile/${user.id}`, {
        isAdmin: state,
      });
      router.refresh();
      setLoading(false);
      if (data.status === 200) return toast.success("user edit Succes");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <span className="mb-4 text-xl block">{"اختر التعديل"}</span>
      <div className="relative">
        <div
          className="cursor-pointer border rounded-xl border-gray-400 p-4"
          onClick={() => {
            setOpenSelected(!openSelected);
          }}
        >
          {state ? "مسؤول" : "غير مسؤول"}
        </div>
        {openSelected && (
          <div
            className="absolute w-full border rounded-xl border-gray-100 p-3 mt-2 bg-gray-300 shadow-md start-0"
            style={{ top: "101%" }}
          >
            {state ? (
              <button
                className="p-3 rounded-xl text-sm bg-gray-200 hover:bg-white transition cursor-pointer"
                onClick={() => {
                  setState(false);
                  setOpenSelected(false);
                }}
              >
                {"غير مسؤول"}
              </button>
            ) : (
              <button
                className="p-3 rounded-xl text-sm bg-gray-200 hover:bg-white transition cursor-pointer"
                onClick={() => {
                  setState(true);
                  setOpenSelected(false);
                }}
              >
                {"مسؤول"}
              </button>
            )}
          </div>
        )}
      </div>
      <button
        type="submit"
        style={{ backgroundColor: "#3bade2" }}
        className="flex-c w-full text-white font-medium rounded-xl py-5 mt-6"
        disabled={loading}
      >
        {loading ? <SnipperButton /> : "تعديل"}
      </button>
    </form>
  );
};

export default AdminEdit;
