# AA Solutions — portfolio & marketing site

A production-ready marketing site for an app and web development studio, built with
Next.js App Router, TypeScript and Tailwind CSS. All copy and project data lives in
`/content`, so the site can be re-branded and extended without touching components.

---

## Stack

| Layer           | Choice                                                     |
| --------------- | ---------------------------------------------------------- |
| Framework       | Next.js 16 (App Router, Turbopack, Cache Components)       |
| Language        | TypeScript (strict, no `any`)                              |
| Styling         | Tailwind CSS v4 + shadcn/ui (Base UI primitives)           |
| Motion          | Framer Motion (respects `prefers-reduced-motion`)          |
| Forms           | React Hook Form + Zod (validated on client **and** server) |
| Email           | Resend                                                     |
| Spam protection | Cloudflare Turnstile + in-memory rate limiting             |
| Analytics       | Vercel Analytics, optional Plausible or GA4                |
| Long-form copy  | MDX case studies                                           |
| Testing         | Playwright smoke tests + Lighthouse CI                     |
| Hosting         | Vercel                                                     |

No database, CMS or authentication is used.

---

## Getting started

**Requirements:** Node.js 20+ (developed on Node 24), npm 10+.

```bash
npm install
cp .env.example .env.local     # then fill in the values
npm run dev
```

Open <http://localhost:3000>.

The contact form works without any keys in development: it logs the submission to the
terminal and skips Turnstile. Production requires the keys described below.

### Environment variables

See `.env.example`. Everything is optional locally.

| Variable                         | Required in production | Purpose                                         |
| -------------------------------- | ---------------------- | ----------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | Yes                    | Canonical URLs, sitemap, robots, OG URLs        |
| `RESEND_API_KEY`                 | Yes                    | Sends enquiry notifications and auto-replies    |
| `CONTACT_TO_EMAIL`               | Yes                    | Where enquiries are delivered                   |
| `CONTACT_FROM_EMAIL`             | Recommended            | Verified sender (defaults to Resend onboarding) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes                    | Renders the Turnstile widget                    |
| `TURNSTILE_SECRET_KEY`           | Yes                    | Verifies tokens server-side                     |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`   | No                     | Enables Plausible analytics                     |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`  | No                     | Enables GA4 analytics                           |

> Turnstile fails closed in production if `TURNSTILE_SECRET_KEY` is missing, so a
> forgotten key can never silently disable spam protection.

---

## Scripts

| Command                | What it does                                               |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Start the dev server (regenerates the screenshot manifest) |
| `npm run build`        | Production build                                           |
| `npm start`            | Serve the production build                                 |
| `npm run lint`         | ESLint (zero warnings expected)                            |
| `npm run typecheck`    | `tsc --noEmit`                                             |
| `npm run format`       | Prettier write                                             |
| `npm run format:check` | Prettier check                                             |
| `npm run screenshots`  | Capture project screenshots with Playwright                |
| `npm run test:e2e`     | Playwright smoke tests                                     |
| `npm run lighthouse`   | Lighthouse CI (run `npm run build` first)                  |

---

## Project structure

```
app/
  layout.tsx              Root layout: fonts, theme, header/footer, JSON-LD
  page.tsx                Home
  services/page.tsx       Services + FAQ
  work/page.tsx           Filterable project grid
  work/[slug]/page.tsx    Case study (MDX-enhanced)
  process/page.tsx        Delivery process
  about/page.tsx          Story, values, founder
  contact/page.tsx        Contact details + form
  privacy/page.tsx        Privacy policy template
  api/contact/route.ts    Form endpoint (validate → rate limit → Turnstile → Resend)
  sitemap.ts, robots.ts   SEO routes
  opengraph-image.tsx     Social cards (one per route)
components/
  layout/                 Header, footer, wordmark, theme toggle/provider
  sections/               Reusable page sections
  ui/                     shadcn/ui primitives
  project-image.tsx       Screenshot with designed placeholder fallback
  contact-form.tsx        Client form
content/
  site.ts                 Company name, contact details, nav, socials  ← start here
  services.ts             Services + FAQs
  projects.ts             Project list
  process.ts              Process steps
  about.ts                Story, values, founder
  testimonials.ts         Testimonials (empty → section hidden)
  privacy.ts              Privacy policy copy
  case-studies/*.mdx      Long-form case studies
  screenshot-manifest.json Generated list of available screenshots
lib/
  seo.ts                  Metadata, canonical URLs, JSON-LD builders
  validators.ts           Shared Zod schemas
  email.ts                Resend templates
  turnstile.ts            Server-side token verification
  rate-limit.ts           In-memory limiter
scripts/
  capture-screenshots.ts  Playwright screenshot capture
  build-screenshot-manifest.mjs
```

---

## Editing content

### Rename the company

1. Change `name`, `legalName`, `tagline` and `description` in `content/site.ts`.
2. Update `contact` (email, WhatsApp, location) and `socials` there too.
3. Update the `AA` monogram in `components/layout/wordmark.tsx` if you have a logo.

