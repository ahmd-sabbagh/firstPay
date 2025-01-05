"use client";
import React, { useState } from "react";
import Nav from "./nav/Nav";
import Buttons from "./buttons/Buttons";
import { Menu } from "@/assets";
import styles from "./styles.module.css";

const Navbar = ( {userData} :any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`flex justify-between items-center flex-grow ${styles.left}`}
        style={{
          clipPath: (open && "polygon(0 0, 100% 0, 100% 100%, 0 100%)") || "",
        }}
      >
        <Nav dataUser={userData} />
        {!userData ? <Buttons /> : ""}
      </div>
      <div
        className={`${styles.iconMenu} cursor-pointer`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Menu />
      </div>
    </>
  );
};

export default Navbar;
