<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- Runtime config is awaited by the module graph. Start it during HTML
         parsing instead of after the initial JavaScript has downloaded. -->
    <link rel="preload" as="fetch" href="/env.json" crossorigin="anonymous" />
    <!-- Tab icon: Rayzex Fund green logo. 192px covers the 180px apple-touch icon
         and leaves headroom for a 2x tab icon.
         The href is a PROJECT-RELATIVE path on purpose: Vite resolves it at
         build time and rewrites it to the emitted, content-hashed URL, so the
         icon is the same file the app renders and takes the same year at the
         edge. A root-absolute `/img/...` would be copied verbatim instead and
         would need its own unhashed copy under public/, which is what this
         replaced — two files that had to be changed together or the tab icon
         and the app mark quietly became different pictures.
         `type="image/png"` so the icon parser doesn't probe it as an ICO. -->
    <link rel="icon" type="image/png" href="/assets/logo-192-pEhUWjvS.png" />
    <link rel="apple-touch-icon" href="/assets/logo-192-pEhUWjvS.png" />
    <!-- Social / link-preview (Open Graph + Twitter Card). Consumed by
         iMessage, Slack, Twitter/X, Discord, LinkedIn, etc. — unfurlers that
         DO NOT run JS, so these MUST live in the static index.html (React
         Helmet is invisible to them). The preview image is the branded
         "Built for traders who win" card at public/rayzex-social.png, served
         at the site root; Open Graph requires ABSOLUTE image/url values.
         The file MUST be the 1200×675 declared below: a full-size export in
         that slot made X drop the image for eighteen days (ui #628). -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Rayzex Fund" />
    <meta property="og:title" content="Start Trading Today" />
    <meta
      property="og:description"
      content="Trade 100+ assets across stocks, crypto, and commodities with leverage. Powered by Uniswap."
    />
    <meta property="og:url" content="https://app.rayzexx.app" />
    <meta property="og:image" content="https://app.rayzexx.app/rayzex-social.png" />
    <meta
      property="og:image:secure_url"
      content="https://app.rayzexx.app/rayzex-social.png"
    />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="675" />
    <meta
      property="og:image:alt"
      content="Rayzex Fund. Built for traders who win. Trade stocks, crypto, and more."
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Start Trading Today" />
    <meta
      name="twitter:description"
      content="Trade 100+ assets across stocks, crypto, and commodities with leverage. Powered by Uniswap."
    />
    <meta name="twitter:image" content="https://app.rayzexx.app/rayzex-social.png" />
    <meta
      name="twitter:image:alt"
      content="Rayzex Fund. Built for traders who win. Trade stocks, crypto, and more."
    />
    <meta
      name="description"
      content="Trade 100+ assets across stocks, crypto, and commodities with leverage on Rayzex Fund. Powered by Uniswap."
    />
    <!-- interactive-widget: browsers that honor it (Android Chrome) shrink
         the layout viewport for the on-screen keyboard, so bottom-anchored
         inputs dock to it natively; iOS ignores it (useKeyboardInset covers
         iOS via the visual viewport). -->
    <!-- viewport-fit=cover: lets the page draw under the notch/home-indicator
         so env(safe-area-inset-*) reports real values in the native shell and
         home-screen PWAs. In a normal browser tab every inset is 0 and this
         changes nothing. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, interactive-widget=resizes-content" />
    <!-- theme-color: what Android Chrome paints its URL/status bar. Without
         it the bar is the system default — a light strip over a near-black
         app. The value is the resolved --color-rayzex-bg (hsl(197 20% 7%));
         ThemeContext swaps it for the light palette's when the user toggles.
         iOS Safari samples the page background on its own and ignores this. -->
    <meta name="theme-color" content="#0e1315" />
    <!-- Reads the saved palette and whether there is a session to restore, and
         puts both on <html> before the first paint — so a light-mode visitor is
         not served the dark document, and a signed-in one is not offered
         "Log in". Must stay HERE: after the theme-color meta it edits, before
         <body>, and synchronous (no defer/module) so it runs in the parse pause
         rather than after the document is painted. Its own file because the CSP
         is `script-src 'self'` with no 'unsafe-inline' — see public/boot.js. -->
    <script src="/boot.js"></script>
    <!-- No font links here on purpose. Inter (body) and Nunito Sans (the
         wordmark) are served from our own origin and declared in
         app/styles/fonts.css, so there is no third host to preconnect to and
         no stylesheet round trip standing between the page and its text. -->
    <title>Rayzex Fund</title>
    <script type="module" crossorigin src="/assets/index-BIoJV5TR.js"></script>
    <link rel="modulepreload" crossorigin href="/assets/rolldown-runtime-BTPm5ob3.js">
    <link rel="modulepreload" crossorigin href="/assets/initial-vendor-BpDO0nPv.js">
    <link rel="modulepreload" crossorigin href="/assets/initial-app-jMNi81UO.js">
    <link rel="stylesheet" crossorigin href="/assets/initial-app-Cfv_F4Gp.css">
    <link rel="preload" as="font" type="font/woff2" href="/assets/inter-var-latin-8kRkwJBP.woff2" crossorigin="">
    <link rel="preload" as="font" type="font/woff2" href="/assets/nunito-sans-var-latin-DMs03jvk.woff2" crossorigin="">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>