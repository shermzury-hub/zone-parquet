"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateM2, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit() {
    if (!name.trim() || !phone.trim()) {
      alert("تکایە ناو و ژمارەی مۆبایل پڕبکەرەوە.");
      return;
    }
    if (items.length === 0) {
      alert("سەبەتەکەت بەتاڵە.");
      return;
    }

    setStatus("sending");

    const { error } = await supabase.from("quote_requests").insert({
      customer_name: name,
      customer_phone: phone,
      note: note,
      items: items.map((i) => ({ code: i.code, title: i.title, m2: i.m2 })),
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
          <h1>سوپاس! 🎉</h1>
          <p>داواکارییەکەت گەیشت. بەمزووانە پەیوەندیت پێوە دەکەین بۆ دیاریکردنی نرخ.</p>
          <Link href="/catalog" className="zp-product-cta">گەڕانەوە بۆ کۆلێکشنەکان</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="zp-cart">
      <h1 className="zp-cart-title">داوای نرخ</h1>

      {items.length === 0 ? (
        <div className="zp-cart-empty">
          <p>هێشتا هیچ مۆدێلێکت هەڵنەبژاردووە.</p>
          <Link href="/catalog" className="zp-product-cta">بینینی کۆلێکشنەکان</Link>
        </div>
      ) : (
        <div className="zp-cart-layout">
          <div className="zp-cart-items">
            {items.map((item) => (
              <div key={item.code} className="zp-cart-item">
                <img src={item.image} alt={item.title} className="zp-cart-item-img" />
                <div className="zp-cart-item-info">
                  <h3>{item.title}</h3>
                  <p>کۆد: {item.code}</p>
                </div>
                <div className="zp-cart-item-m2">
                  <label>ڕووبەر (m²)</label>
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
                  aria-label="سڕینەوە"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="zp-cart-form">
            <h2>زانیاریی پەیوەندی</h2>
            <label>ناوی تەواو</label>
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
            <label>تێبینی (ئارەزوومەندانە)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="هەر زانیارییەکی زیادە..."
              rows="3"
            />

            <button
              className="zp-product-cta zp-cart-submit"
              onClick={handleSubmit}
              disabled={status === "sending"}
            >
              {status === "sending" ? "دەنێردرێت..." : "ناردنی داواکاری"}
            </button>

            {status === "error" && (
              <p className="zp-cart-error">هەڵەیەک ڕوویدا. تکایە دووبارە هەوڵبدەرەوە.</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}