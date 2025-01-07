"use client";
import SnipperButton from "@/components/SnipperButton";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddNewArticle = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [discription, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const onsubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("title is empty");
    if (discription === "") return toast.error("description is empty");
    try {
      setLoading(true);
      const data = await axios.post(`${DOMAIN}/api/articles`, {
        title,
        discription,
      });
      router.refresh();
      setLoading(false);
      if(data.status === 201){
        toast.success("article add succes")
        setTitle("")
        setDescription("")
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };
  return (
    <div
      className=" w-2/3 m-auto mt-16 p-10 rounded-3xl"
      style={{ backgroundColor: "#3bade23d" }}
    >
      <h1 className="mb-8 text-3xl font-semibold text-white">
        {"اضافة مقالة جديدة"}
      </h1>
      <form onSubmit={onsubmit} className="flex flex-col gap-5">
        <input
          type="text"
          className="p-4 rounded-2xl"
          placeholder="عنوان المقالة"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border rounded-2xl bg-gray-100 p-4 text-sm font-light"
          placeholder="الرساله"
          rows={4}
          value={discription}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" className="bg-main text-white rounded-xl p-5">
          {loading ? <SnipperButton /> : "ارسال"}
        </button>
      </form>
    </div>
  );
};

export default AddNewArticle;
