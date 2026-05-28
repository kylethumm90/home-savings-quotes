# SPM Solar — Google Ads build plan (sub-$75 CPL)

Lead-gen Search campaign feeding the HomeSavingsQuotes funnel. Goal: keep cost
per lead (a completed quote submission) under $75. Assets referenced below live
in this folder.

---

## 0. Prerequisites — do these before spending a dollar

The funnel had **no conversion tracking**; it's now wired in code (gtag fires a
`conversion` event the moment a quote is submitted — see `src/lib/gtag.ts`).
Because the funnel is a single-page app (landing → quiz → thanks all share one
URL with no reload), a URL-based or pageview conversion would never fire — the
event-based approach is required.

1. **Conversion action**: in Google Ads → Goals → Conversions, confirm the
   "Lead" action (you said it exists). Category = *Submit lead form*. Count =
   *One*. Mark it the campaign's **primary / optimization goal**.
2. **Enhanced conversions for leads**: turn ON for that action (Google/third-party
   tag method). The funnel already passes email, phone, name and ZIP for hashing.
3. **Drop in your IDs**: set these env vars where the site is built/hosted
   (e.g. Vercel → Project → Environment Variables). See `.env.example`.
   - `VITE_GADS_CONVERSION_ID` = `AW-XXXXXXXXXX`
   - `VITE_GADS_CONVERSION_LABEL` = the part after the `/` in `send_to`
   - `VITE_GADS_CONVERSION_VALUE` (optional) = a per-lead $ value for value bidding
4. **Deploy, then verify**: load the live site, complete a test quote, and use
   Google Tag Assistant to confirm the `conversion` event fires on submit.
   Don't launch ads until you've seen a real test conversion land in Ads.

---

## 1. Campaign settings

- **Type**: Search. **Networks**: uncheck "Display Network" and "Search
  partners" at launch (turn on partners later only if CPL holds).
- **Locations**: the 4,063 ZIPs in `locations/`. Paste the
  `bulk-paste-part*.txt` files (≤1,000 each) into Locations → Advanced search →
  Bulk locations. **Set location option to "Presence: people in your targeted
  locations"** — not "presence or interest." This is a big CPL/lead-quality lever.
- **Language**: English. (Spanish optional — FL/TX/CA/NY have large Spanish-
  speaking demand; only add if you have Spanish ads + LP.)
- **Audiences**: add In-market → "Solar Energy" / "Home Improvement" and a
  Homeowners demographic in **Observation** mode (not Targeting) for bid insight.
- **Ad rotation**: Optimize. **Ad schedule**: all day to start (let bidding learn).

## 2. Bidding ramp (how you actually hold $75)

Do **not** set Target CPA $75 on day one — with no conversion history it will
barely spend.

1. **Weeks 1–2/3**: bid = **Maximize Conversions** (no target). Collect data.
2. **At ~15–30 conversions** in the trailing 30 days: switch to **Target CPA**.
   Start the target a little loose (~$90) and ratchet down to $75 over a week or
   two so you don't choke volume.
3. **Budget**: give the algorithm room — plan a daily budget of **3–5× your
   target CPA** (~$225–$375/day) for healthy learning. A leaner $100–$150/day
   works but learns slower and is noisier. Budget ≠ what you'll spend; tCPA
   pulls back once it's optimizing.

## 3. Structure & creative

- **Ad groups**: 6 tightly-themed groups (Quotes, Cost, Installers, Savings,
  Incentives, Residential). Keywords in `keywords.csv`. Start phrase + exact;
  add broad only after tCPA is live and negatives are built out.
- **Negatives**: attach `negative-keywords.txt` as a shared list. Mine the
  Search Terms report weekly and keep adding — this is the #1 ongoing CPL lever.
- **Ads**: 2 RSAs per ad group from `responsive-search-ad.csv` (15 headlines /
  4 descriptions). Pin the H1 options to position 1; leave the rest unpinned.
- **Extensions**: add everything in `ad-extensions.txt` (callouts, sitelinks,
  structured snippet). Higher Ad Rank → lower CPC → lower CPL.

## 4. Tracking template / UTMs

Auto-tagging (gclid) ON. Set a **Final URL suffix** at the campaign level so the
funnel's existing UTM capture (and Make.com) records the source:

```
utm_source=google&utm_medium=cpc&utm_campaign=spm-solar-search&utm_term={keyword}&utm_content={creative}
```

## 5. Levers if CPL runs hot (> $75)

- Tighten match types (broad → phrase → exact) and add negatives.
- Drop the worst ZIPs/states by CPL (use the Locations report; TX/PA/FL/NJ carry
  most of the volume — judge each on its own CPL).
- Dayparting once you see when cheap leads convert.
- Device bid adjustments if mobile vs. desktop CPL diverge.
- Improve the landing page (only `LandingBold` is currently served — see note).
- Consider optimizing toward `quiz_start` (already tracked) as a secondary
  signal while lead volume is too low for stable tCPA.

## 6. Notes / gaps

- **Landing page variants**: `src/variants/` has three (Bold, Sunlit, Trust) but
  `App.tsx` always renders `LandingBold`. If you want to A/B test, that needs a
  routing/Optimize setup — flag if you want it.
- I can't access your Google Ads account from here, so this is the build kit +
  the code change. Everything in Google Ads itself you (or I, if you paste me
  access details) apply via the UI / Google Ads Editor.
