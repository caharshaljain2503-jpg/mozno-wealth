// src/hooks/useAnalytics.js
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { analyticsApi } from "../services/analyticsApi";
import { v4 as uuidv4 } from "uuid";

// ============ HELPERS ============
const getVisitorId = () => {
  try {
    let id = localStorage.getItem("visitorId");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("visitorId", id);
    }
    return id;
  } catch {
    return uuidv4();
  }
};

const getSessionId = () => {
  try {
    let id = sessionStorage.getItem("sessionId");
    if (!id) {
      id = uuidv4();
      sessionStorage.setItem("sessionId", id);
    }
    return id;
  } catch {
    return uuidv4();
  }
};

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/Tablet|iPad/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "mobile";
  return "desktop";
};

const getBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  return "Other";
};

const getOS = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac")) return "MacOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return "Other";
};

const getReferrer = () => {
  try {
    const ref = document.referrer;
    if (!ref) return "direct";
    const refHost = new URL(ref).hostname;
    if (refHost === window.location.hostname) return "internal";
    return refHost;
  } catch {
    return "unknown";
  }
};

// ============ MAIN HOOK ============
const useAnalytics = () => {
  const location = useLocation();
  const sessionStartRef = useRef(Date.now());
  const lastPathRef = useRef(null);
  const durationTimerRef = useRef(null);

  // Silent mutations - analytics should NEVER break the app
  const trackMutation = useMutation({
    mutationFn: analyticsApi.trackVisit,
    retry: false,
    onError: () => {},
  });

  const durationMutation = useMutation({
    mutationFn: ({ sessionId, duration }) =>
      analyticsApi.updateDuration(sessionId, duration),
    retry: false,
    onError: () => {},
  });

  // Track page view
  const trackPage = useCallback(
    (pathname) => {
      if (lastPathRef.current === pathname) return;
      lastPathRef.current = pathname;

      trackMutation.mutate({
        visitorId: getVisitorId(),
        sessionId: getSessionId(),
        page: pathname,
        referrer: getReferrer(),
        device: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Send duration
  const sendDuration = useCallback(() => {
    const duration = Math.floor(
      (Date.now() - sessionStartRef.current) / 1000,
    );
    if (duration > 0) {
      durationMutation.mutate({
        sessionId: getSessionId(),
        duration,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track on route change
  useEffect(() => {
    trackPage(location.pathname);
  }, [location.pathname, trackPage]);

  // Duration timer - every 30 seconds
  useEffect(() => {
    durationTimerRef.current = setInterval(sendDuration, 30000);

    return () => {
      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current);
      }
    };
  }, [sendDuration]);

  // Handle tab close / visibility change
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) sendDuration();
    };

    const handleUnload = () => {
      const duration = Math.floor(
        (Date.now() - sessionStartRef.current) / 1000,
      );

      if (duration > 0 && navigator.sendBeacon) {
        const blob = new Blob(
          [JSON.stringify({ sessionId: getSessionId(), duration })],
          { type: "application/json" },
        );

        const baseURL =
          import.meta.env.VITE_API_BASE_URL ||
          "https://mozno-server.vercel.app/api";
        navigator.sendBeacon(
          `${baseURL}/analytics/update-duration`,
          blob,
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [sendDuration]);
};

export default useAnalytics;