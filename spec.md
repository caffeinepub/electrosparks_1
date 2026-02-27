# Specification

## Summary
**Goal:** Add a secure, hidden admin panel with full registration backend persistence, including payment screenshot storage and protected admin dashboard.

**Planned changes:**
- Update the backend `Registration` type to store all fields: Full Name, College, Department, Year of Study, Email, Phone Number, Selected Event Type, Number of Members, Total Amount, Payment Screenshot (Blob), and Timestamp in stable storage
- Update the `submitRegistration` flow so the Payment page calls the backend before navigating; only route to `/success` on a confirmed backend save, otherwise show an inline error
- Add a hidden `/admin` route that never appears in the Navbar or any public navigation
- Implement an admin login screen at `/admin` with Username/Password fields validated on the backend (credentials: VibECX-2K26 / VibECX@2K26); show "Invalid Username or Password" on failure and block dashboard rendering until login succeeds
- Add backend admin-only query endpoints (protected by session token) returning: total registrations count, total participants count, total revenue, and all registrations sorted by timestamp descending
- Build the AdminDashboard component with three stat cards (Total Registrations, Total Participants, Total Revenue) and a full registrations table (Name, College, Department, Phone, Event Type, Members, Amount, Timestamp, Payment Screenshot thumbnail with click-to-preview)
- Style the admin login and dashboard with the same dark theme and orange-gold accents used throughout the site; fully responsive with horizontal table scroll on mobile

**User-visible outcome:** Admins can navigate directly to `/admin`, log in with secure credentials, and view a professional dashboard showing aggregated stats and a full sortable table of all registrations including clickable payment screenshot previews. Public users see no trace of the admin route, and registrations are only confirmed after successful backend persistence.
