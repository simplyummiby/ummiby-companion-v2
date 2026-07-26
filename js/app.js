import { renderShell } from "./shell.js";
import { toggleComplete, toggleWorshipToday, setDuaaOrder, updateReadingPreferences } from "./duaa.js";
import {
  onAuthStateChange,
  restoreSession,
  sendPasswordReset,
  signInWithPassword,
  signOut,
  signUpWithPassword
} from "./auth.js";
import { initializeSupabase, getSupabaseClient } from "./supabase.js";
import { clearIdentity, initializeIdentity, loadProfile } from "./identity.js";
import { clearPreferences, loadPreferences } from "./preferences.js";

const app = document.querySelector("#app");
const toastRegion = document.querySelector("#toast-region");
let currentUser = null;
let configured = false;

function normalizedPath() {
  const path = window.location.pathname.replace(/\/index\.html$/, "");
  return path === "/" || path === "" ? "/home" : path;
}

function toast(message, type = "info") {
  const item = document.createElement("div");
  item.className = `toast${type === "error" ? " is-error" : ""}`;
  item.textContent = message;
  toastRegion.append(item);
  window.setTimeout(() => item.remove(), 4200);
}

function render() {
  const pathname = normalizedPath();
  app.innerHTML = renderShell({ pathname, user: currentUser, configured });
  bindShellEvents();
}

function navigate(route) {
  if (normalizedPath() === route) return;
  window.history.pushState({}, "", route);
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  render();
  window.scrollTo(0, 0);
  document.querySelector("#module-content")?.focus({ preventScroll: true });
}

function bindShellEvents() {
  app.querySelectorAll("[data-route]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      navigate(link.getAttribute("href"));
    });
  });

  app.querySelectorAll("[data-toggle-worship]").forEach((button) => {
    button.addEventListener("click", () => {
      const recorded = toggleWorshipToday(button.dataset.toggleWorship);
      toast(recorded ? "Recorded for today." : "Today's record removed.");
      render();
    });
  });

  app.querySelectorAll("[data-toggle-complete]").forEach((button) => {
    button.addEventListener("click", () => {
      const [collectionId, itemId] = button.dataset.toggleComplete.split(":");
      const complete = toggleComplete(collectionId, itemId);
      toast(complete ? "Duaa marked complete." : "Completion removed.");
      render();
    });
  });

  const readingDialog = app.querySelector("[data-reading-dialog]");
  app.querySelector("[data-reading-settings]")?.addEventListener("click", () => readingDialog?.showModal());
  const sizeInput = app.querySelector("[data-reading-size]");
  const sizeOutput = app.querySelector("[data-size-output]");
  sizeInput?.addEventListener("input", () => {
    const size = Number(sizeInput.value);
    if (sizeOutput) sizeOutput.textContent = `${size.toFixed(1)}rem`;
    app.querySelector(".reader-page, .quran-reader")?.style.setProperty("--reader-arabic-size", `${size}rem`);
    updateReadingPreferences({ arabicSize: size });
  });
  app.querySelector("[data-reading-transliteration]")?.addEventListener("change", (event) => {
    updateReadingPreferences({ showTransliteration: event.currentTarget.checked });
    render();
    app.querySelector("[data-reading-dialog]")?.showModal();
  });
  app.querySelector("[data-reading-english]")?.addEventListener("change", (event) => {
    updateReadingPreferences({ showEnglish: event.currentTarget.checked });
    render();
    app.querySelector("[data-reading-dialog]")?.showModal();
  });

  app.querySelectorAll("[data-collection-list]").forEach((list) => {
    let draggedId = null;
    list.querySelectorAll("[data-duaa-row]").forEach((row) => {
      const handle = row.querySelector("[data-drag-handle]");
      handle?.addEventListener("pointerdown", () => { row.draggable = true; });
      handle?.addEventListener("pointerup", () => { row.draggable = false; });
      row.addEventListener("dragstart", (event) => {
        draggedId = row.dataset.duaaRow;
        row.classList.add("is-dragging");
        event.dataTransfer.effectAllowed = "move";
      });
      row.addEventListener("dragend", () => {
        row.classList.remove("is-dragging");
        row.draggable = false;
        list.querySelectorAll(".is-drag-over").forEach(x => x.classList.remove("is-drag-over"));
      });
      row.addEventListener("dragover", (event) => {
        event.preventDefault();
        if (draggedId && draggedId !== row.dataset.duaaRow) row.classList.add("is-drag-over");
      });
      row.addEventListener("dragleave", () => row.classList.remove("is-drag-over"));
      row.addEventListener("drop", (event) => {
        event.preventDefault();
        row.classList.remove("is-drag-over");
        if (!draggedId || draggedId === row.dataset.duaaRow) return;
        const ids = [...list.querySelectorAll("[data-duaa-row]")].map(x => x.dataset.duaaRow);
        const from = ids.indexOf(draggedId);
        const to = ids.indexOf(row.dataset.duaaRow);
        ids.splice(to, 0, ids.splice(from, 1)[0]);
        if (setDuaaOrder(list.dataset.collectionList, ids)) render();
      });
    });
  });

  app.querySelector("[data-sign-out]")?.addEventListener("click", async () => {
    try {
      await signOut();
      toast("You have been signed out.");
    } catch (error) {
      toast(error.message, "error");
    }
  });
}

