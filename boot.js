/*
 * The two things the first paint has to know and React cannot tell it yet.
 *
 * Both live in localStorage, both decide what the page should look like, and
 * both are invisible to the build — the prerendered documents in this image
 * are written on a machine with neither. React only learns them after the
 * bundle has downloaded, parsed and hydrated, which on a throttled connection
 * is a second or more after the document is already on screen. So they are
 * read here instead, in the parse pause before <body>, and expressed as
 * classes on <html> that CSS can act on immediately.
 *
 * It has to be its own file rather than an inline <script>: nginx serves
 * `script-src 'self'` with no 'unsafe-inline' (nginx/default.conf), so an
 * inline block would be refused by the browser in every deployed environment
 * while working perfectly in `npm run dev`. It costs one same-origin request
 * of a few hundred bytes, fetched by the preload scanner alongside the entry
 * stylesheet that already blocks rendering, so it lands before the paint it is
 * protecting. Measured: no change to first contentful paint.
 *
 * PLAIN ES5, NO MODULE, NO BUNDLER. It is served from public/ exactly as
 * written and must run before the document is painted, so it can neither
 * import the constants it duplicates nor be processed by Vite. The copies are
 * checked against their originals by app/contexts/boot.test.ts.
 */
(function () {
  var root = document.documentElement;

  // 1. THE PALETTE. ThemeContext applies `.light` in an effect, so without
  // this a light-mode visitor was served the dark document and watched the
  // whole page change colour once React hydrated.
  try {
    var theme = window.localStorage.getItem('rayzex-theme');
    if (theme === 'light' || theme === 'dark') {
      if (theme === 'light') root.classList.add('light');
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', theme === 'light' ? '#f6f8f9' : '#0e1315');
    }
  } catch (_e) {
    // localStorage throws in a private window and in some embedded webviews.
    // Falling through leaves the document's own dark default, which is what a
    // visitor who never chose gets anyway.
  }

  // 2. WHETHER THERE IS A SESSION TO RESTORE (app/auth/sessionMarker.ts).
  // Privy is deferred, so a returning user's document is the VISITOR document
  // — it offers "Log in / Sign up". React then unmounts that the moment it
  // reads the marker, leaving the slot empty for as long as the 944 KB SDK
  // chunk takes, and finally swaps in the account pill. Three states and two
  // flips, the first of which tells a signed-in user they are signed out.
  //
  // The marker settles that before the first pixel: while this class is on,
  // CSS shows a restoring placeholder in the slot and suppresses every "sign
  // in" affordance. `PrivyRuntime` removes the class the moment Privy answers
  // — either way — and React owns the slot from then on, which is what keeps
  // a STALE marker (session expired server-side) from hiding the login button
  // for good.
  try {
    if (window.localStorage.getItem('rayzex:has-session') === '1') {
      root.classList.add('session-restoring');
    }
  } catch (_e) {
    // No marker readable means the visitor UI, which is the safe default: it
    // offers a way in rather than withholding one.
  }
})();
