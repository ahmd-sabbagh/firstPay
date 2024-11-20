import Link from "next/link";

function Links() {
  return (
    <div className="Links flex flex-col items-center">
      <div>
        <h3 className="text-black font-medium text-2xl">{"الوصول السريع"}</h3>
        <div className="flex mt-8 gap-8">
          <ul className="flex flex-col gap-4">
            <Link href={""}>{"الرئيسية"}</Link>
            <Link href={""}>{"الشركاء"}</Link>
            <Link href={""}>{"الأسئلة الشائعة"}</Link>
            <Link href={""}>{"تواصل معنا"}</Link>
          </ul>
          <ul className="flex flex-col gap-4">
            <Link href={""}>{"من نحن"}</Link>
            <Link href={""}>{"المدونة"}</Link>
            <Link href={""}>{"الدعم"}</Link>
            <Link href={""}>{" األمان والخصوصية"}</Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Links;
