import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
}

export async function signInWithPassword(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  return { session: data?.session, error };
}

// The exact value below must be allowlisted in the Supabase dashboard under
// Auth → URL Configuration → Redirect URLs, otherwise the reset email link
// will return an "invalid redirect" error.
// For local dev that means: http://localhost:3000/reset-password.html
export const PASSWORD_RESET_REDIRECT = `${window.location.origin}/reset-password.html`;

export async function resetPasswordForEmail(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: PASSWORD_RESET_REDIRECT,
  });
  return { data, error };
}

export async function updateUser(newPassword) {
  const { data, error } = await supabase.auth.updateUser({ password: newPassword });
  return { data, error };
}

export async function autocompleteCharacters(prefix) {
  const { data, error } = await supabase
    .from('characters')
    .select('name')
    .ilike('name', `${prefix}%`)
    .order('name')
    .limit(10);
  if (error) throw new Error(error.message);
  return data;
}

export async function searchCharacters(name) {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .ilike('name', `%${name}%`)
    .order('name')
    .limit(10);
  if (error) throw new Error(error.message);
  return data;
}
