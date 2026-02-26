# Specification

## Summary
**Goal:** Automatically sync the total amount from the Registration page to the Payment page's QR section using localStorage, eliminating any independent fee recalculation on the Payment page.

**Planned changes:**
- On the Register page, when the user clicks "Proceed to Payment", read the displayed total amount (stripping the ₹ symbol) and save it to localStorage under the key `vibecxAmount` before navigating to the Payment page.
- On the Payment page, on load, read `vibecxAmount` from localStorage and display it as `₹<amount>` in the QR amount display element.
- Populate a hidden input field on the Payment page with the raw numeric amount from localStorage.
- Ensure the Payment page performs no independent fee calculation — only the localStorage value is used.
- Handle the case where no amount is found in localStorage gracefully (fallback or empty state).

**User-visible outcome:** The QR scan screen on the Payment page always shows the exact same total amount that was displayed on the Registration page, with no recalculation occurring.
