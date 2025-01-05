import Link from "next/link";
import "./nav.css";

function Nav({ dataUser }: any) {
  return (
    <ul className="nav-header flex items-center gap-8">
      <Link href={"/"}>{"الرئيسية"}</Link>
      <Link href={"/who-us"}>{"من نحن"}</Link>
      {dataUser?.isAdmin && <Link href={"/admin"}>{"المسؤول"}</Link>}
      <Link href={"/article"}>{"المدونة"}</Link>
      <Link href={"/contact-us"}>{"تواصل معنا"}</Link>
    </ul>
  );
}

export default Nav;