function authScreen(mode = "signin") {
  const titles = {
    signin: "Welcome back",
    signup: "Create your account",
    reset: "Reset your password"
  };
  const actions = {
    signin: "Sign in",
    signup: "Create account",
    reset: "Send reset email"
  };
  const passwordField = mode === "reset" ? "" : `
    <div class="form-field">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="${mode === "signup" ? "new-password" : "current-password"}" minlength="8" required />
    </div>`;

  document.documentElement.dataset.theme = "home";
  app.innerHTML = `
    <main class="auth-screen">
      <section class="auth-intro">
        <div class="brand-mark" aria-hidden="true">U</div>
        <h1>Ummiby<br />Companion</h1>
        <p>A private, personal place for Qur’an reading, duaa, study, memorization, and Ramadan reflection—with your progress available across your devices.</p>
      </section>
      <section class="auth-panel">
        <div class="auth-card">
          <p class="page-kicker">Secure account</p>
          <h2>${titles[mode]}</h2>
          <p class="page-description">Use your email and password. Your browser or Google Password Manager can offer to save the login.</p>
          <form class="form-stack" data-auth-form data-mode="${mode}">
            <div class="form-field">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" autocomplete="username" required />
            </div>
            ${passwordField}
            <button class="button button-primary" type="submit">${actions[mode]}</button>
          </form>
          <div class="auth-actions">
            ${mode !== "signin" ? '<button class="button button-link" type="button" data-auth-mode="signin">Sign in instead</button>' : '<button class="button button-link" type="button" data-auth-mode="signup">Create account</button>'}
            ${mode !== "reset" ? '<button class="button button-link" type="button" data-auth-mode="reset">Forgot password?</button>' : ""}
          </div>
        </div>
      </section>
    </main>`;

  app.querySelectorAll("[data-auth-mode]").forEach((button) => {
    button.addEventListener("click", () => authScreen(button.dataset.authMode));
  });

  app.querySelector("[data-auth-form]").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const submitButton = event.currentTarget.querySelector("button[type='submit']");
    submitButton.disabled = true;

    try {
      if (mode === "signin") await signInWithPassword(email, password);
      if (mode === "signup") {
        await signUpWithPassword(email, password);
        toast("Account created. Check your email if confirmation is enabled.");
      }
      if (mode === "reset") {
        await sendPasswordReset(email);
        toast("Password reset email sent.");
        authScreen("signin");
      }
    } catch (error) {
      toast(error.message, "error");
    } finally {
      submitButton.disabled = false;
    }
  });
}

async function loadApplicationContext(user) {
  if (!user) {
    clearIdentity();
    clearPreferences();
    return;
  }

  const client = getSupabaseClient();

  // 3. Load Profile
  const { profile, error: profileError } = await loadProfile(client, user.id);

  // 4. Load Preferences
  const { error: preferencesError } = await loadPreferences(client, user.id);

  // Profile and preference services fail soft so a temporary database issue does
  // not replace the established authenticated application with a blank screen.
  if (profileError) console.warn("Profile could not be loaded.", profileError);
  if (preferencesError) console.warn("Preferences could not be loaded.", preferencesError);

  // 5. Initialize Identity
  initializeIdentity(profile, user);
}

async function handleAuthenticatedUser(user) {
  currentUser = user;
  await loadApplicationContext(user);
  render();
}

async function start() {
  try {
    // 1. Initialize Supabase
    const supabaseState = await initializeSupabase();
    configured = supabaseState.configured;

    if (!configured) {
      // Preserve the existing local-development behavior when config.js is absent.
      render();
      return;
    }

    // 2. Restore Session
    const { user } = await restoreSession();
    currentUser = user;

    // 3. Load Profile
    // 4. Load Preferences
    // 5. Initialize Identity
    if (currentUser) await loadApplicationContext(currentUser);

    onAuthStateChange(async ({ user: changedUser }) => {
      if (changedUser) await handleAuthenticatedUser(changedUser);
      else {
        currentUser = null;
        clearIdentity();
        clearPreferences();
        authScreen("signin");
      }
    });

    // 6. Render Application
    if (currentUser) render();
    else authScreen("signin");
  } catch (error) {
    app.innerHTML = `<div class="boot-screen"><div class="boot-mark">!</div><p>Ummiby Companion could not start.</p></div>`;
    toast(error.message, "error");
  }
}

window.addEventListener("popstate", render);
start();
