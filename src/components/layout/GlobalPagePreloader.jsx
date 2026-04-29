import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import MoznoLogoPreloader from "../common/MoznoLogoPreloader";

const DISPLAY_MS = 1800;

/**
 * Shows branded preloader on every route change and initial load (incl. home refresh).
 */
const GlobalPagePreloader = () => {
  const location = useLocation();
  const [active, setActive] = useState(true);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    setActive(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setActive(false), DISPLAY_MS);

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [location.pathname]);

  return <MoznoLogoPreloader active={active} />;
};

export default GlobalPagePreloader;
