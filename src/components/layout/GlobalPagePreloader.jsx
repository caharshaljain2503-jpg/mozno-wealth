import React, { useCallback, useEffect, useRef, useState } from "react";
import { useIsFetching } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import MoznoLogoPreloader from "../common/MoznoLogoPreloader";

const MIN_DISPLAY_MS = 500;
const SETTLE_MS = 350;
const MAX_DISPLAY_MS = 12000;

/**
 * Keeps the branded preloader visible until the current route, data requests,
 * fonts, and rendered images have finished loading.
 */
const GlobalPagePreloader = () => {
  const location = useLocation();
  const isFetching = useIsFetching();
  const [active, setActive] = useState(true);
  const startedAtRef = useRef(0);
  const fetchingRef = useRef(isFetching);
  const fontsReadyRef = useRef(false);
  const settleTimerRef = useRef(null);
  const retryTimerRef = useRef(null);
  const safetyTimerRef = useRef(null);
  const activationFrameRef = useRef(null);
  const checkReadyRef = useRef(() => {});

  const clearTimers = useCallback(() => {
    clearTimeout(settleTimerRef.current);
    clearTimeout(retryTimerRef.current);
    clearTimeout(safetyTimerRef.current);
    cancelAnimationFrame(activationFrameRef.current);
  }, []);

  const hasPendingImages = useCallback(() => {
    const pageImages = Array.from(document.images).filter(
      (image) => !image.hasAttribute("data-page-preloader-image"),
    );

    // The requested behavior is to finish loading the page imagery before
    // revealing the route, including images normally marked for lazy loading.
    pageImages.forEach((image) => {
      if (image.loading === "lazy") image.loading = "eager";
    });

    return pageImages.some((image) => !image.complete);
  }, []);

  useEffect(() => {
    fetchingRef.current = isFetching;
    checkReadyRef.current();
  }, [isFetching]);

  useEffect(() => {
    clearTimers();
    startedAtRef.current = Date.now();
    fontsReadyRef.current = !document.fonts;
    activationFrameRef.current = requestAnimationFrame(() => setActive(true));

    const checkReady = () => {
      clearTimeout(settleTimerRef.current);
      clearTimeout(retryTimerRef.current);

      const elapsed = Date.now() - startedAtRef.current;
      const minimumTimeRemaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      const documentReady = document.readyState === "complete";
      const dataReady = fetchingRef.current === 0;
      const imagesReady = !hasPendingImages();

      if (
        minimumTimeRemaining > 0 ||
        !documentReady ||
        !fontsReadyRef.current ||
        !dataReady ||
        !imagesReady
      ) {
        retryTimerRef.current = setTimeout(
          checkReady,
          Math.max(100, minimumTimeRemaining),
        );
        return;
      }

      settleTimerRef.current = setTimeout(() => {
        const stillReady =
          document.readyState === "complete" &&
          fontsReadyRef.current &&
          fetchingRef.current === 0 &&
          !hasPendingImages();

        if (stillReady) {
          setActive(false);
        } else {
          checkReady();
        }
      }, SETTLE_MS);
    };

    checkReadyRef.current = checkReady;

    const handleResourceFinished = () => checkReady();
    window.addEventListener("load", handleResourceFinished);
    document.addEventListener("load", handleResourceFinished, true);
    document.addEventListener("error", handleResourceFinished, true);

    const observer = new MutationObserver(() => checkReady());
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src", "srcset"],
    });

    if (document.fonts) {
      document.fonts.ready.finally(() => {
        fontsReadyRef.current = true;
        checkReady();
      });
    }

    safetyTimerRef.current = setTimeout(
      () => setActive(false),
      MAX_DISPLAY_MS,
    );

    requestAnimationFrame(() => requestAnimationFrame(checkReady));

    return () => {
      observer.disconnect();
      window.removeEventListener("load", handleResourceFinished);
      document.removeEventListener("load", handleResourceFinished, true);
      document.removeEventListener("error", handleResourceFinished, true);
      clearTimers();
    };
  }, [
    clearTimers,
    hasPendingImages,
    location.pathname,
    location.search,
  ]);

  useEffect(() => {
    if (!active) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  return <MoznoLogoPreloader active={active} />;
};

export default GlobalPagePreloader;
