import { Logo } from "@/assets";
import Image from "next/image";
import React from "react";
import Input from "../input/Input";
import Link from "next/link";
import Form from "./Form";
import { Children } from "@/utils/types";

function InterData(props: Children) {
  const { title, discription, question, response, linkTo } = props.data;
  return (
    <div className="InterData bg-white p-3 md:p-10 rounded-3xl flex flex-col justify-between gap-10 lg:gap-10">
      <div className="top flex flex-col gap-4">
        <Image src={Logo} alt="logo" priority />
        <h3 className=" font-semibold lg:text-2xl xl:text-3xl text-black md:mt-10">
          {title}
        </h3>
        <p className="font-light md:text-lg text-grey md:mt-2 xl:w-3/4">
          {discription}
        </p>
      </div>
      {props.children}
      <div className="flex items-center justify-center mt-5">
        <span className="font-light">{question}</span>
        <Link className="text-main font-light" href={linkTo ? linkTo : "/"}>
          {response}
        </Link>
      </div>
    </div>
  );
}

export default InterData;
