# Specification

## Summary
**Goal:** Apply a warm beige marble global background color with a dark overlay across all pages of the VibECX-2K26 application.

**Planned changes:**
- Set the global `body` background color to `#DCCBB5` (warm beige marble tone) in `frontend/src/index.css`
- Add a full-viewport fixed dark overlay (`rgba(0,0,0,0.75)`) via global CSS, positioned above the body background but below all page content (using `z-index` and `pointer-events: none`)
- No changes to any page component files, layout, animations, neon glow effects, spacing, or functionality

**User-visible outcome:** All pages (Home, Technical Events, Non-Technical Events, Register, Payment, Success, Contact, Admin, Dashboard) display a warm beige marble background with a dark overlay that keeps neon/orange glow elements visually premium and text readable.
