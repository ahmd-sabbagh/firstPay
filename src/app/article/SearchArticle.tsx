"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SearchArticle = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const onsubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search == "") return toast.error("please write somthing");
    router.push(`/article/search?textSearch=${search}`);
  };
  return (
    <div
      className=" w-2/3 m-auto mt-16 p-10 rounded-3xl"
      style={{ backgroundColor: "#3bade23d" }}
    >
      <form onSubmit={onsubmit} className="flex flex-col gap-5">
        <input
          type="search"
          className="p-4 rounded-2xl"
          placeholder="ابحث هنا"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchArticle;
