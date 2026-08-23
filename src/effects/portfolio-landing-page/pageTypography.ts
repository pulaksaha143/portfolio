import { useMemo } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   Typography and colour controls for the packaged landing pages.

   The Portfolio document is a complete authored file served byte-for-byte
   inside a sandboxed frame, so nothing is rewritten on the way in. The
   controls work the only way that leaves the document untouched: one
   stylesheet appended to the frame's own <head> once it has loaded,
   restating the page's own selectors with the chosen values.

   At their defaults every override restates exactly what the page
   already says, so a prop-less render paints the authored page and
   nothing else.
   ═══════════════════════════════════════════════════════════════════════ */

export type PageFont = {
  value: string;
  label: string;
  stack: string;
  /** Google Fonts css2 family spec. Absent for a face the page already carries. */
  google?: string;
};

/** Shared alternatives offered alongside each page's authored faces. */
export const INSTRUMENT_SERIF: PageFont = {
  value: "instrument-serif",
  label: "Instrument Serif",
  stack: '"Instrument Serif", Georgia, serif',
  google: "Instrument+Serif",
};

export const NEWSREADER: PageFont = {
  value: "newsreader",
  label: "Newsreader",
  stack: '"Newsreader", Georgia, serif',
  google: "Newsreader:wght@200..700",
};

export const GEIST: PageFont = {
  value: "geist",
  label: "Geist",
  stack: '"Geist", system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
  google: "Geist:wght@100..900",
};

export type PageTypographyProps = {
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string;
  bodyWeight?: string;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
};

/** Resolved, clamped values plus the colour helpers a recipe writes its CSS with. */
export type PageTypography = {
  heading: string;
  body: string;
  headingWeight: string;
  bodyWeight: string;
  primary: string;
  headingSize: number;
  bodySize: number;
  headingLetterSpacing: number;
  /**
   * Move one of the page's authored colours by the same shift the primary
   * took. Keeps a palette's internal relationships — a lighter tint stays
   * the lighter tint — instead of flattening every accent onto one hex.
   */
  retone: (hex: string) => string;
  /** The same shift applied to an authored `rgb()` / `rgba()` string, alpha kept. */
  retoneRgba: (color: string) => string;
};

export type PageTypographyRecipe = {
  headingFonts: readonly PageFont[];
  bodyFonts: readonly PageFont[];
  /** Offered weights, in slider order, and the one the page is authored at. */
  headingWeights: readonly string[];
  headingWeight: string;
  bodyWeights: readonly string[];
  bodyWeight: string;
  /** The page's authored primary, and the base every retone is measured from. */
  primaryColor: `#${string}`;
  /** [min, default, max] */
  headingSize: readonly [number, number, number];
  bodySize: readonly [number, number, number];
  headingLetterSpacing: readonly [number, number, number];
  css: (type: PageTypography) => string;
};

export type LandingPageCustomization = {
  css: string;
  /** Set only when a chosen face has to be fetched. */
  fontHref?: string;
};

/* ── colour ──────────────────────────────────────────────────────────── */

type Hsl = { h: number; s: number; l: number };

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

function normalizeHex(value: string | undefined, fallback: string) {
  if (typeof value !== "string") return fallback;
  const match = value.trim().match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  if (!match) return fallback;
  const digits = match[1].toLowerCase();
  return `#${digits.length === 3 ? digits.replace(/./g, (d) => d + d) : digits}`;
}

function hexToHsl(hex: string): Hsl {
  const [red, green, blue] = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const l = (max + min) / 2;
  const delta = max - min;
  if (delta === 0) return { h: 0, s: 0, l };
  const s = delta / (1 - Math.abs(2 * l - 1));
  const base = max === red
    ? ((green - blue) / delta) % 6
    : max === green ? (blue - red) / delta + 2 : (red - green) / delta + 4;
  return { h: (base * 60 + 360) % 360, s, l };
}

function hslToRgb({ h, s, l }: Hsl) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0]
    : h < 120 ? [x, c, 0]
    : h < 180 ? [0, c, x]
    : h < 240 ? [0, x, c]
    : h < 300 ? [x, 0, c]
    : [c, 0, x];
  return [r + m, g + m, b + m].map((channel) => Math.round(clamp01(channel) * 255));
}

function hslToHex(hsl: Hsl) {
  return `#${hslToRgb(hsl).map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

/**
 * The shift from the page's authored primary to the chosen one, as a hue
 * rotation and a saturation / lightness ratio. Ratios rather than offsets so
 * a palette keeps its shape: a soft tint stays proportionally soft.
 */
function colorShift(base: string, target: string) {
  const from = hexToHsl(base);
  const to = hexToHsl(target);
  return {
    hue: to.h - from.h,
    saturation: from.s > 0.01 ? Math.min(3, to.s / from.s) : 1,
    lightness: from.l > 0.01 ? Math.min(3, to.l / from.l) : 1,
  };
}

/* ── options ─────────────────────────────────────────────────────────── */

function selectFont(value: string | undefined, options: readonly PageFont[]) {
  return options.find((option) => option.value === value) ?? options[0];
}

function selectWeight(value: string | undefined, options: readonly string[], fallback: string) {
  return options.includes(value as string) ? (value as string) : fallback;
}

function clampRange(value: number | undefined, [min, fallback, max]: readonly [number, number, number]) {
  return Number.isFinite(value) ? Math.min(max, Math.max(min, value as number)) : fallback;
}

function fontHrefFor(fonts: readonly PageFont[]) {
  const families = [...new Set(fonts.map((font) => font.google).filter((family): family is string => Boolean(family)))];
  if (!families.length) return undefined;
  return `https://fonts.googleapis.com/css2?${families.map((family) => `family=${family}`).join("&")}&display=swap`;
}

