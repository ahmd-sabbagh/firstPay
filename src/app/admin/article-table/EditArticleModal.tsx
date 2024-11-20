"use client";
import Input from "@/components/input/Input";
import SnipperButton from "@/components/SnipperButton";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { toast } from "react-toastify";
interface OpenModalState {
  title: string;
  discription: string;
  articleId: number;
}

const EditArticleModal = ({
  title,
  discription,
  articleId,
}: OpenModalState) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(title);
  const [body, setBody] = useState(discription);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (text === "" || text === title || body === "" || body === discription)
      return toast.info("please write somthing");
    try {
      setLoading(true);
      const data = await axios.put(`${DOMAIN}/api/articles/${articleId}`, {
        title: text,
        discription: body,
      });
      router.refresh();
      setOpen(false);
      setLoading(false);
      if (data.status === 200) return toast.success("Edit Article Succes");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="bg-green-500 text-white p-2 rounded-lg"
        onClick={() => setOpen(true)}
      >
        تعديل
      </button>
      {open && (
        <div className=" fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-40 flex-c">
          <div className=" w-2/3 bg-white p-7 rounded-2xl">
            <button type="button" onClick={() => setOpen(false)}>
              <MdOutlineClose className="text-red-600 text-3xl" />
            </button>
            <h1 className="mb-6 text-center text-2xl">{"تعديل المقالة"}</h1>
            <form onSubmit={submit}>
              <Input
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
              <Input
                value={body}
                onChange={(event) => setBody(event.target.value)}
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
      )}
    </>
  );
};

export default EditArticleModal;
