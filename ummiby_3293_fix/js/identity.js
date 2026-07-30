const EMPTY_IDENTITY = Object.freeze({
  userId: null,
  email: null,
  fullName: null,
  role: null,
  isActive: false
});

let currentIdentity = EMPTY_IDENTITY;
let currentProfile = null;

export function clearIdentity() {
  currentIdentity = EMPTY_IDENTITY;
  currentProfile = null;
}

export function getIdentity() {
  return currentIdentity;
}

export function getProfile() {
  return currentProfile;
}

export function isSuperAdmin() {
  return currentIdentity.role === "super_admin" && currentIdentity.isActive;
}

export async function loadProfile(supabaseClient, userId) {
  if (!supabaseClient || !userId) return { profile: null, error: null };

  const { data, error } = await supabaseClient
    .from("profiles")
    .select("user_id,email,display_name,full_name,role,is_active")
    .eq("user_id", userId)
    .single();

  if (error) return { profile: null, error };
  return { profile: data, error: null };
}

export function initializeIdentity(profile, fallbackUser = null) {
  if (!profile?.user_id) {
    if (!fallbackUser?.id) {
      clearIdentity();
      return currentIdentity;
    }
    currentProfile = null;
    currentIdentity = Object.freeze({
      userId: fallbackUser.id,
      email: fallbackUser.email ?? null,
      fullName: null,
      role: null,
      isActive: true
    });
    return currentIdentity;
  }

  currentProfile = Object.freeze({ ...profile });
  currentIdentity = Object.freeze({
    userId: profile.user_id,
    email: profile.email ?? fallbackUser?.email ?? null,
    fullName: profile.full_name ?? profile.display_name ?? null,
    role: profile.role ?? null,
    isActive: profile.is_active === true
  });
  return currentIdentity;
}