/**
 * Peel the eight control props off a page's props so the rest can go straight
 * to the frame.
 */
export function splitTypographyProps<T extends PageTypographyProps>(props: T) {
  const { headingFont, bodyFont, headingWeight, bodyWeight, primaryColor, headingSize, bodySize, headingLetterSpacing, ...rest } = props;
  const type: PageTypographyProps = {
    headingFont,
    bodyFont,
    headingWeight,
    bodyWeight,
    primaryColor,
    headingSize,
    bodySize,
    headingLetterSpacing,
  };
  return [type, rest as Omit<T, keyof PageTypographyProps>] as const;
}

/* ── the hook every page in this family uses ─────────────────────────── */

export function usePageTypography(recipe: PageTypographyRecipe, props: PageTypographyProps): LandingPageCustomization {
  const { headingFont, bodyFont, headingWeight, bodyWeight, primaryColor, headingSize, bodySize, headingLetterSpacing } = props;

  return useMemo(() => {
    const heading = selectFont(headingFont, recipe.headingFonts);
    const body = selectFont(bodyFont, recipe.bodyFonts);
    const primary = normalizeHex(primaryColor, recipe.primaryColor);
    const untouched = primary === recipe.primaryColor;
    const shift = colorShift(recipe.primaryColor, primary);

    const retone = (hex: string) => {
      if (untouched) return hex;
      const source = hexToHsl(normalizeHex(hex, hex));
      return hslToHex({
        h: (source.h + shift.hue + 360) % 360,
        s: clamp01(source.s * shift.saturation),
        l: clamp01(source.l * shift.lightness),
      });
    };

    const retoneRgba = (color: string) => {
      if (untouched) return color;
      const match = color.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[,/]\s*([\d.]+%?)\s*)?\)$/i);
      if (!match) return color;
      const hex = `#${[match[1], match[2], match[3]]
        .map((channel) => Math.round(Number(channel)).toString(16).padStart(2, "0"))
        .join("")}`;
      const [red, green, blue] = [1, 3, 5].map((index) => Number.parseInt(retone(hex).slice(index, index + 2), 16));
      return match[4] === undefined
        ? `rgb(${red}, ${green}, ${blue})`
        : `rgba(${red}, ${green}, ${blue}, ${match[4]})`;
    };

    const type: PageTypography = {
      heading: heading.stack,
      body: body.stack,
      headingWeight: selectWeight(headingWeight, recipe.headingWeights, recipe.headingWeight),
      bodyWeight: selectWeight(bodyWeight, recipe.bodyWeights, recipe.bodyWeight),
      primary,
      headingSize: clampRange(headingSize, recipe.headingSize),
      bodySize: clampRange(bodySize, recipe.bodySize),
      headingLetterSpacing: clampRange(headingLetterSpacing, recipe.headingLetterSpacing),
      retone,
      retoneRgba,
    };

    return { css: recipe.css(type), fontHref: fontHrefFor([heading, body]) };
  }, [recipe, headingFont, bodyFont, headingWeight, bodyWeight, primaryColor, headingSize, bodySize, headingLetterSpacing]);
}

/* ── injection ───────────────────────────────────────────────────────── */

const STYLE_ID = "threeui-page-typography";
const FONT_LINK_ID = "threeui-page-typography-fonts";

/**
 * Appended to the frame's own head rather than written into the document, so
 * the packaged file stays byte-exact. Re-appending on every update keeps the
 * sheet last in the head, which is what lets it win against the page's own
 * rules at equal specificity without a single !important.
 */
export function applyPageCustomization(frame: HTMLIFrameElement | null, customization?: LandingPageCustomization) {
  const frameDocument = frame?.contentDocument;
  if (!frameDocument?.head) return;

  const existingLink = frameDocument.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (customization?.fontHref) {
    const link = existingLink ?? frameDocument.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    if (link.getAttribute("href") !== customization.fontHref) link.href = customization.fontHref;
    if (!existingLink) frameDocument.head.append(link);
  } else {
    existingLink?.remove();
  }

  if (!customization?.css) {
    frameDocument.getElementById(STYLE_ID)?.remove();
    return;
  }

  const style = (frameDocument.getElementById(STYLE_ID) as HTMLStyleElement | null) ?? frameDocument.createElement("style");
  style.id = STYLE_ID;
  if (style.textContent !== customization.css) style.textContent = customization.css;
  frameDocument.head.append(style);
}
