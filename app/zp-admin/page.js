"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProductsManager from "@/app/components/ProductsManager";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("requests");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      router.push("/");
      return;
    }
    setAuthed(true);
    loadRequests();
  }

  async function loadRequests() {
    const { data } = await supabase
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false });
    setRequests(data || []);
    setLoading(false);
  }

  async function deleteRequest(id) {
    if (!confirm("دڵنیایت لە سڕینەوەی ئەم داواکارییە؟")) return;
    await supabase.from("quote_requests").delete().eq("id", id);
    loadRequests();
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  function waLink(phone) {
    let n = (phone || "").replace(/\D/g, "");
    if (n.startsWith("0")) n = "964" + n.slice(1);
    return "https://wa.me/" + n;
  }

  if (loading) {
    return (
      <main className="zp-admin">
        <p className="zp-admin-loading">چاوەڕێ بکە...</p>
      </main>
    );
  }

  if (!authed) return null;

  return (
    <main className="zp-admin">
      <div className="zp-admin-head">
        <h1 className="zp-admin-title">داشبۆردی بەڕێوەبردن</h1>
        <button className="zp-admin-logout" onClick={logout}>چوونەدەرەوە</button>
      </div>

      <div className="zp-admin-tabs">
        <button
          className={`zp-admin-tab ${tab === "requests" ? "active" : ""}`}
          onClick={() => setTab("requests")}
        >
          داواکارییەکان ({requests.length})
        </button>
        <button
          className={`zp-admin-tab ${tab === "products" ? "active" : ""}`}
          onClick={() => setTab("products")}
        >
          بەرهەمەکان
        </button>
      </div>

      {tab === "requests" && (
        <>
          {requests.length === 0 ? (
            <p className="zp-admin-empty">هێشتا هیچ داواکارییەک نییە.</p>
          ) : (
            <div className="zp-admin-list">
              {requests.map((r) => (
                <div key={r.id} className="zp-req-card">
                  <div className="zp-req-header">
                    <div>
                      <h3>{r.customer_name}</h3>
                      <p className="zp-req-date">
                        {new Date(r.created_at).toLocaleString("en-GB")}
                      </p>
                    </div>
                    <button
                      className="zp-req-delete"
                      onClick={() => deleteRequest(r.id)}
                    >
                      سڕینەوە
                    </button>
                  </div>

                  <div className="zp-req-contact">
                    <span>📞 {r.customer_phone}</span>
                    <a
                      href={waLink(r.customer_phone)}
                      target="_blank"
                      rel="noreferrer"
                      className="zp-req-wa"
                    >
                      پەیوەندی بە وەتسئاپ
                    </a>
                  </div>

                  {r.note && <p className="zp-req-note">تێبینی: {r.note}</p>}

                  <table className="zp-req-table">
                    <thead>
                      <tr>
                        <th>کۆد</th>
                        <th>مۆدێل</th>
                        <th>ڕووبەر (m²)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(r.items || []).map((it, idx) => (
                        <tr key={idx}>
                          <td>{it.code}</td>
                          <td>{it.title}</td>
                          <td>{it.m2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === "products" && <ProductsManager />}
    </main>
  );
}