"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "9647506733630";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function sendWhatsApp() {
    if (!name.trim() || !message.trim()) {
      alert("تکایە ناو و پەیامەکەت بنووسە.");
      return;
    }
    const text =
      `سڵاو، ناوم ${name}ـە.\n` +
      (phone.trim() ? `ژمارەی پەیوەندی: ${phone}\n` : "") +
      `\n${message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <main className="zp-contact">
      <div className="zp-contact-head">
        <h1 className="zp-contact-title">پەیوەندیمان پێوە بکە</h1>
        <p className="zp-contact-sub">
          پرسیارت هەیە یان دەتەوێت نرخ بزانیت؟ ئێمە لێرەین بۆ یارمەتیدانت.
        </p>
      </div>

      <div className="zp-contact-layout">
        <div className="zp-contact-methods">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="zp-contact-card zp-contact-wa"
          >
            <span className="zp-contact-icon">💬</span>
            <div>
              <h3>وەتسئاپ</h3>
              <p>+964 750 673 3630</p>
            </div>
          </a>

          <a href="mailto:info@zoneparquet.com" className="zp-contact-card">
            <span className="zp-contact-icon">✉️</span>
            <div>
              <h3>ئیمەیڵ</h3>
              <p>info@zoneparquet.com</p>
            </div>
          </a>

          <a href="tel:+9647506733630" className="zp-contact-card">
            <span className="zp-contact-icon">📞</span>
            <div>
              <h3>تەلەفۆن</h3>
              <p>+964 750 673 3630</p>
            </div>
          </a>
        </div>

        <div className="zp-contact-form">
          <h2>پەیامێکمان بۆ بنێرە</h2>
          <p className="zp-contact-form-note">
            فۆرمەکە پڕبکەرەوە و پەیامەکەت ڕاستەوخۆ لە وەتسئاپ بۆمان دەگات.
          </p>

          <label>ناوی تەواو *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ناوەکەت بنووسە"
          />

          <label>ژمارەی مۆبایل</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="07XX XXX XXXX"
          />

          <label>پەیام *</label>
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="پەیامەکەت لێرە بنووسە..."
          />

          <button className="zp-product-cta zp-contact-submit" onClick={sendWhatsApp}>
            ناردن بە وەتسئاپ
          </button>
        </div>
      </div>
    </main>
  );
}