import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Zone Parquet | زۆن پارکێت",
  description: "پارکێتی لوکس و شکۆمەند بۆ ماڵی تۆ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ckb" dir="rtl">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}