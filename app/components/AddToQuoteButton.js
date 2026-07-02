"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useLanguage } from "@/app/context/LanguageContext";

export default function AddToQuoteButton({ product }) {
  const { addItem, items } = useCart();
  const { t } = useLanguage();
  const [added, setAdded] = useState(false);

  const alreadyInCart = items.some((i) => i.code === product.code);

  function handleAdd() {
    addItem(product);
    setAdded(true);
  }

  if (alreadyInCart || added) {
    return (
      <button className="zp-product-cta added" disabled>
        {t("product_added")}
      </button>
    );
  }

  return (
    <button className="zp-product-cta" onClick={handleAdd}>
      {t("product_add")}
    </button>
  );
}