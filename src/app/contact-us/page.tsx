import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import React from "react";

const ContactUsPage = () => {
  return (
    <section className="container">
      <div className="container fix-height">
        <div className="py-16 w-2/4 m-auto">
          <h1 className="text-center text-2xl text-gray-700">{"تواصل معنا"}</h1>
          <p className="mt-4 mx-auto text-center font-light text-gray-500 w-3/4">
            {
              "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق."
            }
          </p>
          <div className="form mt-5 flex flex-col gap-8">
            <Input lable="الاسم" placeHolder="الاسم كاملا" />
            <Input lable="البريد الاليكتروني" placeHolder="البريد الاليكتروني" />
            <textarea className="border rounded-2xl bg-gray-100 p-4 text-sm font-light" placeholder="الرساله" rows={4}>
            </textarea>
            <button className="bg-main text-white rounded-xl p-5">ارسال</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
