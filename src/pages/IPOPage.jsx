// COMMENTED OUT - IPO Section disabled
/*
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  RefreshCw,
  Search,
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { fetchMainIpoPublic } from "../api/ipo.rapidapi";

const IPO_LIMIT = Number(import.meta.env.VITE_IPO_PUBLIC_LIMIT) || 5;
const HOUR_MS = 60 * 60 * 1000;
const REFRESH_MS =
  Number(import.meta.env.VITE_IPO_REFRESH_INTERVAL_MS) || HOUR_MS;

const GMP_COLUMNS = [
  { key: "name", header: "IPO Name", sortable: true },
  { key: "gmp", header: "GMP (₹)", sortable: true },
  { key: "rating", header: "Rating", sortable: true },
  { key: "subscription", header: "Sub", sortable: true },
  { key: "price", header: "Price (₹)", sortable: true },
  { key: "size", header: "Size (Cr)", sortable: true },
  { key: "lot", header: "Lot", sortable: true },
  { key: "open", header: "Open", sortable: true },
  { key: "close", header: "Close", sortable: true },
  { key: "listing", header: "Listing", sortable: true },
];

const SUB_COLUMNS = [
  { key: "name", header: "IPO Name", sortable: true },
  { key: "total", header: "Total", sortable: true },
  { key: "qib", header: "QIB", sortable: true },
  { key: "shni", header: "SHNI", sortable: true },
  { key: "bhni", header: "BHNI", sortable: true },
  { key: "nii", header: "NII", sortable: true },
  { key: "rii", header: "RII", sortable: true },
  { key: "size", header: "Size (Cr)", sortable: true },
  { key: "price", header: "Price (₹)", sortable: true },
  { key: "closeDate", header: "Close Date", sortable: true },
];

function isBlank(raw) {
  if (raw === null || raw === undefined) return true;
  if (typeof raw === "string") {
    const t = raw.trim();
    if (t === "" || /^null$/i.test(t) || t === "TBA - TBA") return true;
  }
  return false;
}

function dash(raw) {
  return isBlank(raw) ? "—" : String(raw).trim();
}

function formatTableDate(value) {
  if (isBlank(value)) return "—";
  if (typeof value !== "string") return dash(value);
  const t = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}/.test(t)) return t;
  const d = new Date(t);
  return Number.isNaN(d.getTime()) ? t : d.toLocaleDateString();
}

/** Prefer ISO date fields; fall back to offer_date text when needed. */
function openFromIpo(ipo) {
  if (!isBlank(ipo?.ipo_open_date)) return formatTableDate(ipo.ipo_open_date);
  if (!isBlank(ipo?.offer_date)) return dash(ipo.offer_date);
  return "—";
}

function closeFromIpo(ipo) {
  if (!isBlank(ipo?.ipo_close_date)) return formatTableDate(ipo.ipo_close_date);
  return "—";
}

function listingFromIpo(ipo) {
  if (!isBlank(ipo?.ipo_listing_date)) return formatTableDate(ipo.ipo_listing_date);
  return "—";
}

function lotFromIssueSize(issueSize) {
  if (isBlank(issueSize)) return "—";
  const s = String(issueSize);
  const m = s.match(/(\d[\d,]*)\s*shares/i);
  return m ? m[1].replace(/,/g, "") : "—";
}

function mapIpoToGmpRow(ipo) {
  const gmpRaw = ipo?.expected_listing_earning;
  const gmpDisplay = dash(gmpRaw);
  const gmpNum = parseFloat(String(gmpRaw).replace(/[^0-9.-]/g, ""));

  return {
    name: dash(ipo?.name_of_ipo),
    gmp: gmpDisplay,
    _gmpNum: Number.isFinite(gmpNum) ? gmpNum : null,
    rating: "—",
    subscription: "—",
    price: dash(ipo?.issue_price),
    size: dash(ipo?.issue_size),
    lot: lotFromIssueSize(ipo?.issue_size),
    open: openFromIpo(ipo),
    close: closeFromIpo(ipo),
    listing: listingFromIpo(ipo),
  };
}

function mapIpoToSubRow(ipo) {
  return {
    name: dash(ipo?.name_of_ipo),
    total: "—",
    qib: "—",
    shni: "—",
    bhni: "—",
    nii: "—",
    rii: "—",
    size: dash(ipo?.issue_size),
    price: dash(ipo?.issue_price),
    closeDate: closeFromIpo(ipo),
  };
}

