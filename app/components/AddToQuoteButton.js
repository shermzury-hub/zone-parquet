"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

export default function AddToQuoteButton({ product }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);

  // پاراستن ئەگەر items هێشتا بار نەکرا بوو
  const safeItems = Array.isArray(items) ? items : [];
  const alreadyInCart = safeItems.some((i) => i.code === product.code);

  function handleAdd() {
    addItem(product);
    setAdded(true);
  }

  if (alreadyInCart || added) {
    return (
      <button className="zp-product-cta added" disabled>
        ✓ زیادکرا بۆ داوای نرخ
      </button>
    );
  }

  return (
    <button className="zp-product-cta" onClick={handleAdd}>
      زیادکردن بۆ داوای نرخ
    </button>
  );
}