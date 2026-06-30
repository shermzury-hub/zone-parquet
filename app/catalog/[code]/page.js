import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function ProductPage({ params }) {
  const { code } = await params;

  const { data: product } = await supabase
    .from("products_public")
    .select("*")
    .eq("code", code)
    .single();

  if (!product) {
    notFound();
  }

  const features = [
    product.is_waterproof && "دژە ئاو",
    product.is_fireproof && "دژە ئاگر",
    product.is_soundproof && "دژە دەنگ",
    product.is_scratch_resistant && "دژە خوران",
    product.is_eco_friendly && "دۆستی ژینگە",
  ].filter(Boolean);

  return (
    <main className="zp-product">
      <Link href="/catalog" className="zp-back">→ گەڕانەوە بۆ کۆلێکشنەکان</Link>

      <div className="zp-product-grid">
        <div className="zp-product-img">
          <img src={product.image_url} alt={product.title_ku} />
        </div>

        <div className="zp-product-info">
          <h1 className="zp-product-title">{product.title_ku}</h1>
          <p className="zp-product-code">کۆد: {product.code}</p>
          <p className="zp-product-thickness">ئەستووری: {product.thickness}</p>
          <p className="zp-product-desc">{product.description_ku}</p>

          {features.length > 0 && (
            <div className="zp-product-features">
              {features.map((f) => (
                <span key={f} className="zp-feature-tag">{f}</span>
              ))}
            </div>
          )}

          <button className="zp-product-cta">زیادکردن بۆ داوای نرخ</button>
          <p className="zp-product-note">
            نرخ بە تایبەتی بۆ تۆ دیاری دەکرێت — داواکارییەکەت بنێرە و پەیوەندیت پێوە دەکەین.
          </p>
        </div>
      </div>
    </main>
  );
}