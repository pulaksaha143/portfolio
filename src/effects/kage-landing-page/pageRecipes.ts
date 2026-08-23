import {
  GEIST,
  INSTRUMENT_SERIF,
  NEWSREADER,
  type PageFont,
  type PageTypographyRecipe,
} from "./pageTypography";

/* ═══════════════════════════════════════════════════════════════════════
   The Kage recipe, trimmed from the family cookbook to the one page this
   project serves. It restates the document's own typographic decisions as
   its defaults, so the override sheet is a no-op until something is moved.
   Where a page sizes its type with clamp(), the control drives the clamp's
   ceiling and the authored floor and preferred term are left alone — the
   page keeps responding to width exactly as written.
   ═══════════════════════════════════════════════════════════════════════ */

const n = (value: number) => Number(value.toFixed(3));
const px = (value: number) => `${n(value)}px`;

/** The authored face, carried inside the document's own font stylesheet. */
const ONEST: PageFont = {
  value: "onest",
  label: "Onest",
  stack: "'Onest', system-ui, -apple-system, 'Helvetica Neue', sans-serif",
};

/* ── Kage ────────────────────────────────────────────────────────────────
   Two display scales, .h-hero and .h-sec, both clamped. The control drives
   the hero ceiling and the section ceiling follows at its authored 60/46.
   Headings carrying .jp are left out: that class selects the Japanese face,
   and it would lose the cascade to a bare element selector. */
export const KAGE_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [ONEST, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [ONEST, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["400", "500", "600", "700"],
  headingWeight: "400",
  bodyWeights: ["300", "400", "500", "600"],
  bodyWeight: "300",
  primaryColor: "#e0231c",
  headingSize: [30, 46, 72],
  bodySize: [13, 17, 24],
  headingLetterSpacing: [-0.06, -0.012, 0.12],
  css: (type) => `
:root {
  --vermilion: ${type.primary};
  --ember: ${type.retone("#ff5a3c")};
}
body { font-family: ${type.body}; }
body, .body, .body-lg, .num { font-weight: ${type.bodyWeight}; }
h1:not(.jp), h2:not(.jp), h3:not(.jp), .display:not(.jp) {
  font-family: ${type.heading};
  font-weight: ${type.headingWeight};
}
.display { letter-spacing: ${type.headingLetterSpacing}em; }
.h-hero { font-size: clamp(26px, 3.05vw, ${px(type.headingSize)}); }
.h-sec { font-size: clamp(30px, 4vw, ${px((type.headingSize * 60) / 46)}); }
.body-lg { font-size: clamp(14px, 1.02vw, ${px(type.bodySize)}); }
.body { font-size: ${px(Math.max(11, type.bodySize - 3))}; }
`,
};
