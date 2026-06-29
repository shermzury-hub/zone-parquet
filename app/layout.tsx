import "./globals.css";

export const metadata = {
  title: "Zone Parquet | زۆن پارکێت",
  description: "پارکێتی لوکس و شکۆمەند بۆ ماڵی تۆ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {  return (
    <html lang="ckb" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
