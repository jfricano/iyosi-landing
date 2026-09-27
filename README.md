# iYosi landing page

A standalone, single-page site for the iYosi app. It is a static site with no build step or dependencies.

## Preview locally

From this folder, run `python3 -m http.server 8008 --directory dist` and open `http://localhost:8008`.

## Store links

When the apps are published, update `STORE_URLS` near the top of `dist/app.js` with the Google Play and App Store URLs. Buttons remain visibly unavailable until their URL is set.

The interactive preview uses illustrative sample places. It does not connect to the iYosi API or present real locations.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes `dist/` when `main` is pushed to GitHub. In repository **Settings → Pages**, select **GitHub Actions** as the source. The site is served from `https://jfricano.github.io/iyosi-landing/`.
