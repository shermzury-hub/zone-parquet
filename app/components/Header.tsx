"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import AuthModal from "./AuthModal";

export default function Header() {
  const { items } = useCart();
  const count = items.length;
  const router = useRouter();

  const [showAuth, setShowAuth] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef(null);

  function handleLogoClick() {
    clickCount.current += 1;

    // سێ کرتەی خێرا = کردنەوەی چوونەژوورەوەی نهێنی
    if (clickCount.current === 3) {
      clearTimeout(clickTimer.current);
      clickCount.current = 0;
      setShowAuth(true);
      return;
    }

    // یەک کرتە = گەڕانەوە بۆ سەرەتا
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      if (clickCount.current === 1) {
        router.push("/");
      }
      clickCount.current = 0;
    }, 600);
  }

  return (
    <>
      <header className="zp-header">
        <nav className="zp-nav">
          <span className="zp-logo" onClick={handleLogoClick}>
            زۆن پارکێت
          </span>

          <ul className="zp-nav-links">
            <li><Link href="/">سەرەتا</Link></li>
            <li><Link href="/catalog">کۆلێکشنەکان</Link></li>
            <li><Link href="/about">دەربارە</Link></li>
            <li><Link href="/contact">پەیوەندی</Link></li>
          </ul>

          <div className="zp-nav-actions">
            <button className="zp-lang-btn">EN</button>
            <Link href="/cart" className="zp-cart-btn">
              داوای نرخ
              {count > 0 && <span className="zp-cart-count">{count}</span>}
            </Link>
          </div>
        </nav>
      </header>

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}