"use client";
import SnipperButton from "@/components/SnipperButton";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
interface CommentIdProps {
  commentId: number;
}

const DeletUser = ({ commentId }: CommentIdProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const deletArticleHandler = async (id: number) => {
    try {
      setLoading(true);
      const data = await axios.delete(`${DOMAIN}/api/users/profile/${id}`);
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
        onClick={() => deletArticleHandler(commentId)}
      >
        {loading ? <SnipperButton /> :<MdDelete className="text-2xl text-red-600" />}
      </button>
    </>
  );
};

export default DeletUser;
