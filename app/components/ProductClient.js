"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { localized } from "@/lib/translations";
import AddToQuoteButton from "@/app/components/AddToQuoteButton";

export default function ProductClient({ product }) {
  const { lang, t } = useLanguage();

  const features = [
    product.is_waterproof && t("feat_water"),
    product.is_fireproof && t("feat_fire"),
    product.is_soundproof && t("feat_sound"),
    product.is_scratch_resistant && t("feat_scratch"),
    product.is_eco_friendly && t("feat_eco"),
  ].filter(Boolean);

  return (
    <main className="zp-product">
      <Link href="/catalog" className="zp-back">{t("product_back")}</Link>

      <div className="zp-product-grid">
        <div className="zp-product-img">
          <img src={product.image_url} alt={localized(product, "title", lang)} />
        </div>

        <div className="zp-product-info">
          <h1 className="zp-product-title">{localized(product, "title", lang)}</h1>
          <p className="zp-product-code">{t("code_label")}: {product.code}</p>
          <p className="zp-product-thickness">
            {t("label_thickness")}: {product.thickness}
          </p>
          <p className="zp-product-desc">{localized(product, "description", lang)}</p>

          {features.length > 0 && (
            <div className="zp-product-features">
              {features.map((f) => (
                <span key={f} className="zp-feature-tag">{f}</span>
              ))}
            </div>
          )}

          <AddToQuoteButton product={product} />
          <p className="zp-product-note">{t("product_note")}</p>
        </div>
      </div>
    </main>
  );
}