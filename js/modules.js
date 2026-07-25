const icon = (paths) => `
  <svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    ${paths}
  </svg>`;

export const modules = {
  home: {
    id: "home",
    label: "App Home",
    shortLabel: "Home",
    theme: "home",
    bannerTitle: "A quiet place to return",
    bannerEyebrow: "Ummiby Companion",
    description: "Your personal home for Qur'an reading, duaa, study, memorization, and Ramadan reflection.",
    icon: icon('<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>'),
    navigation: [{ label: "App Home", route: "/home" }]
  },
  quran: {
    id: "quran",
    label: "Qur’an",
    shortLabel: "Qur’an",
    theme: "quran",
    bannerTitle: "Read, reflect, and continue",
    bannerEyebrow: "Qur’an",
    description: "Reading journeys, surah reading, memorization, and trusted study resources.",
    icon: icon('<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22z"/>'),
    navigation: [
      { label: "Qur’an Home", route: "/quran" },
      { label: "Reading Units", route: "/quran/reading-units" },
      { label: "Read by Surah", route: "/quran/surahs" },
      { label: "Memorization", route: "/quran/memorization" },
      { label: "Study Library", route: "/quran/library" }
    ]
  },
  duaa: {
    id: "duaa",
    label: "Duaa",
    shortLabel: "Duaa",
    theme: "duaa",
    bannerTitle: "Call upon Allah with hope",
    bannerEyebrow: "Duaa",
    description: "Daily collections, focused reading, and gentle consistency tracking.",
    icon: icon('<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>'),
    navigation: [
      { label: "Duaa Home", route: "/duaa" },
      { label: "Morning", route: "/duaa/morning" },
      { label: "Evening", route: "/duaa/evening" },
      { label: "Before Sleep", route: "/duaa/sleep" },
      { label: "Collections", route: "/duaa/collections" }
    ]
  },
  names: {
    id: "names",
    label: "Names of Allah",
    shortLabel: "Names",
    theme: "names",
    bannerTitle: "Learn the beautiful Names",
    bannerEyebrow: "Names of Allah",
    description: "A dedicated place to learn, review, and reflect upon the Names of Allah.",
    icon: icon('<path d="M12 3v18"/><path d="M5 8h14"/><path d="M7 3h10"/><path d="M7 21h10"/>'),
    navigation: [
      { label: "Names Home", route: "/names" },
      { label: "All Names", route: "/names/all" },
      { label: "Study", route: "/names/study" },
      { label: "Review", route: "/names/review" }
    ]
  },
  ramadan: {
    id: "ramadan",
    label: "Ramadan",
    shortLabel: "Ramadan",
    theme: "ramadan",
    bannerTitle: "Keep the month close",
    bannerEyebrow: "Ramadan Central",
    description: "Fasting records, Qur'an reading, duaa, and yearly Ramadan history.",
    icon: icon('<path d="M20 15.5A8.5 8.5 0 1 1 8.5 4 7 7 0 0 0 20 15.5z"/>'),
    navigation: [
      { label: "Ramadan Home", route: "/ramadan" },
      { label: "Fasting", route: "/ramadan/fasting" },
      { label: "Reading", route: "/ramadan/reading" },
      { label: "Duaa Library", route: "/ramadan/duaa" },
      { label: "History", route: "/ramadan/history" }
    ]
  },
  settings: {
    id: "settings",
    label: "Settings",
    shortLabel: "Settings",
    theme: "settings",
    bannerTitle: "Make the companion yours",
    bannerEyebrow: "Settings",
    description: "Account, appearance, reading preferences, and data controls.",
    icon: icon('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.1 2.1-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-3v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-2.1-2.1.1-.1A1.7 1.7 0 0 0 7 14.6a1.7 1.7 0 0 0-1.5-1H5v-3h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2.1-2.1.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V4h3v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 2.1 2.1-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v3h-.2a1.7 1.7 0 0 0-1.5 1z"/>'),
    navigation: [
      { label: "Settings Home", route: "/settings" },
      { label: "Account", route: "/settings/account" },
      { label: "Preferences", route: "/settings/preferences" },
      { label: "Data", route: "/settings/data" }
    ]
  }
};

export const sidebarOrder = ["home", "quran", "duaa", "names", "ramadan", "settings"];

export function moduleForPath(pathname) {
  const firstSegment = pathname.split("/").filter(Boolean)[0] || "home";
  return modules[firstSegment] || modules.home;
}
