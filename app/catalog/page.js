import { supabase } from "../../lib/supabase";
import CatalogClient from "../components/CatalogClient";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CatalogPage() {
  const { data: products, error: errorProducts } = await supabase
    .from("products_public")
    .select("*")
    .order("sort_order", { ascending: true });

  const { data: categories, error: errorCategories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  console.log("====================================");
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Products Error:", errorProducts);
  console.log("Products Length:", products ? products.length : 0);
  console.log("====================================");

  return (
    <CatalogClient products={products || []} categories={categories || []} />
  );
}