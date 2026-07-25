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

### App Sidebar
Grid cell A2. Provides app-wide navigation between App Home, Qur'an, Duaa, Names of Allah, Ramadan, and Settings. Icons appear above labels.

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
