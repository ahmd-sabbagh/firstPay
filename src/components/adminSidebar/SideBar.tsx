import Link from "next/link";
import React from "react";
import { MdMenuOpen } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { LiaComment } from "react-icons/lia";

const SideBar = () => {
  return (
    <div
      className="flex flex-col gap-7 bg-main p-4 md:p-8 lg:p-10 pt-16 w-20 md:w-52 lg:w-80 overflow-hidden"
      style={{ boxShadow: "-2px -9px 20px 0px #0000005c" }}
    >
      <Link href={"/admin"} className="flex items-center gap-5">
        <span>
          <MdMenuOpen className="text-5xl text-white" />
        </span>
        <span className="text-white text-2xl">{"لوحة التحكم"}</span>
      </Link>
      <Link href={"/admin/article-table"} className="flex items-center gap-5">
        <span>
          <GrArticle className="text-5xl text-white" />
        </span>
        <span className="text-white text-2xl">{"المقالات"}</span>
      </Link>
      <Link href={"/admin/comment-table"} className="flex items-center gap-5">
        <span>
          <LiaComment className="text-5xl text-white" />
        </span>
        <span className="text-white text-2xl">{"التعليقات"}</span>
      </Link>
    </div>
  );
};

export default SideBar;
