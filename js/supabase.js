const SUPABASE_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

let client = null;
let configured = false;

function hasValidConfig(config) {
  return Boolean(
    config?.SUPABASE_URL &&
    config?.SUPABASE_PUBLISHABLE_KEY &&
    !config.SUPABASE_URL.includes("YOUR-PROJECT") &&
    !config.SUPABASE_PUBLISHABLE_KEY.includes("YOUR-")
  );
}

export async function initializeSupabase() {
  if (client) return { client, configured: true };

  try {
    const config = await import("./config.js");
    if (!hasValidConfig(config)) return { client: null, configured: false };

    const { createClient } = await import(SUPABASE_CDN);
    client = createClient(config.SUPABASE_URL, config.SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    configured = true;
    return { client, configured };
  } catch (error) {
    if (String(error?.message || error).includes("config.js")) {
      return { client: null, configured: false };
    }
    throw error;
  }
}

export function getSupabaseClient() {
  return client;
}

export function isSupabaseConfigured() {
  return configured;
}
