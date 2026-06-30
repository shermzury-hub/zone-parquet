"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function Header() {
  const { items } = useCart();
  const count = items.length;

  return (
    <header className="zp-header">
      <nav className="zp-nav">
        <Link href="/" className="zp-logo">زۆن پارکێت</Link>

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
  );
}