import { QURAN_CANONICAL_STATUS } from "./data/quran-canonical.js?v=3.12.0";
import { renderShell, saveActiveJourney } from "./shell.js?v=3.12.0";
import { toggleComplete, toggleMemorized, toggleWorshipToday, setDuaaOrder, updateReadingPreferences } from "./duaa.js?v=3.12.0";
import {
  onAuthStateChange,
  restoreSession,
  sendPasswordReset,
  signInWithPassword,
  signOut,
  signUpWithPassword
} from "./auth.js?v=3.12.0";
import { initializeSupabase, getSupabaseClient } from "./supabase.js?v=3.12.0";
import { clearIdentity, getIdentity, initializeIdentity, loadProfile } from "./identity.js?v=3.12.0";
import { clearPreferences, loadPreferences } from "./preferences.js?v=3.12.0";

const app = document.querySelector("#app");
console.info("Canonical Qur’an data verified", QURAN_CANONICAL_STATUS);
const toastRegion = document.querySelector("#toast-region");
let currentUser = null;
let configured = false;
const nowForHistory = new Date();
let historyView = { collectionId:'morning', year:nowForHistory.getFullYear(), month:nowForHistory.getMonth() };

const collectionFilterKey = (collectionId) => `ummiby.collectionFilters.${collectionId}`;
const collectionScrollKey = (collectionId) => `ummiby.collectionScroll.${collectionId}`;
const collectionReadingSequenceKey = (collectionId) => `ummiby.collectionReadingSequence.${collectionId}`;
function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
function readCollectionFilterState(collectionId) {
  try {
    const value = JSON.parse(sessionStorage.getItem(collectionFilterKey(collectionId)) || '{}');
    return { speakers: new Set(value.speakers || []), purposes: new Set(value.purposes || []) };
  } catch { return { speakers: new Set(), purposes: new Set() }; }
}
function saveCollectionFilterState(collectionId, state) {
  sessionStorage.setItem(collectionFilterKey(collectionId), JSON.stringify({ speakers:[...state.speakers], purposes:[...state.purposes] }));
}

