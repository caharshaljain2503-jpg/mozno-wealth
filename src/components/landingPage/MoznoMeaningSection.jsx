import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import moznoMeaningLogo from "../../assets/Mozno Wealth Logo New.png";

const SCRIPT_FONT =
  "'Dancing Script', 'Great Vibes', cursive";

const CORNER_MEANINGS = [
  "Smart, shielded, scaled wealth for modern India.",
  "Strategic investing that turns discipline into exponential growth",
  "Protect what you've built with robust safety nets.",
  "A calm cushion for life's surprises, quietly growing",
];

const CORNER_DESKTOP = [
  "md:absolute md:left-5 lg:left-7 md:top-[16%] md:max-w-[220px] lg:max-w-[250px] md:text-left",
  "md:absolute md:right-5 lg:right-7 md:top-[16%] md:max-w-[220px] lg:max-w-[250px] md:text-right",
  "md:absolute md:left-5 lg:left-7 md:bottom-[16%] md:max-w-[220px] lg:max-w-[250px] md:text-left",
  "md:absolute md:right-5 lg:right-7 md:bottom-[16%] md:max-w-[220px] lg:max-w-[250px] md:text-right",
];

const STROKE = "#6b5344";

/** Shield outline corners as fractions of the rendered logo box (PNG Mozno shield) */
function shieldCornersOnLogo(sx0, sy0, lw, lh) {
  return [
    { x: sx0 + lw * 0.13, y: sy0 + lh * 0.15 },
    { x: sx0 + lw * 0.87, y: sy0 + lh * 0.15 },
    { x: sx0 + lw * 0.15, y: sy0 + lh * 0.85 },
    { x: sx0 + lw * 0.85, y: sy0 + lh * 0.85 },
  ];
}

/** Text-side anchor: where the thread meets the copy */
function textAnchor(i, textRect, panelRect) {
  const x0 = textRect.left - panelRect.left;
  const y0 = textRect.top - panelRect.top;
  const midY = y0 + textRect.height / 2;
  const inset = 6;
  if (i === 0 || i === 2) {
    return { x: x0 + textRect.width - inset, y: midY };
  }
  return { x: x0 + inset, y: midY };
}

/** Elbow then horizontal run toward text (screenshot style) */
function elbowPath(sx, sy, ex, ey, i) {
  const leftSide = i === 0 || i === 2;
  const gap = Math.abs(sx - ex);
  const arm = Math.min(52, Math.max(20, gap * 0.42));
  if (leftSide) {
    const sx2 = sx - arm;
    return `M ${sx} ${sy} L ${sx2} ${ey} L ${ex} ${ey}`;
  }
  const sx2 = sx + arm;
  return `M ${sx} ${sy} L ${sx2} ${ey} L ${ex} ${ey}`;
}

function computeThreadGeometry(panelEl, logoEl, textEls) {
  if (!panelEl || !logoEl) return null;
  if (textEls.some((el) => !el)) return null;

  const pr = panelEl.getBoundingClientRect();
  const lr = logoEl.getBoundingClientRect();
  const pw = panelEl.clientWidth;
  const ph = panelEl.clientHeight;
  if (pw < 16 || ph < 16 || lr.width < 8) return null;

  const sx0 = lr.left - pr.left;
  const sy0 = lr.top - pr.top;
  const corners = shieldCornersOnLogo(sx0, sy0, lr.width, lr.height);

  const paths = corners.map((c, i) => {
    const tr = textEls[i].getBoundingClientRect();
    if (tr.width < 4 || tr.height < 4) return null;
    const end = textAnchor(i, tr, pr);
    const d = elbowPath(c.x, c.y, end.x, end.y, i);
    return { d, dotA: c, dotB: end };
  });

  if (paths.some((p) => !p)) return null;

  return { w: pw, h: ph, paths };
}

