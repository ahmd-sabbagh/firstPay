import Button from "@/components/button/Button";
import "./syles.css";

function Text() {
  return (
    <div className="heroText flex flex-col justify-center">
      <span className="text-mob">حقق أهدافك المالية</span>
      <h1 className="font-semibold text-5xl mt-6 leading-normal text-mob">
        {"الحل الأمثل"} <span>{"لإدارة التمويل"}</span> <br />{" "}
        {"والتسوق بكفاءة"}
      </h1>
      <p className="mt-6 font-normal text-lg text-mob">
        اكتشف كيف يمكن لمنصتنا تحويل تجربتك المالية والتجارية إلى تجربة سلسة
        وفعالة. من خلال أدوات متقدمة لطلب التمويل والتسوق.
      </p>
      <div className="flex items-center gap-5 mt-6">
        <Button  type="link" text="مورد" />
        <Button fill={false} type="link" text="عميل" />
      </div>
    </div>
  );
}

export default Text;
