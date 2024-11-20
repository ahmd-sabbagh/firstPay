import Info from "./Info";
import Links from "./Links";
import LogoFooter from "./Logo";
import "./styles.css";

function Footer() {
  return (
    <section className="Footer pt-14">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 pb-10">
          <LogoFooter />
          <Links />
          <Info />
        </div>
      </div>
      <div className="py-6 bg-white text-center text-black">
        {"جميع الحقوق محفوظة لمنصة التمويل © 2024"}
      </div>
    </section>
  );
}

export default Footer;
