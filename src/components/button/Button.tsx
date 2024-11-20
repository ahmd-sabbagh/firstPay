import { TypeButton } from "@/utils/types";
import Link from "next/link";
import "./button.css";

function Button({
  fill = true,
  type = "link",
  hRef = "",
  text,
  clickHandel,
}: TypeButton) {
  return (
    <>
      {type === "link" ? (
        <Link className={`Button ${!fill ? "border" : ""} flex-c`} href={hRef}>
          {text}
        </Link>
      ) : (
        <button
          className={`Button ${!fill ? "border" : ""} flex-c`}
          onClick={clickHandel}
        >
          {text}
        </button>
      )}
    </>
  );
}

export default Button;
