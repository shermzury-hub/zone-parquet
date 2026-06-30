"use client";

import { useState } from "react";
import Link from "next/link";

export default function CatalogClient({ products, categories }) {
  const [thickness, setThickness] = useState("all");
  const [category, setCategory] = useState("all");

  const filtered = products.filter((p) => {
    const okThickness = thickness === "all" || p.thickness === thickness;
    const okCategory = category === "all" || p.category_id === category;
    return okThickness && okCategory;
  });

  return (
    <main className="zp-catalog">
      <div className="zp-catalog-head">
        <h1 className="zp-catalog-title">کۆلێکشنەکانمان</h1>
        <p className="zp-catalog-sub">{filtered.length} مۆدێل بەردەستە</p>
      </div>

      <div className="zp-filters">
        <span className="zp-filter-label">ئەستووری:</span>
        {["all", "8mm", "10mm", "12mm"].map((t) => (
          <button
            key={t}
            onClick={() => setThickness(t)}
            className={`zp-filter-btn ${thickness === t ? "active" : ""}`}
          >
            {t === "all" ? "هەموو" : t}
          </button>
        ))}
      </div>

      <div className="zp-filters">
        <span className="zp-filter-label">کۆلێکشن:</span>
        <button
          onClick={() => setCategory("all")}
          className={`zp-filter-btn ${category === "all" ? "active" : ""}`}
        >
          هەموو
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`zp-filter-btn ${category === c.id ? "active" : ""}`}
          >
            {c.name_ku}
          </button>
        ))}
      </div>

      <div className="zp-grid">
        {filtered.map((p) => (
          <Link key={p.id} href={`/catalog/${p.code}`} className="zp-card">
            <div className="zp-card-img">
              <img src={p.image_url} alt={p.title_ku} />
            </div>
            <div className="zp-card-body">
              <h3 className="zp-card-title">{p.title_ku}</h3>
              <p className="zp-card-code">کۆد: {p.code}</p>
              <span className="zp-card-cta">داوای نرخ ←</span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="zp-empty">هیچ مۆدێلێک نەدۆزرایەوە بەم فلتەرە.</p>
      )}
    </main>
  );
}