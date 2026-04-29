import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  RefreshCw,
  BarChart3,
  ChevronRight,
  Globe,
  Landmark,
  Sparkles,
} from "lucide-react";
import apiClient from "../api/axios.instance";

const REFRESH_INTERVAL_MS = 60 * 1000;

const formatValue = (value, currency = "") => {
  if (value === null || value === undefined) return "--";
  const formatted = Number(value).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
  return currency ? `${currency} ${formatted}` : formatted;
};

const formatNumber = (value, maxFractionDigits = 2) => {
  if (value === null || value === undefined) return "--";
  return Number(value).toLocaleString("en-IN", {
    maximumFractionDigits: maxFractionDigits,
  });
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const IndexCard = ({ item }) => {
  const price = item?.price ?? null;
  const prevClose = item?.prevClose ?? null;
  const changePoints =
    price !== null && prevClose !== null ? price - prevClose : null;
  const changePercent =
    item?.changePercent ??
    (changePoints !== null && prevClose !== null && prevClose !== 0
      ? (changePoints / prevClose) * 100
      : null);

  const isPositive = changePoints !== null ? changePoints >= 0 : true;

  const rawStatus =
    typeof item?.marketStatus === "string" ? item.marketStatus.trim() : "";
  const status =
    rawStatus && rawStatus.toLowerCase() !== "unknown" ? rawStatus : null;
  const statusClasses =
    status === "Open"
      ? {
          pill: "bg-emerald-50 text-emerald-700 border-emerald-100",
          dot: "bg-emerald-500",
        }
      : status === "Pre-market"
        ? {
            pill: "bg-amber-50 text-amber-800 border-amber-100",
            dot: "bg-amber-500",
          }
        : status === "Closed"
          ? {
              pill: "bg-rose-50 text-rose-700 border-rose-100",
              dot: "bg-rose-500",
            }
          : {
              pill: "bg-slate-50 text-slate-700 border-slate-100",
              dot: "bg-slate-500",
            };

  return (
    <Motion.div
      variants={fadeInUp}
      className="group rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-emerald-600/90 uppercase tracking-wide">
              {item?.exchange || "Market"}
            </p>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {item?.name}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 font-mono">
              {item?.symbol}
            </p>
          </div>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${
            isPositive
              ? "bg-emerald-50 text-emerald-800 border-emerald-100"
              : "bg-rose-50 text-rose-800 border-rose-100"
          }`}
        >
          {changePoints === null
            ? "--"
            : `${isPositive ? "+" : ""}${changePoints.toFixed(2)}`}
          {changePercent === null
            ? ""
            : ` (${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%)`}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 text-sm">
        {[
          ["Price", formatValue(item?.price, item?.currency)],
          ["Prev Close", formatValue(item?.prevClose, item?.currency)],
          ["Open", formatValue(item?.open, item?.currency)],
          [
            "% Change",
            changePercent === null
              ? "--"
              : `${changePercent >= 0 ? "+" : ""}${formatNumber(changePercent, 2)}%`,
          ],
          ["Day High", formatValue(item?.high, item?.currency)],
          ["Day Low", formatValue(item?.low, item?.currency)],
          ["52W High", formatValue(item?.weekHigh, item?.currency)],
          ["52W Low", formatValue(item?.weekLow, item?.currency)],
          [
            "Volume",
            item?.volume === null ||
            item?.volume === undefined ||
            item?.volume === 0
              ? "--"
              : formatNumber(item?.volume, 0),
          ],
        ].map(([label, val]) => (
          <div
            key={label}
            className="rounded-xl bg-gradient-to-br from-slate-50/90 to-emerald-50/20 border border-gray-100/80 px-3 py-2"
          >
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              {label}
            </p>
            <p className="font-semibold text-gray-900 text-sm mt-0.5 tabular-nums">
              {val}
            </p>
          </div>
        ))}
        {status ? (
          <div className="col-span-2 flex justify-end pt-1">
            <div
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border ${statusClasses.pill}`}
            >
              <span className={`w-2 h-2 rounded-full ${statusClasses.dot}`} />
              <span className="text-xs font-semibold">{status}</span>
            </div>
          </div>
        ) : null}
      </div>
    </Motion.div>
  );
};

