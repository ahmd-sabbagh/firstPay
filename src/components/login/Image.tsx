import { LoginImage } from "@/assets";
import Image from "next/image";

function ImageLogin() {
  return (
    <div>
      <div className="flex justify-center">
        <Image src={LoginImage} alt="image" priority />
      </div>
      <div className="mt-14">
        <h3 className="text-black font-semibold text-2xl text-center">
          {"هذا النص هو مثال لنص يمكن أن يستبدل"}
        </h3>
        <p className="text-grey font-light mt-3 text-center">
          {
            "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص."
          }
        </p>
      </div>
    </div>
  );
}

export default ImageLogin;
