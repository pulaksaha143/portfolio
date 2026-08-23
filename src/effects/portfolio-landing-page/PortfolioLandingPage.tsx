import { useEffect, useRef, useState, type CSSProperties } from "react";

import {
  applyPageCustomization,
  splitTypographyProps,
  usePageTypography,
  type LandingPageCustomization,
  type PageTypographyProps,
} from "./pageTypography";
import { PORTFOLIO_TYPOGRAPHY } from "./pageRecipes";

export type LandingPageFrameProps = {
  className?: string;
  /** Loaded directly when the packaged document is byte-exact. */
  sourceUrl: string;
  style?: CSSProperties;
  title: string;
  /**
   * Typography and colour overrides, appended to the loaded document's own
   * head. The packaged file is never rewritten, so it stays byte-exact.
   */
  customization?: LandingPageCustomization;
};

export type LandingPageProps = Omit<LandingPageFrameProps, "sourceUrl" | "title" | "customization">;

const FRAME_SANDBOX = "allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts";

export function LandingPageFrame({ className = "", customization, sourceUrl, style, title }: LandingPageFrameProps) {
  const [ready, setReady] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // Re-applied on every change; the load handler covers the first paint and
  // any navigation the page does inside its own frame.
  useEffect(() => {
    applyPageCustomization(frameRef.current, customization);
  }, [customization]);

  return (
    <div
      className={`landing-page-frame${className ? ` ${className}` : ""}`}
      data-state={ready ? "ready" : "loading"}
      style={{ position: "relative", overflow: "hidden", background: "#080808", pointerEvents: "auto", ...style }}
    >
      <iframe
        ref={frameRef}
        title={title}
        src={sourceUrl}
        sandbox={FRAME_SANDBOX}
        loading="eager"
        onLoad={(event) => {
          applyPageCustomization(event.currentTarget, customization);
          setReady(true);
        }}
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
          background: "#080808",
        }}
      />
    </div>
  );
}

export function PortfolioLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(PORTFOLIO_TYPOGRAPHY, type);
  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title="Pulak Saha Portfolio"
      sourceUrl={`${import.meta.env.BASE_URL}landing-pages/portfolio.html`}
    />
  );
}
