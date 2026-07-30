# App Shell Vocabulary

The Version 2 interface uses one permanent two-by-two application shell.

```text
┌──────────────────────┬──────────────────────────────────────┐
│ A1 — Brand Panel     │ B1 — Module Banner                  │
├──────────────────────┼──────────────────────────────────────┤
│ A2 — App Sidebar     │ B2 — Module Workspace               │
│                      │      ├─ Module Nav Bar               │
│                      │      └─ Module Content               │
│                      │           └─ Content View             │
└──────────────────────┴──────────────────────────────────────┘
```

## Official terms

### App Shell
The complete persistent layout shared by every module.

### Brand Panel
Grid cell A1. Holds the app mark and app name. The temporary `U` mark will be replaced after the final identity is designed.

### Module Banner
Grid cell B1. Holds module-specific artwork and supporting title content. Banner structure remains shared; each module supplies its own identity.


### Account Control
The authenticated profile circle in the upper-right of the Module Banner. It is part of the shared App Shell and must remain available across every module. The circle uses the signed-in user’s initials and opens the Account Menu.

### Account Menu
The shared dropdown containing My Profile, Preferences, About Ummiby Companion, and Sign Out. Account and session controls must not be duplicated inside individual module content.

### App Sidebar
Grid cell A2. Provides app-wide navigation between App Home, Qur'an, Duaa, Names of Allah, Ramadan, and Settings. Phosphor Regular icons appear above labels at a consistent 36px desktop size. The active item uses a bright rounded card rather than a vertical accent line.

### Module Workspace
Grid cell B2. The active module's working area.

### Module Nav Bar
The sticky, colored navigation bar at the top of the Module Workspace. Its color comes from the active module theme.

### Module Content
The shared content container beneath the Module Nav Bar.

### Content View
The particular destination currently rendered inside Module Content, such as Reading Units, Morning Duaa, or Fasting History.

## Supporting UI terms

- **Auth Screen:** login, account creation, and password reset.
- **Toast Region:** temporary success and error messages.
- **Loading State:** visible feedback while authentication or data is loading.
- **Module Registry:** the single configuration source for module labels, routes, icons, themes, and navigation.

## Structural rule

The App Shell is defined once. Modules may configure and populate it, but they must not duplicate or independently recreate shell regions.


## Polish Pass 1 visual rules

- The shell should feel bright, crisp, warm, and welcoming rather than matte or corporate.
- The sidebar uses a deep blue field inspired by Momentum, with generous breathing room and clear icon-led destinations.
- Sidebar icons use one library, one weight, and one size.
- Active navigation is communicated through contrast, typography, and a rounded surface—not a decorative side bar.
- Module banners remain clean and restrained; decorative blobs and oversized rings are avoided.
- The app should feel like a familiar companion while remaining respectful and polished.


## v2.0.3 visual direction

The shared shell now uses bright, welcoming surfaces rather than a dark dashboard treatment. App Home and module-home banners support text-free artwork while all headings and descriptions remain semantic HTML. The current shared illustration is intentionally simple and temporary so a later coordinated hero-art pass can replace it without changing shell structure.


### Banner refinement
- Module banners temporarily use a clean complementary theme color instead of artwork.
- Banner titles remain on one line at desktop widths.
- Banner subtitles use a smaller size and do not wrap at desktop widths.
- The main canvas is white or slightly off-white.
- Future module imagery should match the calm, immersive, landscape-led visual language established in the Duaa section.
