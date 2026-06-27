# रक्तमित्र (RaktaMitra) — Frontend

A Government of Maharashtra style citizen service portal for blood donation, built with React JS, React Router DOM, React Icons, and react-i18next. This package is **frontend-only** — no backend/API logic is included. All forms currently simulate submission locally (no network calls).

## Tech Stack
- React 18 (JavaScript, no TypeScript)
- React Router DOM v6
- React Icons (Fa icon set)
- react-i18next (Marathi default, Hindi, English)
- Vite (build tool)
- Plain CSS3 (no CSS framework)

## Folder Structure
```
raktamitra/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                 # App entry point
    ├── App.js                   # Route definitions
    ├── components/
    │   ├── Layout.jsx            # Navbar + Footer + <Outlet/>
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── LanguageSwitcher.jsx
    │   └── PageHeader.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── DonateBlood.jsx
    │   ├── NeedBlood.jsx
    │   ├── BloodBanks.jsx
    │   ├── Hospitals.jsx
    │   ├── Camps.jsx
    │   ├── HowItWorks.jsx
    │   ├── Contact.jsx
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   └── NotFound.jsx
    ├── i18n/
    │   ├── i18n.js
    │   └── locales/{en,hi,mr}.json
    └── styles/
        ├── variables.css         # Design tokens (colors, spacing)
        ├── global.css            # Resets, buttons, cards, grid
        ├── navbar.css
        ├── footer.css
        ├── language-switcher.css
        ├── home.css
        ├── forms.css
        └── pages.css
```

## Getting Started
```bash
npm install
npm run dev
```
App runs at `http://localhost:3000`.

## Design System
- **Background:** White / very light grey
- **Primary accent:** Light blue (`--color-blue`)
- **Secondary accent:** Light saffron (`--color-saffron`)
- **Emergency-only:** Red (`--color-emergency`) — used only for emergency call-to-action buttons and the "Emergency" nav link
- Large, legible type, generous spacing and high-contrast focus states for elderly and rural users
- Fully responsive: navbar collapses to a hamburger menu, grids stack on mobile

## Notes
- This is a **frontend-only** deliverable. Forms (`Donate Blood`, `Need Blood`, `Contact`, `Login`, `Register`) currently just toggle a local success state on submit — wire them up to your backend/API as needed.
- Dashboards (donor dashboard, admin dashboard, etc.) are intentionally **not included** per project scope.
- Language defaults to Marathi (`mr`) and can be switched to Hindi (`hi`) or English (`en`) via the top bar switcher; preference is persisted in `localStorage`.
