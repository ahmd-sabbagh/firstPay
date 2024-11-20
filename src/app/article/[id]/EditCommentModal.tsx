"use client";
import Input from "@/components/input/Input";
import SnipperButton from "@/components/SnipperButton";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { toast } from "react-toastify";

interface OpenModalState {
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  commentId: number;
}

const EditCommentModal = ({ setOpen, text, commentId }: OpenModalState) => {
  const [textEdit, setTextEdit] = useState(text);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (textEdit === "" || textEdit === text)
      return toast.info("please write somthing");
    try {
      setLoading(true);
      await axios.put(`${DOMAIN}/api/comments/${commentId}`, { text: textEdit });
      router.refresh();
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };
  return (
    <div className=" fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-40 flex-c">
      <div className=" w-2/3 bg-white p-7 rounded-2xl">
        <button type="button" onClick={() => setOpen(false)}>
          <MdOutlineClose className="text-red-600 text-3xl" />
        </button>
        <form onSubmit={submit}>
          <Input
            value={textEdit}
            onChange={(event) => setTextEdit(event.target.value)}
          />
          <button
            type="submit"
            style={{ backgroundColor: "#3bade2" }}
            className="flex-c w-full text-white font-medium rounded-full py-5 mt-10"
          >
            {loading ? <SnipperButton /> : "تعديل"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCommentModal;
