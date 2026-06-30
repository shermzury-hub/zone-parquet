"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("zp_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        // ئەگەر داتاکە ڕیزبەند (Array) نەبوو، فەرامۆشی بکە بۆ ئەوەی تێک نەچێت
        if (Array.isArray(parsed)) {
          setItems(parsed);
        } else {
          localStorage.removeItem("zp_cart");
        }
      }
    } catch (e) {
      localStorage.removeItem("zp_cart");
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("zp_cart", JSON.stringify(items));
    }
  }, [items, loaded]);

  function addItem(product) {
    setItems((prev) => {
      // دڵنیابوونەوە لەوەی داتای پێشوو بێ کێشەیە
      const safePrev = Array.isArray(prev) ? prev : [];
      if (safePrev.some((i) => i.code === product.code)) return safePrev;
      return [
        ...safePrev,
        {
          code: product.code,
          title: product.title_ku,
          image: product.image_url,
          m2: 10,
        },
      ];
    });
  }

  function removeItem(code) {
    setItems((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.filter((i) => i.code !== code);
    });
  }

  function updateM2(code, m2) {
    setItems((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.map((i) => (i.code === code ? { ...i, m2 } : i));
    });
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