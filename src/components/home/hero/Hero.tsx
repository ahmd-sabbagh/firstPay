import Image from "next/image";
import Text from "./Text";
import { Landing } from "@/assets";

function Hero() {
  return (
    <div className="heroSection fix-height pt-8 lg:pt-0">
      <div className="container">
        <div className="grid lg:grid-cols-2">
          <Text />
          <div>
            <Image src={Landing} alt="hero" width={650} priority />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
