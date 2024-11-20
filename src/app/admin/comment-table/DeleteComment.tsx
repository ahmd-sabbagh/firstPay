"use client";
import SnipperButton from "@/components/SnipperButton";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
interface CommentIdProps {
  commentId: number;
}

const DeletComment = ({ commentId }: CommentIdProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const deletArticleHandler = async (id: number) => {
    try {
      setLoading(true);
      const data = await axios.delete(`${DOMAIN}/api/comments/${id}`);
      router.refresh();
      if (data.status === 200) return toast.success("delete is succes");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };
  return (
    <>
      <button
        className="bg-red-500 text-white p-2 rounded-lg mr-2"
        onClick={() => deletArticleHandler(commentId)}
      >
        {loading ? <SnipperButton /> : "حـذف"}
      </button>
    </>
  );
};

export default DeletComment;
