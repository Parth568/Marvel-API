import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    "Supabase env vars missing. Set SUPABASE_URL and SUPABASE_ANON_KEY in .env"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

supabase
  .from("characters")
  .select("id", { count: "exact", head: true })
  .then(({ error, count }) => {
    if (error) {
      console.error("Supabase probe failed:", error.message);
    } else {
      console.log(`Supabase connected to ${SUPABASE_URL} (characters rows: ${count ?? "?"})`);
    }
  });

export default supabase;
