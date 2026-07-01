import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

const FEATURES = [
  { key: "water", label: "دژە ئاو", desc: "بەرگری تەواو لە شێ و ئاو" },
  { key: "fire", label: "دژە ئاگر", desc: "پارێزراو لە گڕ و گەرمی" },
  { key: "sound", label: "دژە دەنگ", desc: "هێمنیی زیاتر بۆ ماڵەکەت" },
  { key: "scratch", label: "دژە خوران", desc: "ساڵانێکی زۆر نوێ دەمێنێتەوە" },
  { key: "eco", label: "دۆستی ژینگە", desc: "کەرەستەی پاک و سەلامەت" },
];

function FeatureIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    width: 28,
    height: 28,
  };

  if (type === "water") {
    return (
      <svg {...common}>
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    );
  }
  if (type === "fire") {
    return (
      <svg {...common}>
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    );
  }
  if (type === "sound") {
    return (
      <svg {...common}>
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    );
  }
  if (type === "scratch") {
    return (
      <svg {...common}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  );
}

export default async function Home() {
  const { data: featured } = await supabase
    .from("products_public")
    .select("*")
    .order("sort_order", { ascending: true })
    .limit(3);

  const products = featured || [];

  return (
    <main>
      {/* هیرۆ */}
      <section className="zp-home-hero">
        <div className="zp-home-hero-text">
          <span className="zp-home-eyebrow">پارکێتی لوکس</span>
          <h1 className="zp-home-title">شکۆمەندی، لە هەر هەنگاوێکدا</h1>
          <p className="zp-home-subtitle">
            ١١٤ دیزاینی هەڵبژاردە بۆ ئەوانەی تەنها باشترین دەخوازن. لە هەر
            شوێنێکی وڵات بیت، دیزاینی خەونەکانت دەگاتە بەردەستت.
          </p>
          <div className="zp-home-hero-actions">
            <Link href="/catalog" className="zp-btn-primary">کۆلێکشنەکان ببینە</Link>
            <Link href="/about" className="zp-btn-ghost">دەربارەی ئێمە</Link>
          </div>
        </div>

        <div className="zp-home-hero-visual">
          <div className="zp-home-hero-card">
            <span>زۆن پارکێت</span>
          </div>
        </div>
      </section>

      {/* تایبەتمەندییەکان */}
      <section className="zp-home-features">
        {FEATURES.map((f) => (
          <div key={f.key} className="zp-feature-item">
            <div className="zp-feature-icon">
              <FeatureIcon type={f.key} />
            </div>
            <h3>{f.label}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* کۆلێکشنە هەڵبژاردەکان */}
      <section className="zp-home-section">
        <div className="zp-home-section-head">
          <h2>کۆلێکشنە هەڵبژاردەکان</h2>
          <p>تامەزرۆیەک لە جوانترین دیزاینەکانمان</p>
        </div>

        <div className="zp-grid">
          {products.map((p) => (
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

        <div className="zp-home-section-cta">
          <Link href="/catalog" className="zp-btn-primary">بینینی هەموو ١١٤ مۆدێل</Link>
        </div>
      </section>

      {/* بۆچی زۆن پارکێت؟ */}
      <section className="zp-home-promise">
        <div className="zp-promise-inner">
          <h2>بۆچی زۆن پارکێت؟</h2>
          <div className="zp-promise-grid">
            <div className="zp-promise-item">
              <h3>هەڵبژاردەیەکی تایبەت</h3>
              <p>هەر ١١٤ مۆدێلەکەمان بە وردی هەڵبژێردراون؛ تەنها ئەوانەی شایانی ماڵی تۆن.</p>
            </div>
            <div className="zp-promise-item">
              <h3>کوالیتیی بەرز</h3>
              <p>کەرەستەی بەهێز کە بۆ ساڵانێکی زۆر جوانی و ڕەنگی خۆی دەپارێزێت.</p>
            </div>
            <div className="zp-promise-item">
              <h3>گەیاندنی نیشتیمانی</h3>
              <p>لە هەر پارێزگایەک بیت، پارکێتەکەت بەبێ سنوور دەگاتە دەستت.</p>
            </div>
          </div>
        </div>
      </section>

      {/* بانگهێشتی کۆتایی */}
      <section className="zp-home-cta-band">
        <h2>ماڵەکەت شایانی جوانترینە</h2>
        <p>
          مۆدێلە دڵخوازەکانت هەڵبژێرە و داواکارییەکەت بنێرە — ئێمە بە باشترین نرخ
          و خزمەت پەیوەندیت پێوە دەکەین.
        </p>
        <Link href="/catalog" className="zp-btn-light">دەستپێبکە</Link>
      </section>
    </main>
  );
}