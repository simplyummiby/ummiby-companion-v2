import { getSupabaseClient, isSupabaseConfigured } from "./supabase.js";

function requireClient() {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase is not configured.");
  return client;
}

export async function restoreSession() {
  if (!isSupabaseConfigured()) return { session: null, user: null };
  const { data, error } = await requireClient().auth.getSession();
  if (error) throw error;
  return { session: data.session ?? null, user: data.session?.user ?? null };
}

export function onAuthStateChange(callback) {
  const client = getSupabaseClient();
  if (!client) return () => {};
  const { data } = client.auth.onAuthStateChange((event, session) => {
    callback({ event, session: session ?? null, user: session?.user ?? null });
  });
  return () => data.subscription.unsubscribe();
}

export async function signInWithPassword(email, password) {
  const { data, error } = await requireClient().auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
}

export async function signUpWithPassword(email, password) {
  const { data, error } = await requireClient().auth.signUp({ email, password });
  if (error) throw error;
  return data.user;
}

export async function sendPasswordReset(email) {
  const redirectTo = `${window.location.origin}${window.location.pathname}`;
  const { error } = await requireClient().auth.resetPasswordForEmail(email, { redirectTo });
  if (error) throw error;
}

export async function signOut() {
  const client = getSupabaseClient();
  if (!client) return;
  const { error } = await client.auth.signOut();
  if (error) throw error;
}
