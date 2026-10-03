# iYosi landing: private repository and Cloudflare Pages

Updated October 2, 2026. Status: **complete — public landing live, source private, automatic main deployment verified**.

## WIP manager handoff

- Public landing: https://iyosi.app/ on free Cloudflare Pages, project `iyosi-landing`; preview https://iyosi-landing.pages.dev/.
- Private source: `jfricano/iyosi-landing`. Cloudflare GitHub installation `167412069` is restricted to exactly this one selected repository, verified in final installation settings (`github-installation-scope.png`). No paid upgrade.
- Production: every push/merge to `main` automatically deploys the static `dist/` output. Framework None, build command blank, repository root, no runtime/functions or environment variables.
- Final source: `8ef8ab64df16c4e2bab0c68705a94a8063b7cbf1`; successful automatic production deployment `e2efbfc1-ac63-4626-927b-a95cc06c3618`.
- Migration PR https://github.com/jfricano/iyosi-landing/pull/3 merged as `8cec32b8e442b87ea1fd29ad0f62a7ae6ee9db7d`. Removed obsolete GitHub Pages workflow and added source `docs/DEPLOYMENT.md`; final acceptance documentation then pushed directly to main and also deployed successfully.
- Apex and www both show **Active / SSL enabled** in Pages. All six published files match source bytes; root HTTPS200; index.html308 to canonical root is normal Pages behavior. Both live interactive preview states passed and unavailable store cards remain non-links.
- Active Single Redirect `c6327eab8b244d19b76a8ef199d7cf41`: `(http.host eq "www.iyosi.app")` → dynamic301 `concat("https://iyosi.app", http.request.uri.path)`, preserve query string. HTTP and HTTPS path/query checks passed.
- DNS cutover replaced exactly the four GitHub apex A records and www GitHub CNAME with Pages targets. MX/SPF/DKIM unchanged; `api.iyosi.app` A/AAAA/CNAME remain absent. API/Oracle/client access boundaries and other sites unchanged.
- Original checkout `/Users/jasonfricano/coding/iYosi/landing-page` left unchanged; work performed in isolated `source/`. The private GitHub main branch contains the updated runbook; a stale design branch must merge/rebase main before future release work.

## Acceptance and recovery evidence

`hosting-acceptance-2026-10-02.json` is the versioned final acceptance summary; the full operational evidence stays in the shared dev-ops deployment directory. `cloudflare-apex-acceptance.json` there is final acceptance; `www-redirect-acceptance.json` records exact redirect responses; `dns-before.json` / `dns-after.json` preserve public DNS observations. Proxied CNAMEs return Cloudflare edge A/AAAA answers, so their CNAME target is not exposed by public DNS queries. `cloudflare-preview-acceptance.json` records the pre-cutover six-file match; initial deployment was `366db09b-7df7-47a6-9c50-cb393acc2664` from main `91575232395e554317e813c99068a02d1fbdf87d`. Prepared ZIP and manifest remain as immutable fallback artifacts. Earlier `acceptance.json` is historical GitHub evidence, not current hosting evidence.

Cloudflare dashboard: https://dash.cloudflare.com/10a1430d3ed1c6f0b8bafcd1170c3778/pages/view/iyosi-landing

Normal changes: review static source, merge/push main, then verify the resulting Cloudflare production deployment. Rollback through Cloudflare to an earlier accepted deployment, or revert the source on main for a fresh automatic deployment. Restoring old GitHub DNS alone cannot recover Pages while source stays private on the current GitHub entitlement; a public publishing repository or eligible paid plan would require a separate human decision. Source `dist/CNAME` is a legacy artifact, not Cloudflare domain configuration.

## Resolved execution issues

The human completed the one-repository GitHub installation after automatic approval review rejected the unconfirmed app permission grant. Final scope was independently verified. A classic-token installation API query returned403 (GitHub App token required); no new token was created.

A wildcard redirect draft produced a misleading DNS warning for `http`, and automatic review rejected deployment through that warning. Cancelled it, verified actual hostnames were served through Cloudflare, and deployed the explicit hostname condition without a warning. No bypass or security reduction. Python urllib received Cloudflare1010 during preview verification; ordinary curl succeeded, and security settings were preserved. Dashboard loading/AX observations were delayed; final domain badges and active rule were visibly confirmed.

## Decision and incident

Jason asked the domain/frontend deployment manager to investigate failures after changing repository visibility. Both `iyosi.app` and `jasonfricano.com` returned GitHub's 404 page, and their Pages API resources were absent. The existing Cloudflare DNS records still pointed to GitHub Pages. GitHub Free removes published Pages sites when their source repositories become private; switching a repository back to public does not recreate the deleted site configuration.

The portfolio repository was already public at inspection. Its workflow Pages source and `jasonfricano.com` binding were recreated, then the failed main deployment was rerun. Run [37095003157, attempt 2](https://github.com/jfricano/personal-portfolio/actions/runs/37095003157) passed at source `d369f1f6faba0c14dc1d8875c5f2268a8e8d6120`. HTTPS 200, www-to-apex 301, approved certificate, HTTPS enforcement, browser rendering, eight homepage resources, and the StatBatt case-study response passed. No portfolio source or DNS changes. Its pre-existing uncommitted custom-domain metadata preparation was preserved.

Jason initially selected making only `iyosi-landing` public. The temporary restoration [37095408183](https://github.com/jfricano/iyosi-landing/actions/runs/37095408183) passed. He then superseded that choice: **keep iYosi private and use free Cloudflare Pages**. The repository was returned to private. GitHub removed its Pages configuration, and the private-repository check [37095601785](https://github.com/jfricano/iyosi-landing/actions/runs/37095601785) failed at Configure Pages with Not Found. A cached HTTPS 200 immediately after removal did not establish active hosting.

Roost remains on Oracle behind Cloudflare, with a normal HTTP 302 to its login path observed. It does not depend on GitHub Pages or repository visibility. No Roost change or new application functional test was performed.

