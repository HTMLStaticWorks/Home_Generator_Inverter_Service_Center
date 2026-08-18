# GRID SYSTEMS — Premium Luxury Generator & Inverter Service Center

This is a premium, high-end web template for **GRID SYSTEMS (Home Generator & Inverter Service Center)**. It is built from scratch utilizing standard semantic HTML5, vanilla CSS, and modern vanilla ES6 JavaScript.

## 📐 Design System & Typography

- **Heading Font**: `'Syne'`, sans-serif (fluid clamping scale, maximum font weight locked to `580` globally).
- **Body & UI Font**: `'Sora'`, sans-serif (lightweight, clean, modern geometric sans-serif).
- **Color Theme**:
  - **Light Mode**: Alabaster Sand (`#F4F3EF`), Clean White (`#FFFFFF`), Charcoal Grey (`#15171A`), and Warm Architectural Brass (`#B48C57`).
  - **Dark Mode**: Rich Dark Carbon (`#0D0E10`), Block Charcoal (`#141619`), Alabaster Sand (`#F4F3EF`), and Bright Golden Brass (`#E2BA86`).
- **Border Radius**: Global 4px architectural sharp roundness.

## 🔄 RTL (Right-to-Left) Support

- Toggled dynamically via the `dir="rtl"` attribute on the `<html>` tag.
- All layout rules are built using modern logical CSS properties (`margin-inline-start`, `padding-inline-end`, etc.).
- Complete visual overrides (such as sliding the mobile menu drawer from the left instead of the right, and reversing card baseline effects) are contained inside `assets/css/rtl.css`.
- The toggle button features the double arrows `⇆` icon.

## 📂 File Structure

```
[Home Generator & Inverter Service Centers]/
├── index.html            # Main Home Page (Staggered hero, Capabilities grid, Showcase, Testimonials, Footer)
├── home2.html            # Alternative Home Page (Split hero, Filterable systems tabs, AMC pricing, Timeline, Booking)
├── about.html            # About Philosophy (Creed story, Milestones timeline, Engineering profiles grid)
├── services.html         # Tech Portfolio (Generators, Inverters, Battery diagnostics, Comparison table, Service areas)
├── blog.html             # Technical Journal (Filterable list of engineering papers)
├── blog-single.html      # Editorial Article (Post text layout, pullquotes, related articles)
├── contact.html          # Contact Support (Dispatch booking form, client-side validation, centered mobile)
├── login.html            # OAuth Auth Portal (Google, Apple, Register redirect; Centered container, no scroll, no theme toggle)
├── register.html         # OAuth Auth Register (Centered name, email, match check passwords, terms check box)
├── 404.html              # Custom Error Page (Bold 404 outage illustration, Reconnect home button)
├── coming-soon.html      # Coming Soon (Dynamic ticking countdown clock script, Newsletter email capture)
├── assets/
│   ├── css/
│   │   ├── style.css     # Main stylesheet (CSS variables, resets, layout grids, components, dark mode, media queries)
│   │   └── rtl.css       # RTL Overrides (Sliding drawer offset, alignment resets)
│   └── js/
│       └── main.js       # Core scripts (Theme state, RTL toggles, mobile hamburger drawer, form checkers, carousel sliders)
└── README.md             # Project documentation (This file)
```

## ⚙️ Features & Form Checkers

- **Dynamic Navigation Drawer**: Hamburger drawer starts at viewport widths of `1024px` and below. Horizontal menu is visible above `1024px`.
- **Form Validation**: Active on all client-side inputs (checks required states, valid email format regex, password length limit of 8 characters, password matching confirmation, terms checkbox check). Block forms page reloads, showing custom success status boxes.
- **Dynamic Clock Timer**: Counting down 45 days from target on the coming-soon portal.
- **Interactive Showcase Filters**: Clickable system tabs to filter custom systems on Home 2.
