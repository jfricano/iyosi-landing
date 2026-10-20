# iYosi landing page

A responsive, single-page static site for iYosi. Hosting is deployed on free Cloudflare Pages so this source repository can remain private. Pages publishes `dist/` directly; there is no build step or runtime dependency. See [deployment and recovery](docs/DEPLOYMENT.md) for configuration, release status, and rollback.

## Project repositories

The iYosi code currently lives in four focused repositories:

| Repository | What it contains |
| --- | --- |
| [iYosi API](https://github.com/jfricano/iyosi-api) | Shared API pilot implementation |
| [iYosi iOS](https://github.com/jfricano/iyosi-ios) | iOS pilot app |
| [iYosi Android](https://github.com/jfricano/iyosi-android) | Android pilot client in development |
| [iYosi landing](https://github.com/jfricano/iyosi-landing) | This site at [iyosi.app](https://iyosi.app/) |

## Preview locally

From this repository, run `python3 -m http.server 8008 --directory dist` and open `http://localhost:8008/`.

The app screen is an interactive **illustration** with fictional sample places. Its two state buttons change the place label, evidence status, latest confirmation, access note, and map symbol. It does not use the API or provide directions to real places.

## Release information

The page describes the current pilot state. Update the release copy as the API and clients change. When public app listings are ready, set the HTTPS URLs in `STORE_URLS` at the top of `dist/app.js`; the Android and iOS cards remain non-links until those URLs are present.

The canonical custom domain is `iyosi.app`. Public metadata and social preview links use that domain. Cloudflare Pages Custom domains manages domain attachment; the legacy `dist/CNAME` file is not its configuration source.

## Design handoff

[docs/DESIGN_HANDOFF.md](docs/DESIGN_HANDOFF.md) records the visual system and app screen hierarchy for the client teams. `design-preview/` preserves the approved concept; `dist/` is the live site source.

## Shared agent instructions

`AGENTS.md` and `CLAUDE.md` are shared project instructions and stay tracked in this repository so local and cloud agents can read them. Keep personal overrides in ignored `CLAUDE.local.md`; credentials and session state stay private. Existing project-specific instructions and permissions continue to apply.
