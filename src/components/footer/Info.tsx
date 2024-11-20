import { Call, Email } from "@/assets";

function Info() {
  return (
    <div className="Info flex flex-col items-center">
      <div>
        <h3 className="text-black font-medium text-2xl">{"معلومات التواصل"}</h3>
        <div className="mt-8">
          <div className="flex items-center gap-4">
            <Call />
            <span>920003884</span>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <Email />
            <span>care@first-pay.sa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