const IPOPage = () => {
  const [rawIpos, setRawIpos] = useState([]);
  const [activeTab, setActiveTab] = useState("gmp");
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const fetchIPOData = useCallback(async ({ silent = true, manual = false } = {}) => {
    if (manual) setIsRefreshing(true);
    else if (!silent) setLoading(true);
    setError(null);

    try {
      const list = await fetchMainIpoPublic({ limit: IPO_LIMIT, offset: 0 });
      setRawIpos(list);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching IPO data:", err);
      setError(
        err?.message?.includes("VITE_RAPIDAPI_KEY")
          ? err.message
          : "Unable to load IPO data. Check your connection and API key.",
      );
      if (!silent) setRawIpos([]);
    } finally {
      if (manual) setIsRefreshing(false);
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIPOData({ silent: false });
  }, [fetchIPOData]);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchIPOData({ silent: true });
    }, REFRESH_MS);
    return () => clearInterval(timer);
  }, [fetchIPOData]);

  const gmpRows = useMemo(() => rawIpos.map(mapIpoToGmpRow), [rawIpos]);
  const subRows = useMemo(() => rawIpos.map(mapIpoToSubRow), [rawIpos]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortedData = (data, columns) => {
    if (!sortConfig.key) return data;
    const col = columns.find((c) => c.key === sortConfig.key);
    if (!col) return data;

    return [...data].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === "gmp" && a._gmpNum != null && b._gmpNum != null) {
        aVal = a._gmpNum;
        bVal = b._gmpNum;
      } else {
        const aNum = parseFloat(String(aVal).replace(/[^0-9.-]/g, ""));
        const bNum = parseFloat(String(bVal).replace(/[^0-9.-]/g, ""));
        if (
          Number.isFinite(aNum) &&
          Number.isFinite(bNum) &&
          String(aVal) !== "—" &&
          String(bVal) !== "—"
        ) {
          aVal = aNum;
          bVal = bNum;
        } else {
          aVal = String(aVal ?? "—").toLowerCase();
          bVal = String(bVal ?? "—").toLowerCase();
        }
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }
      if (sortConfig.direction === "asc") {
        return String(aVal).localeCompare(String(bVal));
      }
      return String(bVal).localeCompare(String(aVal));
    });
  };

  const filterByName = (rows) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => r.name.toLowerCase().includes(q));
  };

  const filteredGmp = getSortedData(filterByName(gmpRows), GMP_COLUMNS);
  const filteredSub = getSortedData(filterByName(subRows), SUB_COLUMNS);

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ChevronDown size={14} className="opacity-30" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={14} />
    ) : (
      <ChevronDown size={14} />
    );
  };

  const refreshLabel =
    REFRESH_MS >= HOUR_MS
      ? `Auto-refresh every ${REFRESH_MS / HOUR_MS} hr (RapidAPI)`
      : `Auto-refresh every ${Math.round(REFRESH_MS / 60000)} min (RapidAPI)`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/20">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-20" />

        <div className="relative overflow-hidden pb-10 sm:pb-14 md:pb-20 lg:pb-24 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20 mb-6">
              <Target size={16} className="text-blue-300" />
              <span className="text-sm font-medium text-white/90">{refreshLabel}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">IPO Tracker</h1>

            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Live-style tables powered by Indian IPO Wallah on RapidAPI (same layout as before).
            </p>
            <p className="text-xs text-white/45 mt-3 max-w-2xl mx-auto">
              GMP / full subscription breakdown are shown when the API returns them; otherwise cells show —. Issue open,
              close, and listing dates come from the feed.
            </p>

            {(lastUpdated || isRefreshing) && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-white/60">
                {lastUpdated && (
                  <span className="inline-flex items-center gap-2">
                    <Clock size={14} />
                    Last fetch: {lastUpdated.toLocaleString()}
                  </span>
                )}
                {isRefreshing && (
                  <span className="inline-flex items-center gap-2 text-white/70">
                    <RefreshCw size={14} className="animate-spin" />
                    Refreshing…
                  </span>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-8 -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex bg-white rounded-lg p-1 shadow-sm w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab("gmp")}
                className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "gmp" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Live IPO GMP
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("subscription")}
                className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "subscription"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Subscription status
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial min-w-0">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search IPOs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => fetchIPOData({ silent: true, manual: true })}
                disabled={isRefreshing}
                title="Refresh data"
                className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 flex-shrink-0"
              >
                <RefreshCw size={20} className={`text-gray-600 ${isRefreshing ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
              <AlertCircle size={18} className="text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800">{error}</p>
            </div>
          )}

          {activeTab === "gmp" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[900px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {GMP_COLUMNS.map((col) => (
                        <th
                          key={col.key}
                          onClick={() => col.sortable && handleSort(col.key)}
                          className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                            col.sortable ? "cursor-pointer hover:text-gray-700" : ""
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            {col.header}
                            {col.sortable ? <SortIcon column={col.key} /> : null}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading && filteredGmp.length === 0 ? (
                      <tr>
                        <td colSpan={GMP_COLUMNS.length} className="px-4 py-8 text-center text-gray-500">
                          <RefreshCw size={24} className="animate-spin mx-auto mb-2" />
                          Loading IPO data…
                        </td>
                      </tr>
                    ) : filteredGmp.length > 0 ? (
                      filteredGmp.map((ipo, index) => {
                        const gmpStr = String(ipo.gmp);
                        const gmpNum =
                          ipo._gmpNum != null
                            ? ipo._gmpNum
                            : parseFloat(gmpStr.replace(/[^0-9.-]/g, ""));
                        const hasNum = Number.isFinite(gmpNum) && gmpStr !== "—";
                        return (
                          <motion.tr
                            key={`${ipo.name}-${index}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.02 }}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-4 py-3 font-medium text-gray-900">{ipo.name}</td>
                            <td
                              className={`px-4 py-3 font-semibold ${
                                hasNum && gmpNum > 0
                                  ? "text-green-600"
                                  : hasNum && gmpNum < 0
                                    ? "text-red-600"
                                    : "text-gray-500"
                              }`}
                            >
                              {ipo.gmp}
                              {hasNum && gmpNum > 0 && (
                                <TrendingUp size={14} className="inline ml-1" />
                              )}
                              {hasNum && gmpNum < 0 && (
                                <TrendingDown size={14} className="inline ml-1" />
                              )}
                            </td>
                            <td className="px-4 py-3">{ipo.rating}</td>
                            <td className="px-4 py-3">{ipo.subscription}</td>
                            <td className="px-4 py-3">
                              {ipo.price === "—" ? "—" : `₹${ipo.price}`}
                            </td>
                            <td className="px-4 py-3">{ipo.size}</td>
                            <td className="px-4 py-3">{ipo.lot}</td>
                            <td className="px-4 py-3">{ipo.open}</td>
                            <td className="px-4 py-3">{ipo.close}</td>
                            <td className="px-4 py-3">{ipo.listing}</td>
                          </motion.tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={GMP_COLUMNS.length} className="px-4 py-8 text-center text-gray-500">
                          No IPOs found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "subscription" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[900px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {SUB_COLUMNS.map((col) => (
                        <th
                          key={col.key}
                          onClick={() => col.sortable && handleSort(col.key)}
                          className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                            col.sortable ? "cursor-pointer hover:text-gray-700" : ""
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            {col.header}
                            {col.sortable ? <SortIcon column={col.key} /> : null}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading && filteredSub.length === 0 ? (
                      <tr>
                        <td colSpan={SUB_COLUMNS.length} className="px-4 py-8 text-center text-gray-500">
                          <RefreshCw size={24} className="animate-spin mx-auto mb-2" />
                          Loading subscription data…
                        </td>
                      </tr>
                    ) : filteredSub.length > 0 ? (
                      filteredSub.map((ipo, index) => (
                        <motion.tr
                          key={`${ipo.name}-sub-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.02 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 font-medium text-gray-900">{ipo.name}</td>
                          <td className="px-4 py-3 font-semibold text-blue-600">{ipo.total}</td>
                          <td className="px-4 py-3">{ipo.qib}</td>
                          <td className="px-4 py-3">{ipo.shni}</td>
                          <td className="px-4 py-3">{ipo.bhni}</td>
                          <td className="px-4 py-3">{ipo.nii}</td>
                          <td className="px-4 py-3">{ipo.rii}</td>
                          <td className="px-4 py-3">{ipo.size}</td>
                          <td className="px-4 py-3">
                            {ipo.price === "—" ? "—" : `₹${ipo.price}`}
                          </td>
                          <td className="px-4 py-3">{ipo.closeDate}</td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={SUB_COLUMNS.length} className="px-4 py-8 text-center text-gray-500">
                          No IPOs found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">About Grey Market Premium (GMP)</h3>
                <p className="text-sm text-blue-800">
                  GMP is the unofficial premium at which IPO shares trade in the grey market before listing. Higher values
                  often mean stronger sentiment. Data is sourced from RapidAPI; it may be incomplete or delayed.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-600">Positive GMP → possible listing gain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-gray-600">Negative GMP → possible listing loss</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-gray-600">Subscription above 1× → oversubscribed</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-xs text-blue-700">
                Disclaimer: Figures are not investment advice. Client refresh runs on an hourly schedule (configurable via{" "}
                <code className="font-mono">VITE_IPO_REFRESH_INTERVAL_MS</code>); use a backend cron if you need guaranteed
                server-side timing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IPOPage;
*/
// END COMMENTED OUT - IPO Section disabled