const MarketData = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [marketData, setMarketData] = useState({
    india: [],
    global: [],
    updatedAt: null,
  });

  const fetchMarketData = useCallback(async ({ showLoader = false } = {}) => {
    if (showLoader) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await apiClient.get("/market/overview");
      setMarketData(res?.data || { india: [], global: [], updatedAt: null });
      setError("");
    } catch {
      setError("Unable to fetch market data right now.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMarketData({ showLoader: true });
    const timer = setInterval(() => fetchMarketData({ showLoader: false }), REFRESH_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [fetchMarketData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">
      {/* Hero */}
      <section className="relative overflow-hidden pb-10 sm:pb-14 md:pb-16 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/15" />
          <Motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-24 w-56 h-56 sm:w-72 sm:h-72 bg-emerald-500/25 rounded-full blur-3xl"
          />
          <Motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.28, 0.15] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: 1.5,
              ease: "easeInOut",
            }}
            className="absolute bottom-1/4 -right-24 w-56 h-56 sm:w-72 sm:h-72 bg-cyan-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <Motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-1.5 text-white/55 text-xs sm:text-sm mb-5"
            >
              <Link to="/" className="hover:text-white/85 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/70">Insights</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-emerald-300/90">Market Data</span>
            </Motion.div>

            <Motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-5"
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-medium text-white/85">
                Live indices • Auto refresh
              </span>
            </Motion.div>

            <Motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.12] mb-4"
            >
              <span
                className="italic bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Market Data
              </span>
            </Motion.h1>

            <Motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed"
            >
              Indian and global benchmark indices at a glance — for your
              planning conversations at Mozno Wealth.
            </Motion.p>
            <Motion.p
              variants={fadeInUp}
              className="text-xs text-white/45 mt-3 max-w-xl mx-auto"
            >
              Figures are indicative; source data via Yahoo Finance.
            </Motion.p>
          </Motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            className="w-full h-10 sm:h-14 md:h-16"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="relative -mt-1 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
            <div className="text-sm text-gray-600">
              <span className="text-gray-500">
                Last updated:{" "}
                <span className="font-semibold text-gray-800 tabular-nums">
                  {marketData.updatedAt
                    ? new Date(marketData.updatedAt).toLocaleTimeString(
                        undefined,
                        { hour: "numeric", minute: "2-digit" },
                      )
                    : "--"}
                </span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => fetchMarketData({ showLoader: false })}
              disabled={refreshing || loading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold shadow-sm hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 transition-all"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh now
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-emerald-100/60 bg-white p-5 shadow-sm animate-pulse"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-emerald-100/80 rounded w-1/3" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <div
                        key={j}
                        className="h-14 rounded-xl bg-slate-100/90"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/40 p-6 sm:p-8 text-center">
              <p className="text-amber-900 font-medium mb-4">{error}</p>
              <button
                type="button"
                onClick={() => fetchMarketData({ showLoader: true })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try again
              </button>
            </div>
          ) : (
            <div className="space-y-12 sm:space-y-14">
              <Motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                    <Landmark className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-800">
                      India
                    </span>
                  </div>
                  <Sparkles className="w-4 h-4 text-emerald-500/70 hidden sm:block" />
                </div>
                {marketData.india.length === 0 ? (
                  <p className="text-gray-500 text-sm py-8 text-center rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/30">
                    No Indian indices returned yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {marketData.india.map((item) => (
                      <IndexCard key={item.key || item.symbol} item={item} />
                    ))}
                  </div>
                )}
              </Motion.div>

              <Motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100">
                    <Globe className="w-3.5 h-3.5 text-teal-600" />
                    <span className="text-xs font-semibold text-teal-800">
                      Global
                    </span>
                  </div>
                </div>
                {marketData.global.length === 0 ? (
                  <p className="text-gray-500 text-sm py-8 text-center rounded-2xl border border-dashed border-teal-200 bg-teal-50/30">
                    No global indices returned yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {marketData.global.map((item) => (
                      <IndexCard key={item.key || item.symbol} item={item} />
                    ))}
                  </div>
                )}
              </Motion.div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MarketData;
