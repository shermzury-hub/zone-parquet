"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/app/context/CartContext";
import { useLanguage } from "@/app/context/LanguageContext";

export default function CartPage() {
  const { items, removeItem, updateM2, clearCart } = useCart();
  const { lang, t } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("idle");

  function itemTitle(item) {
    return item["title_" + lang] || item.title_ku || item.title || "";
  }

  async function handleSubmit() {
    if (!name.trim() || !phone.trim()) {
      alert(t("cart_alert_fill"));
      return;
    }
    if (items.length === 0) {
      alert(t("cart_alert_empty"));
      return;
    }

    setStatus("sending");

    const { error } = await supabase.from("quote_requests").insert({
      customer_name: name,
      customer_phone: phone,
      note: note,
      items: items.map((i) => ({
        code: i.code,
        title: i.title_ku || i.title || "",
        m2: i.m2,
      })),
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("done");
      clearCart();
    }
  }

  if (status === "done") {
    return (
      <main className="zp-cart">
        <div className="zp-cart-success">
          <h1>{t("cart_success_title")}</h1>
          <p>{t("cart_success_text")}</p>
          <Link href="/catalog" className="zp-product-cta">
            {t("cart_success_btn")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="zp-cart">
      <h1 className="zp-cart-title">{t("cart_title")}</h1>

      {items.length === 0 ? (
        <div className="zp-cart-empty">
          <p>{t("cart_empty")}</p>
          <Link href="/catalog" className="zp-product-cta">
            {t("cart_browse")}
          </Link>
        </div>
      ) : (
        <div className="zp-cart-layout">
          <div className="zp-cart-items">
            {items.map((item) => (
              <div key={item.code} className="zp-cart-item">
                <img
                  src={item.image}
                  alt={itemTitle(item)}
                  className="zp-cart-item-img"
                />
                <div className="zp-cart-item-info">
                  <h3>{itemTitle(item)}</h3>
                  <p>{t("code_label")}: {item.code}</p>
                </div>
                <div className="zp-cart-item-m2">
                  <label>{t("cart_area")}</label>
                  <input
                    type="number"
                    min="1"
                    value={item.m2}
                    onChange={(e) => updateM2(item.code, Number(e.target.value))}
                  />
                </div>
                <button
                  className="zp-cart-remove"
                  onClick={() => removeItem(item.code)}
                  aria-label={t("cart_remove")}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="zp-cart-form">
            <h2>{t("cart_contact_info")}</h2>
            <label>{t("cart_name")}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("cart_name_ph")}
            />
            <label>{t("cart_phone")}</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("cart_phone_ph")}
            />
            <label>{t("cart_note")}</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t("cart_note_ph")}
              rows="3"
            />

            <button
              className="zp-product-cta zp-cart-submit"
              onClick={handleSubmit}
              disabled={status === "sending"}
            >
              {status === "sending" ? t("cart_sending") : t("cart_submit")}
            </button>

            {status === "error" && (
              <p className="zp-cart-error">{t("cart_error")}</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}