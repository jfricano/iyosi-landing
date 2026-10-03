# Landing page deployment and recovery

## Hosting contract

The approved destination is free Cloudflare Pages, with the GitHub source repository kept private. The public landing page stays at `https://iyosi.app/`, with www redirected to the apex. This is a static marketing page and fictional interactive app preview; it does not expose or call the iYosi API.

Migration status on October 2, 2026: Cloudflare production live; automatic main deployment and www redirect verified. GitHub removed the previous Pages configuration when the repository became private. The old GitHub Pages workflow is obsolete under this hosting choice. No paid hosting, GitHub Pro upgrade, API publication, or account-wide repository access is part of this change.

## Cloudflare project configuration

Use the existing Cloudflare account and a single Pages project connected to only `jfricano/iyosi-landing`:

| Setting | Value |
| --- | --- |
| Source visibility | Private |
| Production branch | `main` |
| Framework preset | None |
| Build command | None |
| Output directory | `dist` |
| Root directory | Repository root |
| Runtime / Pages Functions | None |
| Canonical custom domain | `iyosi.app` |

The GitHub integration publishes main automatically after a push or merge. Repository code, design references, and documentation stay private; only the output directory is served publicly. The Cloudflare GitHub App uses its standard repository permissions, restricted to this one selected repository.

Project: `iyosi-landing`. Verified production preview: `https://iyosi-landing.pages.dev/`. Initial deployment: `366db09b-7df7-47a6-9c50-cb393acc2664`, from main `91575232395e554317e813c99068a02d1fbdf87d`. All six output files return HTTPS 200 and match source bytes. Both `iyosi.app` and `www.iyosi.app` are attached and serve HTTPS 200. Apex output matches the approved source. Main merge `8cec32b8e442b87ea1fd29ad0f62a7ae6ee9db7d` automatically produced successful production deployment `e61eb661-ce1b-49e4-a901-a8c7b3e0d216`. Branch preview deployments also passed. Both live interactive sample states passed. The GitHub installation was verified to select only this repository (installation `167412069`).

## Release verification

Verify the deployed files against the intended source before domain cutover. Confirm apex HTTPS 200, www-to-apex redirect with path/query preservation, loaded CSS/JavaScript/favicon/illustration, canonical/social metadata, and both sample app states. App-store cards must remain non-links while public listings are unavailable. Preserve existing domain email records and keep API DNS/access decisions separate.

The `dist/CNAME` file is a legacy GitHub Pages artifact; Cloudflare domain attachment is configured in the dashboard, independently of that file. The active zone Single Redirect `c6327eab8b244d19b76a8ef199d7cf41` matches only `(http.host eq "www.iyosi.app")`, redirects with status 301 to `concat("https://iyosi.app", http.request.uri.path)`, and preserves query strings. HTTP and HTTPS path/query checks both passed. Apex and www use proxied CNAMEs to `iyosi-landing.pages.dev`; MX/SPF/DKIM are unchanged and API DNS remains absent.

## Redeploy and rollback

For ordinary changes, commit the static source to a branch, review it, then merge into `main`. Verify the resulting Cloudflare production deployment. Cloudflare's deployment dashboard can retry a build or restore an earlier successful production deployment. Reverting the source commit on main creates a new automatic deployment of the previous content.

Restoring the old GitHub DNS records alone cannot recover the old host while this source repository remains private on the current GitHub entitlement. Returning to GitHub Pages requires a public publishing repository or an eligible paid plan, which is a separate human decision.

Initial recovery evidence and the WIP manager handoff are maintained at `/Users/jasonfricano/coding/dev-ops/deployments/iyosi-landing/20261002/` during cutover. Preserve the prior immutable artifact and DNS values until Cloudflare acceptance passes.
