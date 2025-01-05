import Link from "next/link";
import styles from "./style.module.css";

function Buttons() {

  return (
    <div className={`flex items-center gap-6 ${styles.headerBtns}`}>
      <Link className={`rounded-full flex-c`} href={"/login"}>
        {"تسجيل الدخول"}
      </Link>
      <Link className={`register rounded-full flex-c`} href={"/register"}>
        {"انشاء حساب"}
      </Link>
    </div>
  );
}

export default Buttons;
