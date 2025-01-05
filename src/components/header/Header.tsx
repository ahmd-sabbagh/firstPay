import { Logo } from "@/assets";
import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { verifyTokenForSite } from "@/utils/verifyToken";
import Logout from "./Logout";

function Header() {
  const token = cookies().get("jwtCookie")?.value || "";
  const userPayLoad = verifyTokenForSite(token);

  return (
    <header className={`relative bg-white ${styles.mainContainer}`}>
      <div
        className={`container m-auto flex justify-between items-center ${styles.header}`}
      >
        <div className={`${styles.logo} xl:flex-grow`}>
          <Image src={Logo} alt="logo" priority />
        </div>
        <Navbar userData={userPayLoad} />
        {userPayLoad && <Logout userInfo={userPayLoad} />}
      </div>
    </header>
  );
}

export default Header;