Everything else — header, footer, metadata, JSON-LD, emails — reads from this file.

### Add a project

1. Add an entry to `content/projects.ts` following the existing shape. Set
   `featured: true` to show it on the home page.
2. Add screenshots to `public/projects/<slug>/` (see below).
3. Optional: create `content/case-studies/<slug>.mdx` and set `hasCaseStudy: true`,
   then register the import in `app/work/[slug]/page.tsx`.
4. Run `npm run dev` (or `npm run screenshots`) to regenerate the manifest.

`challenge`, `solution`, `tech` and `results` are intentionally nullable. Leave them
empty until the details are confirmed — the UI renders a clearly marked TODO state
rather than inventing numbers.

### Add screenshots

Put these files in `public/projects/<slug>/`:

| File            | Size     | Used for                  |
| --------------- | -------- | ------------------------- |
| `cover.png`     | 1440×900 | Cards and case-study hero |
| `desktop-1.png` | 1440×900 | Key screens               |
| `desktop-2.png` | 1440×900 | Key screens               |
| `mobile-1.png`  | 390×844  | Key screens (phone frame) |

If a file is missing, a designed placeholder is shown — no code changes needed.

To capture automatically from each project's `liveUrl`:

```bash
npm run screenshots            # all projects
npm run screenshots -- fastq   # one project
```

The script visits each site as a signed-out visitor. **Check the output**: cookie
banners, login walls or interstitials will be captured as-is, and some sites need
longer than the default 2.5s settle time (adjust `SETTLE_MS`).

### Add testimonials

Add real, permission-granted quotes to `content/testimonials.ts`. The section is
hidden while the array is empty, so the site never shows invented social proof.

### Founder details

Replace the placeholders in `content/about.ts`, and drop a photo in `public/team/`
then set `founder.photo`.

---

## Contact form

Flow: client validation → `/api/contact` → server validation → honeypot check →
rate limit → Turnstile verification → Resend notification + auto-reply.

- **Resend**: verify a domain, then set `CONTACT_FROM_EMAIL` to an address on it.
- **Turnstile**: create a widget for your domain; add both keys.
- **Rate limiting**: 5 submissions per IP per 10 minutes, held in memory. Serverless
  instances do not share memory, so for stronger protection swap the store in
  `lib/rate-limit.ts` for Upstash Redis or Vercel KV.
- Errors are logged server-side; visitors always see a generic message.

---

## Analytics

Vercel Analytics is enabled on Vercel deployments. Plausible or GA4 loads only when the matching
environment variable is set. The contact form fires a `contact_submit` conversion
event via `lib/analytics.ts`.

---

## SEO

- Per-route `metadata` with canonical URLs (`lib/seo.ts`).
- Generated Open Graph/Twitter cards for every route (`opengraph-image.tsx`).
- JSON-LD: Organization, WebSite, Service, FAQPage, ContactPage, CreativeWork.
- `sitemap.xml` and `robots.txt` are generated from the content layer.
- Set `NEXT_PUBLIC_SITE_URL` before deploying so canonicals and OG URLs are correct.

---

## Accessibility & performance

- Semantic landmarks, a skip link, visible focus rings, labelled form controls.
- AA-contrast palette, light and dark themes.
- Motion is subtle and disabled for `prefers-reduced-motion`.
- No horizontal scroll at 360px.
- Images use `next/image` with explicit `sizes`; fonts are self-hosted via `next/font`.

---

## Testing

```bash
npm run test:e2e        # Playwright: navigation, filtering, form, theme, 404
npm run build           # Lighthouse needs a production build
npm run lighthouse      # Lighthouse CI thresholds (90+ per category)
```

Playwright starts the production server automatically when one is not already running.

---

## Deploy to Vercel

1. Push the repository to GitHub/GitLab.
2. Import it in Vercel — the framework is detected automatically.
3. Add every variable from `.env.example` (at minimum `NEXT_PUBLIC_SITE_URL`,
   `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, both Turnstile keys).
4. Deploy, then add your custom domain and set `NEXT_PUBLIC_SITE_URL` to it.
5. Redeploy so canonical and Open Graph URLs use the final domain.

---

## Remaining TODOs before launch

These are intentionally visible placeholders — search for `TODO` to find them all.

- [ ] `content/site.ts` — real email, WhatsApp number, location, social links and
      founding year.
- [ ] `content/about.ts` — founder name, role, bio, photo (`/public/team/`).
- [ ] `content/privacy.ts` — effective date, privacy contact email; **legal review**.
- [ ] `content/projects.ts` — challenge, solution, tech stack and results for each
      project, once confirmed with the client.
- [ ] `content/testimonials.ts` — add real quotes when available.
- [ ] `.env.local` — Resend + Turnstile keys.
- [ ] Replace the `AA` monogram with a real logo if one exists.
- [ ] Review captured screenshots for cookie banners or login walls.

> **Attribution note:** the live Grizzly Public School and JTGC sites both credit
> "Zarvis.in" in their footers. Confirm the correct project attribution before
> publishing those case studies.
