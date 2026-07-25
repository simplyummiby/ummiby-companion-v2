import { renderShell } from "./shell.js";
import {
  initializeAuth,
  isConfigured,
  onAuthStateChange,
  sendPasswordReset,
  signInWithPassword,
  signOut,
  signUpWithPassword
} from "./auth.js";

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
  render();
  document.querySelector("#module-content")?.focus();
}

function bindShellEvents() {
  app.querySelectorAll("[data-route]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      navigate(link.getAttribute("href"));
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

async function start() {
  try {
    const state = await initializeAuth();
    configured = state.configured;
    currentUser = state.user;

    if (!configured) {
      render();
      return;
    }

    onAuthStateChange((user) => {
      currentUser = user;
      if (user) render();
      else authScreen("signin");
    });

    if (currentUser) render();
    else authScreen("signin");
  } catch (error) {
    app.innerHTML = `<div class="boot-screen"><div class="boot-mark">!</div><p>Ummiby Companion could not start.</p></div>`;
    toast(error.message, "error");
  }
}

window.addEventListener("popstate", render);
start();
