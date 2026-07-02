import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProductClient from "@/app/components/ProductClient";

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

  return <ProductClient product={product} />;
}