export default function MoznoMeaningSection({ compact = false }) {
  const scrollRef = useRef(null);
  const panelRef = useRef(null);
  const logoRef = useRef(null);
  const textRef0 = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const textRefs = [textRef0, textRef1, textRef2, textRef3];

  const [geom, setGeom] = useState(null);
  const [showMobileMeanings, setShowMobileMeanings] = useState(false);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 0.78", "end 0.38"],
  });

  const measureThreads = () => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) {
      setGeom(null);
      return;
    }
    const panel = panelRef.current;
    const logo = logoRef.current;
    const texts = textRefs.map((r) => r.current);
    const g = computeThreadGeometry(panel, logo, texts);
    setGeom(g);
  };

  useLayoutEffect(() => {
    measureThreads();
    const panel = panelRef.current;
    if (!panel) return undefined;

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(measureThreads);
    });
    ro.observe(panel);

    const onResize = () => requestAnimationFrame(measureThreads);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, { passive: true });

    const t = window.setTimeout(measureThreads, 120);
    const t2 = window.setTimeout(measureThreads, 400);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize);
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.03) setShowMobileMeanings(true);
  });
  useEffect(() => {
    if (scrollYProgress.get() > 0.03) setShowMobileMeanings(true);
  }, [scrollYProgress]);

  const tlT = useTransform(scrollYProgress, [0.04, 0.24], [0, 1]);
  const trT = useTransform(scrollYProgress, [0.14, 0.34], [0, 1]);
  const blT = useTransform(scrollYProgress, [0.26, 0.46], [0, 1]);
  const brT = useTransform(scrollYProgress, [0.38, 0.58], [0, 1]);
  const threadMVs = [tlT, trT, blT, brT];

  const tlDotS = useTransform(tlT, [0.02, 0.12], [0, 1]);
  const tlDotE = useTransform(tlT, [0.78, 1], [0, 1]);
  const trDotS = useTransform(trT, [0.02, 0.12], [0, 1]);
  const trDotE = useTransform(trT, [0.78, 1], [0, 1]);
  const blDotS = useTransform(blT, [0.02, 0.12], [0, 1]);
  const blDotE = useTransform(blT, [0.78, 1], [0, 1]);
  const brDotS = useTransform(brT, [0.02, 0.12], [0, 1]);
  const brDotE = useTransform(brT, [0.78, 1], [0, 1]);
  const dotStarts = [tlDotS, trDotS, blDotS, brDotS];
  const dotEnds = [tlDotE, trDotE, blDotE, brDotE];

  const tlTx = useTransform(scrollYProgress, [0.12, 0.3], [0, 1]);
  const tlTy = useTransform(scrollYProgress, [0.12, 0.3], [14, 0]);
  const trTx = useTransform(scrollYProgress, [0.22, 0.4], [0, 1]);
  const trTy = useTransform(scrollYProgress, [0.22, 0.4], [14, 0]);
  const blTx = useTransform(scrollYProgress, [0.34, 0.52], [0, 1]);
  const blTy = useTransform(scrollYProgress, [0.34, 0.52], [14, 0]);
  const brTx = useTransform(scrollYProgress, [0.46, 0.64], [0, 1]);
  const brTy = useTransform(scrollYProgress, [0.46, 0.64], [14, 0]);
  const textMotions = [
    { opacity: tlTx, y: tlTy },
    { opacity: trTx, y: trTy },
    { opacity: blTx, y: blTy },
    { opacity: brTx, y: brTy },
  ];

  const mobileThreadsOpacity = useTransform(
    scrollYProgress,
    [0.06, 0.18],
    [0, 1]
  );

  return (
    <div
      ref={scrollRef}
      className={`relative w-full max-w-5xl mx-auto px-0 sm:px-2 ${
        compact ? "min-h-[72vh] sm:min-h-[78vh] md:min-h-[82vh]" : "min-h-[125vh]"
      }`}
    >
      <div
        ref={panelRef}
        className="sticky top-20 sm:top-24 relative w-full py-4 sm:py-6 min-h-[520px] md:min-h-[470px]"
        role="img"
        aria-label="Mozno logo and meanings that appear as you scroll"
      >
        {geom ? (
          <svg
            className="absolute inset-0 hidden md:block h-full w-full z-[1] pointer-events-none"
            viewBox={`0 0 ${geom.w} ${geom.h}`}
            aria-hidden
          >
            {geom.paths.map((t, idx) => (
              <g key={idx}>
                <motion.path
                  d={t.d}
                  fill="none"
                  stroke={STROKE}
                  strokeOpacity={0.9}
                  strokeWidth={2.1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="2.5 6"
                  style={{ pathLength: threadMVs[idx] }}
                />
                <motion.circle
                  cx={t.dotA.x}
                  cy={t.dotA.y}
                  r={3.2}
                  fill={STROKE}
                  fillOpacity={0.95}
                  style={{ opacity: dotStarts[idx] }}
                />
                <motion.circle
                  cx={t.dotB.x}
                  cy={t.dotB.y}
                  r={3.2}
                  fill={STROKE}
                  fillOpacity={0.95}
                  style={{ opacity: dotEnds[idx] }}
                />
              </g>
            ))}
          </svg>
        ) : null}

        <div className="relative z-[3] flex flex-col md:block px-3 pt-6 pb-10 md:px-4 md:py-8 md:min-h-[470px]">
          <div className="flex justify-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <img
              ref={logoRef}
              src={moznoMeaningLogo}
              alt="Mozno Wealth shield logo"
              className="w-[min(100%,200px)] sm:w-[min(100%,250px)] md:w-[min(100%,290px)] h-auto object-contain select-none"
              decoding="async"
              onLoad={measureThreads}
            />
          </div>

          {showMobileMeanings ? (
            <div className="mt-10 flex flex-col gap-10 md:hidden">
              {CORNER_MEANINGS.map((text, idx) => (
                <div key={text} className="flex gap-3 items-start">
                  <motion.div
                    className="relative w-3 flex-shrink-0 self-stretch min-h-[3rem]"
                    style={{ opacity: mobileThreadsOpacity }}
                  >
                    <motion.div
                      className="absolute left-1/2 top-0 h-full w-0 -translate-x-1/2 border-l-[2px] border-dotted origin-top"
                      style={{
                        borderColor: STROKE,
                        scaleY: threadMVs[idx],
                      }}
                    />
                  </motion.div>
                  <motion.p
                    className="text-[1.05rem] sm:text-lg leading-snug text-gray-900 flex-1 pt-0.5 font-medium"
                    style={{
                      fontFamily: SCRIPT_FONT,
                      opacity: textMotions[idx].opacity,
                      y: textMotions[idx].y,
                    }}
                  >
                    {text}
                  </motion.p>
                </div>
              ))}
            </div>
          ) : null}

          {CORNER_MEANINGS.map((text, idx) => (
            <motion.p
              ref={textRefs[idx]}
              key={`desk-${text}`}
              className={`hidden md:block relative z-[2] text-lg lg:text-xl leading-snug text-gray-900 ${CORNER_DESKTOP[idx]}`}
              style={{
                fontFamily: SCRIPT_FONT,
                opacity: textMotions[idx].opacity,
                y: textMotions[idx].y,
              }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
