"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useLanguage } from "@/app/context/LanguageContext";
import AuthModal from "./AuthModal";

const LANGS = [
  { code: "ku", label: "کوردی" },
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
];

export default function Header() {
  const { items } = useCart();
  const { lang, setLang, t } = useLanguage();
  const count = items.length;
  const router = useRouter();

  const [showAuth, setShowAuth] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef(null);
  const langRef = useRef(null);

  // داخستنی مینیوی زمان کاتی کلیک لە دەرەوەی
  useEffect(() => {
    function onDocClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setShowLangMenu(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function handleLogoClick() {
    clickCount.current += 1;

    if (clickCount.current === 3) {
      clearTimeout(clickTimer.current);
      clickCount.current = 0;
      setShowAuth(true);
      return;
    }

    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      if (clickCount.current === 1) {
        router.push("/");
      }
      clickCount.current = 0;
    }, 600);
  }

  const currentLang = LANGS.find((l) => l.code === lang) || LANGS[0];

  return (
    <>
      <header className="zp-header">
        <nav className="zp-nav">
          <span className="zp-logo" onClick={handleLogoClick}>
            زۆن پارکێت
          </span>

          <ul className="zp-nav-links">
            <li><Link href="/">{t("nav_home")}</Link></li>
            <li><Link href="/catalog">{t("nav_catalog")}</Link></li>
            <li><Link href="/about">{t("nav_about")}</Link></li>
            <li><Link href="/contact">{t("nav_contact")}</Link></li>
          </ul>

          <div className="zp-nav-actions">
            <div className="zp-lang-wrap" ref={langRef}>
              <button
                className="zp-lang-btn"
                onClick={() => setShowLangMenu((v) => !v)}
              >
                {currentLang.label} ▾
              </button>

              {showLangMenu && (
                <div className="zp-lang-menu">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      className={`zp-lang-item ${l.code === lang ? "active" : ""}`}
                      onClick={() => {
                        setLang(l.code);
                        setShowLangMenu(false);
                      }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/cart" className="zp-cart-btn">
              {t("nav_quote")}
              {count > 0 && <span className="zp-cart-count">{count}</span>}
            </Link>
          </div>
        </nav>
      </header>

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}