import About from "@/components/home/about/About";
import Hero from "@/components/home/hero/Hero";
import InfoNumber from "@/components/home/info/Info";
import Team from "@/components/home/team/Team";
import React from "react";

function page() {
  return (
    <section>
      <Hero />
      <InfoNumber />
      <Team />
      <About />
    </section>
  );
}

export default page;
