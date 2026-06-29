import { speda, franklin } from "./fonts";
import "./globals.css";

export const metadata = {
  title: "Zone Parquet | زۆن پارکێت",
  description: "پارکێتی لوکس و شکۆمەند بۆ ماڵی تۆ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ckb" dir="rtl" className={`${speda.variable} ${franklin.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}