function normalizedPath() {
  const hashRoute = window.location.hash.replace(/^#/, "");
  if (!hashRoute || hashRoute === "/") return "/home";

  const route = hashRoute.startsWith("/") ? hashRoute : `/${hashRoute}`;
  return route.length > 1 ? route.replace(/\/+$/, "") : route;
}

function prepareRouteLinks() {
  app.querySelectorAll("[data-route]").forEach((link) => {
    const route = link.getAttribute("href") || "/home";
    link.dataset.appRoute = route;
    link.setAttribute("href", `#${route}`);
  });
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
  app.innerHTML = renderShell({ pathname, user: currentUser, identity: getIdentity(), configured, historyView });
  prepareRouteLinks();
  bindShellEvents();
}

function navigate(route) {
  if (normalizedPath() === route) return;
  window.location.hash = route;
}

function recordQuranReading(source='inside') {
  const key = localDateKey();
  let records = {};
  try { records = JSON.parse(localStorage.getItem('ummiby.quran.readingDays') || '{}'); } catch {}
  records[key] = source;
  localStorage.setItem('ummiby.quran.readingDays', JSON.stringify(records));
}

function recordReadingUnitActivity(type, unitOrder, details = {}) {
  const order = Number(unitOrder);
  if (!Number.isInteger(order) || order < 1 || order > QURAN_CANONICAL_STATUS.readingUnits) return;
  let entries = [];
  try { entries = JSON.parse(localStorage.getItem('ummiby.quran.readingUnit.history') || '[]'); } catch {}
  const now = new Date();
  const dateKey = localDateKey(now);
  if (type === 'opened' && entries.some(entry => entry.type === 'opened' && entry.unitOrder === order && entry.dateKey === dateKey)) return;
  entries.unshift({ id: `${now.getTime()}-${type}-${order}`, type, unitOrder: order, dateKey, at: now.toISOString(), ...details });
  localStorage.setItem('ummiby.quran.readingUnit.history', JSON.stringify(entries.slice(0, 250)));
}

function bindShellEvents() {
  app.querySelectorAll("[data-route]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const currentPath = normalizedPath();
      const targetRoute = link.dataset.appRoute || "/home";
      if (currentPath === '/duaa/quranic' && targetRoute.startsWith('/duaa/quranic/read/')) {
        sessionStorage.setItem(collectionScrollKey('quranic'), String(window.scrollY));
      }
      navigate(targetRoute);
    });
  });

  app.querySelectorAll('[data-history-collection]').forEach(button => {
    button.addEventListener('click', () => {
      historyView = { ...historyView, collectionId:button.dataset.historyCollection };
      render();
    });
  });
  app.querySelectorAll('[data-history-month]').forEach(button => {
    button.addEventListener('click', () => {
      const date=new Date(historyView.year,historyView.month+Number(button.dataset.historyMonth),1);
      historyView={...historyView,year:date.getFullYear(),month:date.getMonth()};
      render();
    });
  });
  app.querySelectorAll('[data-history-year]').forEach(select => {
    select.addEventListener('change', () => {
      const year=Number(select.value);
      if(!Number.isInteger(year)) return;
      historyView={...historyView,year};
      render();
    });
  });


  if (app.querySelector('[data-quran-reading-inside]')) recordQuranReading('inside');


  app.querySelectorAll('[data-open-active-journey]').forEach(button => {
    button.addEventListener('click', () => app.querySelector(`#make-active-${button.dataset.openActiveJourney}`)?.showModal());
  });
  app.querySelectorAll('[data-confirm-active-journey]').forEach(button => {
    button.addEventListener('click', () => {
      const changed = saveActiveJourney(button.dataset.confirmActiveJourney);
      if (changed) toast(`${button.dataset.confirmActiveJourney === 'classic' ? 'Classic Journey' : 'Reading Unit Journey'} is now your Active Reading Journey.`);
      app.querySelector('[data-active-journey-dialog][open]')?.close();
      render();
    });
  });


  const companionDisclosure = app.querySelector('.reader-companion-disclosure');
  if (companionDisclosure) {
    const mobileCompanion = window.matchMedia('(max-width: 980px)').matches;
    companionDisclosure.open = !mobileCompanion;
  }

  const activeReadingUnit = Number(app.querySelector('[data-reading-unit-reader]')?.dataset.readingUnit || 0);
  if (activeReadingUnit) recordReadingUnitActivity('opened', activeReadingUnit);
  let selectedResumeAyah = Number(app.querySelector('.reader-ayah.is-saved-place')?.dataset.readerAyah || 0);
  app.querySelectorAll('[data-select-resume-ayah]').forEach(button => {
    button.addEventListener('click', () => {
      selectedResumeAyah = Number(button.dataset.selectResumeAyah);
      app.querySelectorAll('.reader-ayah').forEach(row => row.classList.toggle('is-selected-place', Number(row.dataset.readerAyah) === selectedResumeAyah));
      toast(`Ayah ${selectedResumeAyah} selected. Choose Save My Place when ready.`);
    });
  });
  app.querySelector('[data-save-reading-place]')?.addEventListener('click', () => {
    if (!selectedResumeAyah) { toast('Choose the ayah where you want to resume first.', 'error'); return; }
    let progress = {};
    try { progress = JSON.parse(localStorage.getItem(`ummiby.quran.readingUnit.${activeReadingUnit}`) || '{}'); } catch {}
    progress.resumeAyah = selectedResumeAyah;
    progress.updatedAt = new Date().toISOString();
    localStorage.setItem(`ummiby.quran.readingUnit.${activeReadingUnit}`, JSON.stringify(progress));
    localStorage.setItem('ummiby.quran.readingUnit.current', String(activeReadingUnit));
    recordReadingUnitActivity('saved', activeReadingUnit, { ayah: selectedResumeAyah });
    toast(`Place saved. You’ll resume at Ayah ${selectedResumeAyah}.`);
    render();
  });
  app.querySelector('[data-resume-saved-ayah]')?.addEventListener('click', button => {
    document.querySelector(`#ayah-${button.dataset.resumeSurah}-${button.dataset.resumeSavedAyah}`)?.scrollIntoView({ behavior:'smooth', block:'center' });
  });
  app.querySelector('[data-complete-reading-unit]')?.addEventListener('click', button => {
    let progress = {};
    try { progress = JSON.parse(localStorage.getItem(`ummiby.quran.readingUnit.${activeReadingUnit}`) || '{}'); } catch {}
    progress.completed = !progress.completed;
    progress.completedAt = progress.completed ? new Date().toISOString() : null;
    localStorage.setItem(`ummiby.quran.readingUnit.${activeReadingUnit}`, JSON.stringify(progress));
    localStorage.setItem('ummiby.quran.readingUnit.current', String(activeReadingUnit));
    if(progress.completed && activeReadingUnit < QURAN_CANONICAL_STATUS.readingUnits)localStorage.setItem('ummiby.quran.readingUnit.current', String(activeReadingUnit + 1));
    else localStorage.setItem('ummiby.quran.readingUnit.current', String(activeReadingUnit));
    recordReadingUnitActivity(progress.completed ? 'completed' : 'reopened', activeReadingUnit);
    toast(progress.completed ? `Reading Unit ${activeReadingUnit} marked complete.` : 'Reading Unit completion removed.');
    render();
  });
  app.querySelectorAll('[data-reader-placeholder]').forEach(control => control.addEventListener('click', event => {
    event.preventDefault();
    toast('This control is ready for the full Qur’an data and navigation phase.');
  }));

  const unitSearch = app.querySelector('[data-unit-search]');
  const unitFilterButtons = [...app.querySelectorAll('[data-unit-filter]')];
  const unitRows = [...app.querySelectorAll('[data-unit-index-row]')];
  const unitGroups = [...app.querySelectorAll('[data-unit-index-group]')];
  let unitFilter = 'all';
  const applyUnitFilters = () => {
    const query = (unitSearch?.value || '').trim().toLowerCase();
    unitRows.forEach(row => {
      const matchesText = !query || row.dataset.unitSearch.includes(query);
      const matchesState = unitFilter === 'all' || row.dataset.unitState === unitFilter;
      row.hidden = !(matchesText && matchesState);
    });
    unitGroups.forEach(group => { group.hidden = !group.querySelector('[data-unit-index-row]:not([hidden])'); });
    const visible = unitRows.filter(row => !row.hidden).length;
    const result = app.querySelector('[data-unit-results]');
    if (result) result.textContent = `${visible} ${visible === 1 ? 'unit' : 'units'} shown`;
  };
  unitSearch?.addEventListener('input', applyUnitFilters);
  unitFilterButtons.forEach(button => button.addEventListener('click', () => {
    unitFilter = button.dataset.unitFilter;
    unitFilterButtons.forEach(item => item.classList.toggle('is-active', item === button));
    applyUnitFilters();
  }));

  app.querySelector('[data-record-quran-today]')?.addEventListener('click', () => {
    const key = localDateKey();
    let records = {};
    try { records = JSON.parse(localStorage.getItem('ummiby.quran.readingDays') || '{}'); } catch {}
    if (records[key]) {
      delete records[key];
      toast("Today's Qur’an reading record removed.");
    } else {
      records[key] = 'manual';
      toast("Today's Qur’an reading recorded.");
    }
    localStorage.setItem('ummiby.quran.readingDays', JSON.stringify(records));
    render();
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

  app.querySelectorAll("[data-toggle-memorized]").forEach((button) => {
    button.addEventListener("click", () => {
      const [collectionId, itemId] = button.dataset.toggleMemorized.split(":");
      const memorized = toggleMemorized(collectionId, itemId);
      toast(memorized ? "Duaa marked memorized." : "Memorized status removed.");
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
  app.querySelectorAll("[data-reading-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled) return;
      updateReadingPreferences({ mode: button.dataset.readingMode });
      render();
    });
  });

  app.querySelectorAll("[data-collection-filters]").forEach((panel) => {
    const collectionId = panel.dataset.collectionFilters;
    const list = app.querySelector(`[data-collection-list="${collectionId}"]`);
    if (!list) return;
    const state = readCollectionFilterState(collectionId);
    const rows = [...list.querySelectorAll('[data-duaa-row]')];
    const status = panel.querySelector('[data-filter-status]');
    const clear = panel.querySelector('[data-clear-collection-filters]');
    const activeFilters = panel.querySelector('[data-active-filters]');
    const labels = new Map([...panel.querySelectorAll('[data-filter-group]')].map(input => [input.dataset.filterValue, input.nextElementSibling?.textContent || input.dataset.filterValue]));
    const groupState = (group) => group === 'speaker' ? state.speakers : state.purposes;
    const defaultSummary = { speaker:'All prophets and speakers', purpose:'All purposes' };
    const updateSummary = (group, values) => {
      const summary = panel.querySelector(`[data-filter-summary="${group}"]`);
      if (!summary) return;
      if (!values.size) summary.textContent = defaultSummary[group];
      else if (values.size === 1) summary.textContent = labels.get([...values][0]) || '1 selected';
      else summary.textContent = `${values.size} selected`;
    };
    const renderActiveFilters = () => {
      if (!activeFilters) return;
      const selections = [...state.speakers].map(value=>['speaker',value]).concat([...state.purposes].map(value=>['purpose',value]));
      activeFilters.hidden = selections.length === 0;
      activeFilters.innerHTML = selections.map(([group,value]) => `<button type="button" data-remove-filter="${group}:${value}"><span>${labels.get(value) || value}</span><i class="ph ph-x" aria-hidden="true"></i></button>`).join('');
      activeFilters.querySelectorAll('[data-remove-filter]').forEach(button => button.addEventListener('click', () => {
        const [group,value] = button.dataset.removeFilter.split(':');
        groupState(group).delete(value);
        const input = panel.querySelector(`[data-filter-group="${group}"][data-filter-value="${value}"]`);
        if (input) input.checked = false;
        applyFilters();
      }));
    };
    const applyFilters = () => {
      let shown = 0;
      rows.forEach((row) => {
        const speakerMatch = !state.speakers.size || state.speakers.has(row.dataset.speaker);
        const rowPurposes = new Set((row.dataset.purposes || '').split(' ').filter(Boolean));
        const purposeMatch = !state.purposes.size || [...state.purposes].some((purpose) => rowPurposes.has(purpose));
        const visible = speakerMatch && purposeMatch;
        row.hidden = !visible;
        if (visible) shown += 1;
      });
      updateSummary('speaker', state.speakers);
      updateSummary('purpose', state.purposes);
      renderActiveFilters();
      const active = state.speakers.size > 0 || state.purposes.size > 0;
      if (clear) clear.hidden = !active;
      if (status) status.textContent = active ? `Showing ${shown} of ${rows.length} duaas` : `Showing all ${rows.length} duaas`;
      saveCollectionFilterState(collectionId, state);
      const visibleIds = rows.filter(row => !row.hidden).map(row => row.dataset.duaaRow);
      sessionStorage.setItem(collectionReadingSequenceKey(collectionId), JSON.stringify(visibleIds));
    };
    panel.querySelectorAll('[data-filter-group]').forEach((input) => {
      const target = groupState(input.dataset.filterGroup);
      input.checked = target.has(input.dataset.filterValue);
      input.addEventListener('change', () => {
        input.checked ? target.add(input.dataset.filterValue) : target.delete(input.dataset.filterValue);
        applyFilters();
      });
    });
    panel.querySelectorAll('[data-open-filter-dialog]').forEach(button => {
      button.addEventListener('click', () => panel.querySelector(`[data-filter-dialog="${button.dataset.openFilterDialog}"]`)?.showModal());
    });
    panel.querySelectorAll('[data-clear-filter-group]').forEach(button => {
      button.addEventListener('click', () => {
        const group = button.dataset.clearFilterGroup;
        groupState(group).clear();
        panel.querySelectorAll(`[data-filter-group="${group}"]`).forEach(input => { input.checked = false; });
        applyFilters();
      });
    });
    clear?.addEventListener('click', () => {
      state.speakers.clear();
      state.purposes.clear();
      panel.querySelectorAll('[data-filter-group]').forEach((input) => { input.checked = false; });
      applyFilters();
    });
    applyFilters();
    const storedScroll = Number(sessionStorage.getItem(collectionScrollKey(collectionId)) || 0);
    if (storedScroll > 0) requestAnimationFrame(() => window.scrollTo({ top:storedScroll, behavior:'instant' }));
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

  const profileButton = app.querySelector("[data-profile-button]");
  const accountMenu = app.querySelector("[data-account-menu]");
  const closeAccountMenu = ({ returnFocus = false } = {}) => {
    if (!accountMenu || !profileButton) return;
    accountMenu.hidden = true;
    profileButton.setAttribute("aria-expanded", "false");
    if (returnFocus) profileButton.focus();
  };
  const openAccountMenu = () => {
    if (!accountMenu || !profileButton) return;
    accountMenu.hidden = false;
    profileButton.setAttribute("aria-expanded", "true");
    accountMenu.querySelector('[role="menuitem"]')?.focus();
  };
  profileButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    accountMenu?.hidden ? openAccountMenu() : closeAccountMenu();
  });
  accountMenu?.addEventListener("click", (event) => event.stopPropagation());
  app.addEventListener("click", () => closeAccountMenu());
  app.querySelectorAll("[data-open-account-dialog]").forEach((button) => {
    button.addEventListener("click", () => {
      closeAccountMenu();
      app.querySelector(`#${button.dataset.openAccountDialog}`)?.showModal();
    });
  });
  app.querySelector("[data-request-sign-out]")?.addEventListener("click", () => {
    closeAccountMenu();
    app.querySelector("#sign-out-dialog")?.showModal();
  });
  app.querySelector("[data-confirm-sign-out]")?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    try {
      await signOut();
      app.querySelector("#sign-out-dialog")?.close();
      toast("You have been signed out.");
    } catch (error) {
      button.disabled = false;
      toast(error.message, "error");
    }
  });
  app.querySelectorAll(".account-dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });
  app.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && accountMenu && !accountMenu.hidden) {
      event.preventDefault();
      closeAccountMenu({ returnFocus: true });
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

window.addEventListener("hashchange", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  render();
  window.scrollTo(0, 0);
  document.querySelector("#module-content")?.focus({ preventScroll: true });
});
start();
