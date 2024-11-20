"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SnipperButton from "@/components/SnipperButton";
interface ArticleId {
  articleId: number;
}

const AddComment = ({ articleId }: ArticleId) => {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const onsubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment == "") {
      return toast.error("Pleas write Comment..");
    } else if (comment.length <= 10) {
      return toast.error(
        "comment text must be have a 10 character or more than"
      );
    }
    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/comments`, { text: comment, articleId });
      router.refresh();
      setComment("");
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };
  return (
    <div
      className=" w-full md:w-3/4 m-auto mt-8 p-5 rounded-3xl"
      style={{ backgroundColor: "#3bade23d" }}
    >
      <form onSubmit={onsubmit} className="flex flex-col gap-3">
        <input
          type="text"
          className="p-4 rounded-2xl"
          placeholder="اضف تعليقا..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          style={{ backgroundColor: "#3bade2" }}
          className="flex-c w-full md:w-1/5 text-white font-medium rounded-full p-5"
        >
          {loading ? <SnipperButton /> : "اضافة"}
        </button>
      </form>
    </div>
  );
};

export default AddComment;
