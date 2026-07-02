import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";

export const metadata = {
  title: "Zone Parquet | زۆن پارکێت",
  description: "پارکێتی لوکس و شکۆمەند بۆ ماڵی تۆ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ckb" dir="rtl">
      <body>
        <LanguageProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}