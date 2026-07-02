"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    { key: "about_v1_t", desc: "about_v1_d" },
    { key: "about_v2_t", desc: "about_v2_d" },
    { key: "about_v3_t", desc: "about_v3_d" },
  ];

  return (
    <main className="zp-about">
      <section className="zp-about-hero">
        <h1 className="zp-about-title">{t("about_title")}</h1>
        <p className="zp-about-intro">{t("about_intro")}</p>
      </section>

      <section className="zp-about-story">
        <h2 className="zp-about-h2">{t("about_story_title")}</h2>
        <p>{t("about_story_p1")}</p>
        <p>{t("about_story_p2")}</p>
      </section>

      <section className="zp-about-values">
        <h2 className="zp-about-h2">{t("about_values_title")}</h2>
        <div className="zp-values-grid">
          {values.map((v) => (
            <div key={v.key} className="zp-value-card">
              <h3>{t(v.key)}</h3>
              <p>{t(v.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="zp-about-cta">
        <h2>{t("about_cta_title")}</h2>
        <p>{t("about_cta_text")}</p>
        <Link href="/catalog" className="zp-btn-light">
          {t("about_cta_btn")}
        </Link>
      </section>
    </main>
  );
}