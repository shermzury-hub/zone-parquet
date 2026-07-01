import Link from "next/link";

export const metadata = {
  title: "دەربارەی ئێمە | زۆن پارکێت",
  description: "زۆن پارکێت — جوانی و شکۆمەندی بۆ هەر ماڵێک.",
};

export default function AboutPage() {
  return (
    <main className="zp-about">
      <section className="zp-about-hero">
        <p className="zp-about-eyebrow">دەربارەی زۆن پارکێت</p>
        <h1 className="zp-about-title">جوانی، لەژێر هەر هەنگاوێکت</h1>
        <p className="zp-about-lead">
          لە زۆن پارکێت، بڕوامان وایە ماڵەکەت شایانی باشترینە. بۆیە باشترین جۆرەکانی
          پارکێتمان بۆ تۆ کۆکردووەتەوە — بە دیزاینی نوێ، جۆری بەرز، و گەیاندن بۆ هەموو شوێنێک.
        </p>
      </section>

      <section className="zp-about-section">
        <h2>چیرۆکی ئێمە</h2>
        <p>
          زۆن پارکێت لەسەر بیرۆکەیەکی سادە بنیاتنراوە: شکۆمەندی پێویست ناکات ئاڵۆز بێت.
          ئێمە بازرگانییەکی ئۆنلاینین کە تایبەتە بە پارکێتی لوکس. ئەم شێوازە وا دەکات
          باشترین نرخ و خزمەتگوزاریت پێشکەش بکەین، ڕاستەوخۆ بۆ ماڵەکەت، بەبێ ناوبژیوانی زیادە.
        </p>
      </section>

      <section className="zp-about-section">
        <h2>بۆچی زۆن پارکێت؟</h2>
        <div className="zp-about-values">
          <div className="zp-value-card">
            <h3>١١٤ مۆدێلی هەڵبژێردراو</h3>
            <p>کۆمەڵەیەکی فراوان لە ڕەنگ، ستایل، و ئەستووریی جیاواز — بۆ هەموو ماڵ و سەلیقەیەک.</p>
          </div>
          <div className="zp-value-card">
            <h3>گەیاندن بۆ هەموو شوێنێک</h3>
            <p>هیچ سنوورێکی جوگرافی نییە. بۆ هەموو ناوچەکان گەیاندنت بۆ دەکەین.</p>
          </div>
          <div className="zp-value-card">
            <h3>جۆری بەرز و بەهێز</h3>
            <p>مۆدێلەکانمان دژە ئاو و دژە خوورانن، دروستکراون بۆ ساڵانی درێژ.</p>
          </div>
          <div className="zp-value-card">
            <h3>خزمەتگوزاریی تایبەت بە تۆ</h3>
            <p>نرخ بەگوێرەی پڕۆژەکەت دیاری دەکەین و لە هەر هەنگاوێک ڕێنماییت دەکەین.</p>
          </div>
        </div>
      </section>

      <section className="zp-about-cta">
        <h2>ئامادەیت ماڵەکەت نوێ بکەیتەوە؟</h2>
        <p>کۆلێکشنەکانمان بگەڕێ و ئەو مۆدێلە بدۆزەرەوە کە لەگەڵ خەونەکەت دەگونجێت.</p>
        <Link href="/catalog" className="zp-product-cta">بینینی کۆلێکشنەکان</Link>
      </section>
    </main>
  );
}