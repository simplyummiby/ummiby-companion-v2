const DEFAULT_PREFERENCES = Object.freeze({});
let currentPreferences = DEFAULT_PREFERENCES;

export function clearPreferences() {
  currentPreferences = DEFAULT_PREFERENCES;
}

export function getPreferences() {
  return currentPreferences;
}

export async function loadPreferences(supabaseClient, userId) {
  if (!supabaseClient || !userId) {
    clearPreferences();
    return { preferences: currentPreferences, error: null };
  }

  const { data, error } = await supabaseClient
    .from("app_preferences")
    .select("preferences")
    .eq("user_id", userId)
    .single();

  if (error) {
    clearPreferences();
    return { preferences: currentPreferences, error };
  }

  currentPreferences = Object.freeze({
    ...DEFAULT_PREFERENCES,
    ...(data?.preferences && typeof data.preferences === "object" ? data.preferences : {})
  });
  return { preferences: currentPreferences, error: null };
}

export async function savePreferences(supabaseClient, userId, changes = {}) {
  if (!supabaseClient || !userId) throw new Error("A signed-in user is required to save preferences.");

  const next = { ...currentPreferences, ...changes };
  const { data, error } = await supabaseClient
    .from("app_preferences")
    .upsert({ user_id: userId, preferences: next }, { onConflict: "user_id" })
    .select("preferences")
    .single();

  if (error) throw error;
  currentPreferences = Object.freeze({ ...(data?.preferences ?? next) });
  return currentPreferences;
}
