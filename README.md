# iYosi landing page

A standalone, single-page site for the iYosi app. It is a static site with no build step or dependencies.

## Project repositories

The iYosi code currently lives in four focused repositories:

| Repository | What it contains |
| --- | --- |
| [iYosi API](https://github.com/jfricano/iyosi-api) | Backend and API work in progress |
| [iYosi iOS](https://github.com/jfricano/iyosi-ios) | Early iOS prototype |
| [iYosi Android](https://github.com/jfricano/iyosi-android) | Android project scaffold |
| [iYosi landing](https://github.com/jfricano/iyosi-landing) | This site and its [live preview](https://jfricano.github.io/iyosi-landing/) |

## Preview locally

From this folder, run `python3 -m http.server 8008 --directory dist` and open `http://localhost:8008`.

## Store links

When the apps are published, update `STORE_URLS` near the top of `dist/app.js` with the Google Play and App Store URLs. Buttons remain visibly unavailable until their URL is set.

The interactive preview uses illustrative sample places. It does not connect to the iYosi API or present real locations.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes `dist/` when `main` is pushed to GitHub. In repository **Settings → Pages**, select **GitHub Actions** as the source. The site is served from `https://jfricano.github.io/iyosi-landing/`.
