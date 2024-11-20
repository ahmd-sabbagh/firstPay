"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import EditCommentModal from "./EditCommentModal";
import { useState } from "react";
import SnipperButton from "@/components/SnipperButton";


const Comment = ({ comment, userId }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteComment = async () => {
    try {
      setLoading(true);
      await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-5 rounded-3xl">
      <div className="flex justify-between items-center">
        <strong>{comment.user.username}</strong>
        <span className="bg-yellow-700 py-2 px-4 text-white rounded-full">
          {new Date(comment.createdAt).toDateString()}
        </span>
      </div>
      <p className=" text-sm text-gray-600 w-2/3">{comment.text}</p>
      {userId === comment.userId && (
        <div className="flex items-center gap-3 justify-end">
          <button onClick={() => setOpenModal(true)}>
            <FaEdit className=" text-green-600 text-3xl" />
          </button>
          {loading ? (
            <SnipperButton />
          ) : (
            <button onClick={deleteComment}>
              <MdDelete className=" text-red-600 text-3xl" />
            </button>
          )}
        </div>
      )}

      {openModal && (
        <EditCommentModal
          setOpen={setOpenModal}
          text={comment?.text}
          commentId={comment.id}
        />
      )}
    </div>
  );
};

export default Comment;
