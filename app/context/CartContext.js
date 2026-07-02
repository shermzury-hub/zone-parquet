"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("zp_cart");
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("zp_cart", JSON.stringify(items));
    }
  }, [items, loaded]);

  function addItem(product) {
    setItems((prev) => {
      if (prev.some((i) => i.code === product.code)) return prev;
      return [
        ...prev,
        {
          code: product.code,
          title_ku: product.title_ku || "",
          title_en: product.title_en || "",
          title_ar: product.title_ar || "",
          image: product.image_url,
          m2: 10,
        },
      ];
    });
  }

  function removeItem(code) {
    setItems((prev) => prev.filter((i) => i.code !== code));
  }

  function updateM2(code, m2) {
    setItems((prev) => prev.map((i) => (i.code === code ? { ...i, m2 } : i)));
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateM2, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}