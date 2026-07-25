import { modules, sidebarOrder, moduleForPath } from "./modules.js";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sidebar(activeModule) {
  return `
    <nav class="sidebar-nav" aria-label="Primary navigation">
      ${sidebarOrder
        .map((moduleId) => {
          const item = modules[moduleId];
          const active = item.id === activeModule.id;
          const route = item.navigation[0].route;
          return `
            <a class="sidebar-link${active ? " is-active" : ""}" href="${route}" data-route>
              ${item.icon}
              <span>${escapeHtml(item.shortLabel)}</span>
            </a>`;
        })
        .join("")}
    </nav>`;
}

function moduleNav(activeModule, pathname) {
  return `
    <nav class="module-nav-bar" aria-label="${escapeHtml(activeModule.label)} navigation">
      ${activeModule.navigation
        .map((item) => {
          const active = item.route === pathname || (item.route !== "/home" && pathname === `${item.route}/`);
          return `<a class="module-nav-link${active ? " is-active" : ""}" href="${item.route}" data-route>${escapeHtml(item.label)}</a>`;
        })
        .join("")}
    </nav>`;
}

function placeholderCards(activeModule) {
  if (activeModule.id === "home") {
    return sidebarOrder
      .filter((id) => !["home", "settings"].includes(id))
      .map((id) => {
        const item = modules[id];
        return `
          <article class="card">
            <span class="status-pill">Foundation registered</span>
            <h2>${escapeHtml(item.label)}</h2>
            <p>${escapeHtml(item.description)}</p>
            <a href="${item.navigation[0].route}" data-route>Open ${escapeHtml(item.label)}</a>
          </article>`;
      })
      .join("");
  }

  return `
    <article class="card">
      <span class="status-pill">v2.0.0 foundation</span>
      <h2>Module shell is ready</h2>
      <p>This destination is intentionally a placeholder. The shared shell, routing, theme, and online-data conventions are established before the feature itself is migrated.</p>
    </article>
    <article class="card">
      <h2>What stays shared</h2>
      <p>The Brand Panel, Module Banner, App Sidebar, Module Workspace, Module Nav Bar, authentication boundary, loading states, and data services are owned by the application—not duplicated inside this module.</p>
    </article>`;
}

function viewName(activeModule, pathname) {
  const exact = activeModule.navigation.find((item) => item.route === pathname);
  if (exact) return exact.label;
  return activeModule.navigation[0].label;
}

export function renderShell({ pathname = "/home", user = null, configured = false } = {}) {
  const activeModule = moduleForPath(pathname);
  const currentView = viewName(activeModule, pathname);
  document.documentElement.dataset.theme = activeModule.theme;
  document.title = `${currentView} | Ummiby Companion`;

  return `
    <div class="app-shell">
      <header class="brand-panel">
        <div class="brand-lockup">
          <div class="brand-mark" aria-hidden="true">U</div>
          <p class="brand-name">Ummiby<br />Companion</p>
        </div>
      </header>

      <section class="module-banner" aria-labelledby="module-banner-title">
        <div class="banner-copy">
          <p class="banner-eyebrow">${escapeHtml(activeModule.bannerEyebrow)}</p>
          <h1 class="banner-title" id="module-banner-title">${escapeHtml(activeModule.bannerTitle)}</h1>
        </div>
      </section>

      <aside class="app-sidebar">
        ${sidebar(activeModule)}
      </aside>

      <main class="module-workspace">
        ${moduleNav(activeModule, pathname)}
        <section class="module-content" id="module-content" tabindex="-1">
          ${!configured ? '<div class="config-notice"><strong>Supabase setup needed:</strong> copy <code>js/config.example.js</code> to <code>js/config.js</code> and enter the project URL and publishable key. The shell remains visible so layout work can continue safely before credentials are added.</div>' : ""}
          ${user ? `<div class="user-strip"><p>Signed in as <strong>${escapeHtml(user.email || "your account")}</strong></p><button class="button button-secondary" type="button" data-sign-out>Sign out</button></div>` : ""}
          <header class="page-header">
            <p class="page-kicker">${escapeHtml(activeModule.label)}</p>
            <h2 class="page-title">${escapeHtml(currentView)}</h2>
            <p class="page-description">${escapeHtml(activeModule.description)}</p>
          </header>
          <div class="card-grid">
            ${placeholderCards(activeModule)}
          </div>
        </section>
      </main>
    </div>`;
}
