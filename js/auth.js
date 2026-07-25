const SUPABASE_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

let client = null;
let configured = false;

export async function initializeAuth() {
  try {
    const config = await import("./config.js");
    const valid = config.SUPABASE_URL && config.SUPABASE_PUBLISHABLE_KEY && !config.SUPABASE_URL.includes("YOUR-PROJECT") && !config.SUPABASE_PUBLISHABLE_KEY.includes("YOUR-");
    if (!valid) return { configured: false, user: null };

    const { createClient } = await import(SUPABASE_CDN);
    client = createClient(config.SUPABASE_URL, config.SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    configured = true;
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    return { configured: true, user: data.session?.user ?? null };
  } catch (error) {
    if (String(error?.message || error).includes("config.js")) {
      return { configured: false, user: null };
    }
    throw error;
  }
}

export function isConfigured() {
  return configured;
}

export function onAuthStateChange(callback) {
  if (!client) return () => {};
  const { data } = client.auth.onAuthStateChange((_event, session) => callback(session?.user ?? null));
  return () => data.subscription.unsubscribe();
}

export async function signInWithPassword(email, password) {
  if (!client) throw new Error("Supabase is not configured.");
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
}

export async function signUpWithPassword(email, password) {
  if (!client) throw new Error("Supabase is not configured.");
  const { data, error } = await client.auth.signUp({ email, password });
  if (error) throw error;
  return data.user;
}

export async function sendPasswordReset(email) {
  if (!client) throw new Error("Supabase is not configured.");
  const redirectTo = `${window.location.origin}${window.location.pathname}`;
  const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) throw error;
}

export async function signOut() {
  if (!client) return;
  const { error } = await client.auth.signOut();
  if (error) throw error;
}
