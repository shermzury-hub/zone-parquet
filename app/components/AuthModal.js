"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthModal({ open, onClose }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleLogin() {
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      setError("ئیمەیڵ یان وشەی نهێنی هەڵەیە.");
    } else {
      onClose();
      router.push("/zp-admin");
    }
  }

  return (
    <div className="zp-modal-overlay" onClick={onClose}>
      <div className="zp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="zp-modal-close" onClick={onClose}>✕</button>
        <h2 className="zp-modal-title">چوونەژوورەوەی بەڕێوەبەر</h2>

        <label>ئیمەیڵ</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ئیمەیڵەکەت"
        />

        <label>وشەی نهێنی</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="وشەی نهێنی"
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        {error && <p className="zp-modal-error">{error}</p>}

        <button
          className="zp-product-cta zp-modal-submit"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "..." : "چوونەژوورەوە"}
        </button>
      </div>
    </div>
  );
}