"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const EMPTY = {
  code: "",
  category_id: "",
  thickness: "8mm",
  title_ku: "", title_en: "", title_ar: "",
  description_ku: "", description_en: "", description_ar: "",
  features_ku: "", features_en: "", features_ar: "",
  is_waterproof: false, is_fireproof: false, is_soundproof: false,
  is_scratch_resistant: false, is_eco_friendly: false,
  base_price: "",
  image_url: "",
  is_published: true,
};

export default function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    const { data: prods } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });
    const { data: cats } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });
    setProducts(prods || []);
    setCategories(cats || []);
    setLoading(false);
  }

  function catName(id) {
    const c = categories.find((x) => x.id === id);
    return c ? c.name_ku : "—";
  }

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY);
    setError("");
    setShowForm(true);
  }

  function openEdit(p) {
    setEditingId(p.id);
    setForm({
      code: p.code || "",
      category_id: p.category_id || "",
      thickness: p.thickness || "8mm",
      title_ku: p.title_ku || "", title_en: p.title_en || "", title_ar: p.title_ar || "",
      description_ku: p.description_ku || "", description_en: p.description_en || "", description_ar: p.description_ar || "",
      features_ku: (p.features_ku || []).join("، "),
      features_en: (p.features_en || []).join(", "),
      features_ar: (p.features_ar || []).join("، "),
      is_waterproof: !!p.is_waterproof, is_fireproof: !!p.is_fireproof, is_soundproof: !!p.is_soundproof,
      is_scratch_resistant: !!p.is_scratch_resistant, is_eco_friendly: !!p.is_eco_friendly,
      base_price: p.base_price ?? "",
      image_url: p.image_url || "",
      is_published: p.is_published !== false,
    });
    setError("");
    setShowForm(true);
  }

  function toArray(str) {
    return (str || "")
      .split(/[,،]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  async function save() {
    setError("");
    if (!form.code.trim() || !form.title_ku.trim()) {
      setError("کۆد و ناونیشانی کوردی پێویستن.");
      return;
    }
    setSaving(true);

    const payload = {
      code: form.code.trim(),
      category_id: form.category_id || null,
      thickness: form.thickness,
      title_ku: form.title_ku,
      title_en: form.title_en,
      title_ar: form.title_ar,
      description_ku: form.description_ku,
      description_en: form.description_en,
      description_ar: form.description_ar,
      features_ku: toArray(form.features_ku),
      features_en: toArray(form.features_en),
      features_ar: toArray(form.features_ar),
      is_waterproof: form.is_waterproof,
      is_fireproof: form.is_fireproof,
      is_soundproof: form.is_soundproof,
      is_scratch_resistant: form.is_scratch_resistant,
      is_eco_friendly: form.is_eco_friendly,
      base_price: form.base_price === "" ? 0 : Number(form.base_price),
      image_url: form.image_url || null,
      is_published: form.is_published,
    };

    let result;
    if (editingId) {
      result = await supabase.from("products").update(payload).eq("id", editingId);
    } else {
      result = await supabase.from("products").insert(payload);
    }

    setSaving(false);

    if (result.error) {
      setError("هەڵە: " + result.error.message);
    } else {
      setShowForm(false);
      loadAll();
    }
  }

  async function remove(p) {
    if (!confirm(`دڵنیایت لە سڕینەوەی «${p.title_ku}»؟`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) {
      alert("هەڵە لە سڕینەوە: " + error.message);
    } else {
      loadAll();
    }
  }

  if (loading) {
    return <p className="zp-admin-loading">بەرهەمەکان دەهێنرێن...</p>;
  }

  return (
    <div>
      <div className="zp-pm-head">
        <p className="zp-pm-count">{products.length} بەرهەم</p>
        <button className="zp-pm-add" onClick={openAdd}>+ زیادکردنی بەرهەم</button>
      </div>

      <div className="zp-pm-table-wrap">
        <table className="zp-pm-table">
          <thead>
            <tr>
              <th>وێنە</th>
              <th>کۆد</th>
              <th>ناونیشان</th>
              <th>کۆلێکشن</th>
              <th>ئەستووری</th>
              <th>نرخی بنەڕەتی</th>
              <th>دۆخ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.image_url ? (
                    <img src={p.image_url} alt="" className="zp-pm-thumb" />
                  ) : (
                    <div className="zp-pm-thumb zp-pm-thumb-empty" />
                  )}
                </td>
                <td>{p.code}</td>
                <td>{p.title_ku}</td>
                <td>{catName(p.category_id)}</td>
                <td>{p.thickness}</td>
                <td>{p.base_price}</td>
                <td>
                  {p.is_published ? (
                    <span className="zp-badge zp-badge-on">بڵاوکراوە</span>
                  ) : (
                    <span className="zp-badge zp-badge-off">شاراوە</span>
                  )}
                </td>
                <td className="zp-pm-actions">
                  <button className="zp-pm-edit" onClick={() => openEdit(p)}>دەستکاری</button>
                  <button className="zp-pm-del" onClick={() => remove(p)}>سڕینەوە</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="zp-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="zp-pm-modal" onClick={(e) => e.stopPropagation()}>
            <button className="zp-modal-close" onClick={() => setShowForm(false)}>✕</button>
            <h2 className="zp-modal-title">
              {editingId ? "دەستکاریی بەرهەم" : "زیادکردنی بەرهەمی نوێ"}
            </h2>

            <div className="zp-pm-row">
              <div className="zp-pm-field">
                <label>کۆد *</label>
                <input value={form.code} onChange={(e) => set("code", e.target.value)} placeholder="ESS-013" />
              </div>
              <div className="zp-pm-field">
                <label>کۆلێکشن</label>
                <select value={form.category_id} onChange={(e) => set("category_id", e.target.value)}>
                  <option value="">— هەڵبژێرە —</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name_ku}</option>
                  ))}
                </select>
              </div>
              <div className="zp-pm-field">
                <label>ئەستووری</label>
                <select value={form.thickness} onChange={(e) => set("thickness", e.target.value)}>
                  <option value="8mm">8mm</option>
                  <option value="10mm">10mm</option>
                  <option value="12mm">12mm</option>
                </select>
              </div>
            </div>

            <h3 className="zp-pm-section">ناونیشان</h3>
            <div className="zp-pm-row">
              <div className="zp-pm-field">
                <label>کوردی *</label>
                <input value={form.title_ku} onChange={(e) => set("title_ku", e.target.value)} />
              </div>
              <div className="zp-pm-field">
                <label>ئینگلیزی</label>
                <input className="font-en" value={form.title_en} onChange={(e) => set("title_en", e.target.value)} />
              </div>
              <div className="zp-pm-field">
                <label>عەرەبی</label>
                <input value={form.title_ar} onChange={(e) => set("title_ar", e.target.value)} />
              </div>
            </div>

            <h3 className="zp-pm-section">وەسف</h3>
            <div className="zp-pm-row">
              <div className="zp-pm-field">
                <label>کوردی</label>
                <textarea rows="2" value={form.description_ku} onChange={(e) => set("description_ku", e.target.value)} />
              </div>
              <div className="zp-pm-field">
                <label>ئینگلیزی</label>
                <textarea className="font-en" rows="2" value={form.description_en} onChange={(e) => set("description_en", e.target.value)} />
              </div>
              <div className="zp-pm-field">
                <label>عەرەبی</label>
                <textarea rows="2" value={form.description_ar} onChange={(e) => set("description_ar", e.target.value)} />
              </div>
            </div>

            <h3 className="zp-pm-section">تاگەکانی تایبەتمەندی (بە کۆما جیابکەرەوە)</h3>
            <div className="zp-pm-row">
              <div className="zp-pm-field">
                <label>کوردی</label>
                <input value={form.features_ku} onChange={(e) => set("features_ku", e.target.value)} placeholder="ڕەنگی سروشتی، گەرم" />
              </div>
              <div className="zp-pm-field">
                <label>ئینگلیزی</label>
                <input className="font-en" value={form.features_en} onChange={(e) => set("features_en", e.target.value)} placeholder="Natural tone, Warm" />
              </div>
              <div className="zp-pm-field">
                <label>عەرەبی</label>
                <input value={form.features_ar} onChange={(e) => set("features_ar", e.target.value)} placeholder="لون طبيعي، دافئ" />
              </div>
            </div>

            <h3 className="zp-pm-section">تایبەتمەندییەکان</h3>
            <div className="zp-pm-checks">
              <label><input type="checkbox" checked={form.is_waterproof} onChange={(e) => set("is_waterproof", e.target.checked)} /> دژە ئاو</label>
              <label><input type="checkbox" checked={form.is_fireproof} onChange={(e) => set("is_fireproof", e.target.checked)} /> دژە ئاگر</label>
              <label><input type="checkbox" checked={form.is_soundproof} onChange={(e) => set("is_soundproof", e.target.checked)} /> دژە دەنگ</label>
              <label><input type="checkbox" checked={form.is_scratch_resistant} onChange={(e) => set("is_scratch_resistant", e.target.checked)} /> دژە خوران</label>
              <label><input type="checkbox" checked={form.is_eco_friendly} onChange={(e) => set("is_eco_friendly", e.target.checked)} /> دۆستی ژینگە</label>
            </div>

            <div className="zp-pm-row">
              <div className="zp-pm-field">
                <label>💰 نرخی بنەڕەتی (تەنها بۆ تۆ — شاراوەیە لە کڕیار)</label>
                <input type="number" value={form.base_price} onChange={(e) => set("base_price", e.target.value)} placeholder="0.00" />
              </div>
              <div className="zp-pm-field zp-pm-field-wide">
                <label>لینکی وێنە (URL)</label>
                <input value={form.image_url} onChange={(e) => set("image_url", e.target.value)} placeholder="https://..." />
              </div>
            </div>

            <label className="zp-pm-publish">
              <input type="checkbox" checked={form.is_published} onChange={(e) => set("is_published", e.target.checked)} />
              بڵاوکراوە لەسەر ماڵپەڕ (ئەگەر نیشانە نەکرێت، کڕیار نایبینێت)
            </label>

            {error && <p className="zp-modal-error">{error}</p>}

            <div className="zp-pm-form-actions">
              <button className="zp-pm-cancel" onClick={() => setShowForm(false)}>پاشگەزبوونەوە</button>
              <button className="zp-product-cta" onClick={save} disabled={saving}>
                {saving ? "..." : editingId ? "نوێکردنەوە" : "زیادکردن"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}