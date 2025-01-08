import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ToastContainer } from "react-toastify";

const montserrat = Alexandria({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "First Pay",
  description: "الحل الأمثل لإدارة التمويلوالتسوق بكفاءة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={montserrat.className}>
        <Header />
        <ToastContainer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
