"use client";

import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const [type, setType] = useState("general");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function sendWhatsApp() {
    if (!name.trim() || !message.trim()) {
      alert(t("contact_alert_fill"));
      return;
    }
    const intro = type === "quote" ? t("wa_intro_quote") : t("wa_intro_general");
    const text = `${intro}\n${t("wa_name")}: ${name}\n\n${message}`;
    const url = "https://wa.me/9647506733630?text=" + encodeURIComponent(text);
    window.open(url, "_blank");
  }

  return (
    <main className="zp-contact">
      <div className="zp-contact-head">
        <h1 className="zp-contact-title">{t("contact_title")}</h1>
        <p className="zp-contact-subtitle">{t("contact_subtitle")}</p>
      </div>

      <div className="zp-contact-card">
        <label className="zp-contact-label">{t("contact_type_label")}</label>
        <div className="zp-contact-types">
          <button
            className={`zp-contact-type ${type === "general" ? "active" : ""}`}
            onClick={() => setType("general")}
          >
            {t("contact_type_general")}
          </button>
          <button
            className={`zp-contact-type ${type === "quote" ? "active" : ""}`}
            onClick={() => setType("quote")}
          >
            {t("contact_type_quote")}
          </button>
        </div>

        <label className="zp-contact-label">{t("contact_name")}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("contact_name_ph")}
        />

        <label className="zp-contact-label">{t("contact_message")}</label>
        <textarea
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("contact_message_ph")}
        />

        <button className="zp-contact-send" onClick={sendWhatsApp}>
          {t("contact_send_wa")}
        </button>
      </div>

      <div className="zp-contact-direct">
        <p className="zp-contact-direct-title">{t("contact_direct_title")}</p>
        <div className="zp-contact-direct-links">
          <a
            href="https://wa.me/9647506733630"
            target="_blank"
            rel="noreferrer"
            className="zp-contact-direct-btn wa"
          >
            {t("contact_wa_direct")}
          </a>
          <a
            href="mailto:info@zoneparquet.com"
            className="zp-contact-direct-btn email"
          >
            {t("contact_email_direct")}
          </a>
        </div>
      </div>
    </main>
  );
}