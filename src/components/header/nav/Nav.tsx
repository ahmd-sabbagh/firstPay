import Link from "next/link";
import "./nav.css"

interface linkDataType {
  name: string;
  linkTo: string;
}

const linksData: linkDataType[] = [
  {
    name: "الرئيسية",
    linkTo: "/",
  },
  {
    name: "من نحن",
    linkTo: "/who-us",
  },
  {
    name: "المسؤول",
    linkTo: "/admin",
  },
  {
    name: "المدونة",
    linkTo: "/article",
  },
  {
    name: "تواصل معنا",
    linkTo: "/contact-us",
  },
];

function Nav() {
  return (
    <ul className="nav-header flex items-center gap-8">
      {linksData.map((item, idx) => (
        <Link href={item.linkTo} key={idx}>
          {item.name}
        </Link>
      ))}
    </ul>
  );
}

export default Nav;
