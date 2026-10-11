# Nerzon.Online brand refresh — proposed change plan

Date: 2026-10-11. Status: proposed, awaiting owner direction.

## Objective and constraints
Make the landing page a minimal branded gateway whose primary action is Open Full Console. Preserve the interactive persona photos on the console; remove the entire persona switcher and photo imports from the landing page. No automatic commits, pushes, or deployment. Review changes on localhost first.

## Brand source
G:/ProjectBranding-Nerzon Online/brand-guidelines.html and Logo/. Existing web copies are under react-app/public/assets/branding/.
Use Light.png and LightLandScapeLogo.png on dark surfaces, preserve aspect ratio and lockup, and maintain the specified half-mark-height clear space. Minimum logomark size 24 px. Verify transparency, edges and legibility against the actual dark background before reuse. Do not redraw, distort, recolor, split, or heavily shadow the mark.
Align palette with Cyber Lime #b8f04a, Void Black #0a0c0e, Platinum #f3f4f6, Telemetry Cyan #00f0ff and Alert Amber #ffb703. Review neutral surfaces and border variants against the brand book. Use existing self-hosted Space Grotesk, Instrument Sans and JetBrains Mono.

## Recommended visual direction
Quiet branded entrance, richer interactive console. A spacious hero with personal name, one clear statement about operations/web/AI, brief human introduction and one dominant lime Open Full Console button. Small secondary contact/CV links. A restrained decorative console preview on desktop, placed below the action on mobile. No competing full contact card, persona controls, clocks, sound meter or large personality CTA on the landing page. Full console retains richer tools and content.

## Phase 1 — brand and landing page
- Replace current landing bento layout with focused hero, primary action, concise introduction and small secondary links.
- Put Full Console above the fold on common phones and desktop; keep content scrollable on small or landscape screens.
- Header: landscape logo where legible; emblem on narrow screens. Footer: landscape logo with adequate space and simplified supporting content. Logo links return home.
- Apply canonical color, typography, spacing, focus and interaction rules across shared components and page surfaces.
- Landing background: quiet grid/light accent; reserve heavier particles, plasma, custom cursor and audio interactions for console where appropriate.

## Phase 2 — brief brand entrance
- Whole-mark fade/settle with a restrained surrounding light cue, approximately 600–900 ms maximum, once per tab session.
- Do not invent percentage progress or delay already-ready content to finish a timer. Under real loading, use an honest loading state and failure recovery.
- Reduced motion: instant or minimal fade. No audio. No replay on every navigation. Ensure content remains usable if storage or image loading fails.
- Use existing Motion and CSS; this is an in-app transition, not an exported video.

## Phase 3 — focused console improvements
- Keep the existing persona gallery; add accessible previous/next selection and pause/resume for automatic cycling.
- Make project exploration clearer using existing project filters and detail views, with explicit live-demo links and concise problem/solution/outcome content.
- Align command palette section numbering and destinations with all eight console sections; fix and verify hash scrolling.
- Improve active section navigation on desktop and a compact mobile section control without obscuring content.
- Offer reduced effects on constrained devices and stop unnecessary background work when hidden.

## Optional second pass
- Console preview that reveals the three areas Work / Systems / Experience on hover, focus or tap, all entering the same console.
- Shareable console section/project links.
- Clear reduced-effects preference and return-visitor Continue to Console shortcut.
- Refine the existing pipeline with user-triggered step explanations rather than adding decorative dashboards.
Defer a chatbot, account system, new 3D engine, autoplay audio and heavy entrance sequence unless a specific user need emerges.

## Scope and implementation reach
Primary: MinimalHubPage.tsx, Navbar.tsx, Footer.tsx, App.tsx, styles/global.css and branding assets.
Entrance: small focused loading/intro component only if needed, reusing useReducedMotion and Motion.
Console: HeroSection.tsx, CommandPalette.tsx, HomePage.tsx and RecentProjectsSection.tsx as required by approved features. Check shared styles against PersonalityPage and PlasmaLabPage. Review metadata/manifest brand consistency; preserve routes, CV and contact actions.
Load nonlanding routes on demand; fetch large portraits only when needed. Optimize existing assets without altering logo appearance. No dependency required for baseline plan.

## Local review and acceptance
Current unchanged app is running at http://127.0.0.1:5173/ (console /console).
Implement in reviewable stages: landing and brand, entrance, then approved console enhancements. Keep all changes uncommitted.
Run production build and lint after changes. Check phones at 320/375/390/430 px, tablets at 768/1024 px and desktop at 1440/1920 px, plus landscape, keyboard and reduced motion. Check primary action visibility, touch targets, focus, logo clear space, no horizontal overflow, direct route reloads, section jumps, CV/contact links, and entrance behavior. Add a small focused behavioral check for new nontrivial loading/navigation logic; no new test framework solely for cosmetic changes.
No promise that visual changes alone will increase console clicks; conversion measurement would require separately approved analytics.

## Implemented local review — 2026-10-11
Owner refinement: keep the existing effects. Changes are local and uncommitted.
Implemented: simplified branded landing and first-screen Full Console CTA; landing personas removed; console portrait uses proportional contain framing and native keyboard/previous/next/pause controls; Architect block removed and footer link retained; landscape footer logo; corrected Telegram to @nerzon022; WhatsApp and owner-supplied Facebook page added; responsive project cards with eight lightweight illustrated covers and existing status filters; routes split on demand; plasma pauses in hidden tabs; console hash scrolling and section numbering corrected; responsive header tightened.
The loading fallback uses the official emblem only while a route is actually loading. The dedicated once-per-session entrance choreography remains proposed for a later review. Project covers are custom illustrations, not website screenshots or official client logo replacements.

### Verification
- Production build passed; lint passed with six pre-existing warnings and no errors.
- Initial JS: 398.37 kB / 127.65 kB gzip versus baseline 499.27 kB / 155.07 kB gzip. This measures bundle size, not a page-speed score.
- Console inspected at widths 320, 390, 768, 1024 and 1440 px: no horizontal overflow, full portrait framing, cards in 1/2/3 columns.
- Landing CTA stays within first screen at 320x568, 390x844, 768x1024 and 1440x1000; no landing persona images.
- All/Active/Shipped filters checked (8/5/3), all eight covers loaded, keyboard persona selection works and pauses automatic cycling.
- Console, portfolio alias, personality and plasma routes loaded; console section hash entry checked; browser error log empty in final checks.
- Reusable passive browser checks saved at react-app/checks/brand-refresh.browser.js. Preview images in docs/previews/.
- Reduced-motion behavior reviewed in source; no physical-device, throttled-network, Lighthouse or live deployment test. Existing full-size portrait assets remain; only console visits fetch them.
