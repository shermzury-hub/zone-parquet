"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="zp-footer">
      <div className="zp-footer-inner">
        <div className="zp-footer-brand">
          <h3>زۆن پارکێت</h3>
          <p>{t("footer_tagline")}</p>
        </div>
        <div className="zp-footer-contact">
          <p>
            {t("footer_whatsapp")}:{" "}
            <a href="https://wa.me/9647506733630" className="zp-footer-link">
              +964 750 673 3630
            </a>
          </p>
          <p>
            {t("footer_email")}:{" "}
            <a href="mailto:info@zoneparquet.com" className="zp-footer-link">
              info@zoneparquet.com
            </a>
          </p>
        </div>
      </div>
      <div className="zp-footer-bottom">
        <p>{t("footer_rights")}</p>
      </div>
    </footer>
  );
}