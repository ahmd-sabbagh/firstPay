import Form from "@/components/login/Form";
import ImageLogin from "@/components/login/Image";
import InterData from "@/components/login/InterData";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const interData = {
  title: "مرحبا بك في منصة التمويل",
  discription:
    "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى.",
  question: "ليس لديك حساب؟",
  response: "انشاء حساب",
  linkTo:"/register"
};

function page() {
  const token = cookies().get("jwtCookie")?.value;
  if (token) redirect("/");
  return (
    <section className=" bg-gray-100 py-5 md:p-16">
      <div className="container">
        <div
          className="grid
        lg:grid-cols-2 items-center gap-16"
        >
          <InterData data={interData}>
            <Form />
          </InterData>
          <ImageLogin />
        </div>
      </div>
    </section>
  );
}

export default page;
