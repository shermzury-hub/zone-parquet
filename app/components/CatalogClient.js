"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { localized } from "@/lib/translations";

export default function CatalogClient({ products, categories }) {
  const { lang, t } = useLanguage();
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
        <h1 className="zp-catalog-title">{t("catalog_title")}</h1>
        <p className="zp-catalog-sub">
          {filtered.length} {t("catalog_models_available")}
        </p>
      </div>

      {/* فلتەری ئەستووری */}
      <div className="zp-filters">
        <span className="zp-filter-label">{t("label_thickness")}:</span>
        {["all", "8mm", "10mm", "12mm"].map((tk) => (
          <button
            key={tk}
            onClick={() => setThickness(tk)}
            className={`zp-filter-btn ${thickness === tk ? "active" : ""}`}
          >
            {tk === "all" ? t("filter_all") : tk}
          </button>
        ))}
      </div>

      {/* فلتەری کۆلێکشن */}
      <div className="zp-filters">
        <span className="zp-filter-label">{t("filter_collection")}:</span>
        <button
          onClick={() => setCategory("all")}
          className={`zp-filter-btn ${category === "all" ? "active" : ""}`}
        >
          {t("filter_all")}
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`zp-filter-btn ${category === c.id ? "active" : ""}`}
          >
            {localized(c, "name", lang)}
          </button>
        ))}
      </div>

      {/* کارتەکان */}
      <div className="zp-grid">
        {filtered.map((p) => (
          <Link key={p.id} href={`/catalog/${p.code}`} className="zp-card">
            <div className="zp-card-img">
              <img src={p.image_url} alt={localized(p, "title", lang)} />
            </div>
            <div className="zp-card-body">
              <h3 className="zp-card-title">{localized(p, "title", lang)}</h3>
              <p className="zp-card-code">{t("code_label")}: {p.code}</p>
              <span className="zp-card-cta">{t("card_cta")}</span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="zp-empty">{t("catalog_empty")}</p>
      )}
    </main>
  );
}