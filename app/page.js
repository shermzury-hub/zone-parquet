import { supabase } from "@/lib/supabase";
import HomeClient from "@/app/components/HomeClient";

export const revalidate = 60;

export default async function Home() {
  const { data: featured } = await supabase
    .from("products_public")
    .select("*")
    .order("sort_order", { ascending: true })
    .limit(3);

  return <HomeClient products={featured || []} />;
}