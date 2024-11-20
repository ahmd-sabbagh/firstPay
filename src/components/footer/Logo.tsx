import { Logo, Instagram, Tiktok, Twitter, WhatsApp } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function LogoFooter() {
  return (
    <div className="Logo flex flex-col gap-5">
      <div>
        <Image src={Logo} alt="logo" priority />
      </div>
      <p className=" font-light text-lg text-grey">
        {
          "نحن شركة مبتكرة ومتخصصة في تقديم حلول مالية مرنة تلبي احتياجات عملائنا. من خلال منصتنا الرقمية المتقدمة، نوفر لعملائنا إمكانية الوصول إلى مجموعة متنوعة من خيارات التمويل، مما يساعدهم على تحقيق أهدافهم المالية بكل سهولة وراحة."
        }
      </p>
      <div className="social flex items-center gap-4">
        <Link href={""}>
          <Twitter />
        </Link>
        <Link href={""}>
          <WhatsApp />
        </Link>
        <Link href={""}>
          <Tiktok />
        </Link>
        <Link href={""}>
          <Instagram />
        </Link>
      </div>
    </div>
  );
}

export default LogoFooter;
