# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user: NOVA Web (the agency — currently solo, Nicolás), the person who clones this template to start each new client project. Job to be done: spin up a new client website fast, from proven engineering and motion foundations, instead of rebuilding UX/motion basics per project.

End visitors of the sites built from this template (customers of local businesses, restaurants, brands, services) are the audience of each *client clone*, not of the template itself — their needs are captured per client project, not here.

## Product Purpose

Not a single end-user product: a reusable base template/scaffold cloned into `clients/cliente-<nombre-negocio>/` to start every new client website. Its purpose is to let NOVA Web deliver client sites quickly and consistently, without re-solving engineering and motion foundations for each new client. Success means each client project starts from a working, accessible motion system and clean component conventions, so delivery effort goes into client-specific content and design rather than infrastructure.

## Positioning

The differentiator is delivery speed and operational consistency, not a claim made to end clients. The template is a pre-solved operational asset — a working GSAP/ScrollTrigger motion system, accessible-by-default patterns, and component conventions — that lets NOVA Web ship each client project faster with a consistent quality floor. It is not a generic Astro + Tailwind scaffold: the motion system and its guardrails are the part that took real design work and would otherwise be rebuilt per client.

## Operating Context

Cloned into `clients/cliente-<nombre-negocio>/` per new client engagement (see `README.md`). Each clone becomes an independent codebase; `src/data/site.ts`, the brand palette in `src/styles/global.css` (`@theme` block), and `public/favicon.svg` are replaced per client. The template itself is never deployed — only its clones are, each to its own Vercel project.

## Capabilities and Constraints

- Confirmed stack: Astro (static output by default), Tailwind v4 via the Vite plugin (no `tailwind.config`, tokens live in `global.css` `@theme`), TypeScript strict mode, Lucide icons (`@lucide/astro`), ESLint + Prettier with Astro plugins, GSAP + ScrollTrigger motion system.
- Motion system audited 2026-08-31: hero entrance, scroll reveal, image reveal, progress line, magnetic hover, and navbar motion are confirmed installed, wired, and rendering.
- Known gap: `src/lib/motion/cardHover.ts` exists but is not imported anywhere, and its `data-hover-card` markup isn't used by any component — dead code as of the last audit.
- No visual/brand constraint is fixed across client projects — palette, typography, and content are 100% client-specific per clone.
- Optional backend (Supabase, email) is configured per client project via `.env.local` (never committed) — not part of the template's own runtime.

## Brand Commitments

None. Confirmed: no fixed brand or visual identity must be preserved across client sites — only the engineering and motion system persists between projects.

## Evidence on Hand

- `README.md` documents the stack, folder structure, local commands, and the clone-and-adapt workflow for new clients.
- `src/data/site.ts` holds placeholder/example data only — must never ship unchanged in a client delivery.
- Motion system (`src/lib/motion/*`) audited 2026-08-31: GSAP/ScrollTrigger confirmed installed; `hero`, `scrollReveal`, `imageReveal`, `progressLine`, `magnetic`, `textReveal` (`scrubWords`), and `navbar` confirmed wired into `index.astro`/`Navbar.astro`. `cardHover.ts` confirmed present but unused (see Capabilities and Constraints).

## Product Principles

- Ship consistent quality fast: every client project starts from the same proven engineering and motion foundation instead of rebuilding basics.
- Motion restraint (Kowalski principles): purposeful, accessible animation — `prefers-reduced-motion` respected everywhere, never novelty for its own sake.
- Zero fixed brand identity: the template imposes no visual identity on clients; palette, typography, and content are fully client-owned per project.
- Never ship placeholder content: `site.ts` example data must always be replaced before client delivery.
- The template's own history stays isolated from client repos so it can evolve safely as a shared, versioned asset.

## Accessibility & Inclusion

`prefers-reduced-motion` is respected throughout the motion system via `gsap.matchMedia` gating in every animated module (confirmed in the 2026-08-31 audit). Hover-only interactions are gated to devices with real hover (`canHover()`) to avoid false touch triggers.
