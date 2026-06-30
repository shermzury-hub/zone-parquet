import { supabase } from "../../lib/supabase";
import CatalogClient from "../components/CatalogClient";

export const revalidate = 60;

export const metadata = {
  title: "کۆلێکشنەکان | زۆن پارکێت",
};

export default async function CatalogPage() {
  const { data: products } = await supabase
    .from("products_public")
    .select("*")
    .order("sort_order", { ascending: true });

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <CatalogClient products={products || []} categories={categories || []} />
  );
}