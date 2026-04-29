import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    TrendingUp,
    TrendingDown,
    RefreshCw,
    AlertCircle,
    Globe,
    ChevronRight,
    ArrowUp,
    ArrowDown,
    Minus,
    Clock,
    ExternalLink,
    Landmark,
    BarChart3,
    Building2,
    Briefcase,
    Sparkles
} from "lucide-react";

const IndianIndices = () => {
    const [indices, setIndices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedSector, setSelectedSector] = useState("all");

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
    };

    // Mock data based on Moneycontrol's Indian indices structure
    // In production, this would come from your backend API
    const mockIndices = [
        {
            category: "Broad Market Indices",
            indices: [
                { name: "S&P BSE SENSEX", ltp: "82,940.44", change: "280.51", changePercent: "0.34", high: "83,156.30", low: "82,433.60", volume: "12.5K" },
                { name: "Nifty 50", ltp: "24,971.80", change: "22.90", changePercent: "0.09", high: "25,039.70", low: "24,852.50", volume: "98.2K" },
                { name: "Nifty Next 50", ltp: "72,456.30", change: "-124.50", changePercent: "-0.17", high: "72,890.45", low: "72,123.80", volume: "45.6K" },
                { name: "Nifty Midcap 100", ltp: "56,789.20", change: "345.67", changePercent: "0.61", high: "56,890.12", low: "56,234.56", volume: "67.8K" },
                { name: "Nifty Smallcap 100", ltp: "18,234.56", change: "-89.12", changePercent: "-0.49", high: "18,456.78", low: "18,123.45", volume: "34.5K" }
            ]
        },
        {
            category: "Sectoral Indices",
            indices: [
                { name: "Nifty Bank", ltp: "53,456.78", change: "234.56", changePercent: "0.44", high: "53,678.90", low: "53,123.45", volume: "23.4K" },
                { name: "Nifty Financial Services", ltp: "24,567.89", change: "123.45", changePercent: "0.50", high: "24,678.90", low: "24,456.78", volume: "15.6K" },
                { name: "Nifty IT", ltp: "34,567.89", change: "-234.56", changePercent: "-0.67", high: "34,890.12", low: "34,456.78", volume: "18.9K" },
                { name: "Nifty Pharma", ltp: "21,234.56", change: "89.12", changePercent: "0.42", high: "21,345.67", low: "21,123.45", volume: "12.3K" },
                { name: "Nifty Auto", ltp: "19,876.54", change: "-45.67", changePercent: "-0.23", high: "19,987.65", low: "19,765.43", volume: "14.5K" },
                { name: "Nifty FMCG", ltp: "45,678.90", change: "156.78", changePercent: "0.34", high: "45,789.01", low: "45,567.89", volume: "10.2K" },
                { name: "Nifty Metal", ltp: "8,765.43", change: "-98.76", changePercent: "-1.11", high: "8,876.54", low: "8,654.32", volume: "22.1K" },
                { name: "Nifty Realty", ltp: "987.65", change: "12.34", changePercent: "1.26", high: "998.76", low: "976.54", volume: "45.6K" },
                { name: "Nifty Energy", ltp: "34,567.89", change: "-123.45", changePercent: "-0.36", high: "34,678.90", low: "34,456.78", volume: "16.7K" },
                { name: "Nifty Infrastructure", ltp: "6,543.21", change: "45.67", changePercent: "0.70", high: "6,567.89", low: "6,512.34", volume: "19.8K" }
            ]
        }
    ];

    // Sector filter options
    const sectors = [
        { id: "all", name: "All Indices", icon: BarChart3 },
        { id: "broad", name: "Broad Market", icon: Landmark },
        { id: "banking", name: "Banking", icon: Building2 },
        { id: "it", name: "IT", icon: Briefcase },
        { id: "pharma", name: "Pharma", icon: TrendingUp },
        { id: "auto", name: "Auto", icon: TrendingUp },
    ];

    useEffect(() => {
        fetchIndices();
        // Refresh every 5 minutes
        const interval = setInterval(() => fetchIndices(true), 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchIndices = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);
        setError(null);

        try {
            // In production, you'd call your backend API
            // const response = await fetch('/api/indian-indices');
            // const data = await response.json();

            // Using mock data with simulated live updates
            await new Promise(resolve => setTimeout(resolve, 1000));

            const updatedIndices = mockIndices.map(category => ({
                ...category,
                indices: category.indices.map(index => ({
                    ...index,
                    // Simulate small random changes for live feel
                    ltp: (parseFloat(index.ltp.replace(/,/g, '')) + (Math.random() * 20 - 10)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    change: (parseFloat(index.change) + (Math.random() * 5 - 2.5)).toFixed(2),
                    changePercent: (parseFloat(index.changePercent) + (Math.random() * 0.2 - 0.1)).toFixed(2)
                }))
            }));

            setIndices(updatedIndices);
            setLastUpdated(new Date());
        } catch (err) {
            setError("Failed to fetch Indian indices data");
            setIndices(mockIndices);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const getChangeColor = (change) => {
        const numChange = parseFloat(change);
        if (numChange > 0) return "text-green-600";
        if (numChange < 0) return "text-red-600";
        return "text-gray-600";
    };

    const getChangeIcon = (change) => {
        const numChange = parseFloat(change);
        if (numChange > 0) return <ArrowUp size={14} className="text-green-600" />;
        if (numChange < 0) return <ArrowDown size={14} className="text-red-600" />;
        return <Minus size={14} className="text-gray-400" />;
    };

    const getBgGradient = (category) => {
        const gradients = {
            "Broad Market Indices": "from-emerald-600 to-teal-600",
            "Sectoral Indices": "from-blue-600 to-indigo-600",
            "default": "from-gray-600 to-slate-600"
        };
        return gradients[category] || gradients.default;
    };

    // Filter indices based on selected sector
    const getFilteredIndices = () => {
        if (selectedSector === "all") return indices;

        const sectorMap = {
            "broad": "Broad Market Indices",
            "banking": "Sectoral Indices",
            "it": "Sectoral Indices",
            "pharma": "Sectoral Indices",
            "auto": "Sectoral Indices",
        };

        const categoryToShow = sectorMap[selectedSector];
        return indices.filter(cat => cat.category === categoryToShow);
    };

    // Calculate market summary
    const marketSummary = {
        sensex: indices[0]?.indices[0] || null,
        nifty: indices[0]?.indices[1] || null,
        advance: Math.floor(Math.random() * 1500 + 1000),
        decline: Math.floor(Math.random() * 1200 + 800),
        unchanged: Math.floor(Math.random() * 200 + 100)
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
            {/* Hero Section */}
           <section className="relative overflow-hidden pb-10 sm:pb-14 md:pb-20 lg:pb-24 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900" />

                    <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-20" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-20" />

                    {/* Animated Orbs */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.3, 0.2],
                            x: [0, 30, 0],
                            y: [0, -30, 0]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 left-10 w-40 h-40 sm:w-60 sm:h-60 bg-emerald-500/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.2, 0.3, 0.2],
                            x: [0, -30, 0],
                            y: [0, 30, 0]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-20 right-10 w-40 h-40 sm:w-60 sm:h-60 bg-cyan-500/20 rounded-full blur-3xl"
                    />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="text-center"
                    >
                        {/* Breadcrumb */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex items-center justify-center gap-1.5 text-white/60 text-xs sm:text-sm mb-4"
                        >
                            <span>Home</span>
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-emerald-300">Indian Indices</span>
                        </motion.div>

                        {/* Badge */}
                        <motion.div
                            variants={fadeInUp}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4 sm:mb-6"
                        >
                            <Landmark className="w-3.5 h-3.5 text-emerald-300" />
                            <span className="text-xs font-medium text-white/90">Indian Stock Market</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            variants={fadeInUp}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4 px-2"
                        >
                            Track{" "}
                            <span className="italic bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                                Indian Indices
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto px-4"
                        >
                            Real-time data from BSE & NSE - Sensex, Nifty, and sectoral indices
                        </motion.p>

                        {/* Last Updated */}
                        {lastUpdated && (
                            <motion.div
                                variants={fadeInUp}
                                className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-white/60"
                            >
                                <Clock className="w-3.5 h-3.5" />
                                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" className="w-full h-12 sm:h-16 md:h-20" preserveAspectRatio="none">
                        <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Market Overview Cards */}
            <section className="py-6 sm:py-8 -mt-4 sm:-mt-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {/* Sensex Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg border border-gray-100"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">S&P BSE SENSEX</p>
                                        <p className="text-sm font-medium text-gray-400">BSE</p>
                                    </div>
                                </div>
                                {marketSummary.sensex && (
                                    <div className="text-right">
                                        <p className="text-lg sm:text-xl font-bold text-gray-900">{marketSummary.sensex.ltp}</p>
                                        <p className={`text-xs sm:text-sm font-semibold ${getChangeColor(marketSummary.sensex.change)}`}>
                                            {marketSummary.sensex.change} ({marketSummary.sensex.changePercent}%)
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Nifty Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg border border-gray-100"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Nifty 50</p>
                                        <p className="text-sm font-medium text-gray-400">NSE</p>
                                    </div>
                                </div>
                                {marketSummary.nifty && (
                                    <div className="text-right">
                                        <p className="text-lg sm:text-xl font-bold text-gray-900">{marketSummary.nifty.ltp}</p>
                                        <p className={`text-xs sm:text-sm font-semibold ${getChangeColor(marketSummary.nifty.change)}`}>
                                            {marketSummary.nifty.change} ({marketSummary.nifty.changePercent}%)
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-6 sm:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                        {/* Sector Filter */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
                            {sectors.map((sector) => (
                                <button
                                    key={sector.id}
                                    onClick={() => setSelectedSector(sector.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${selectedSector === sector.id
                                            ? 'bg-emerald-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <sector.icon className="w-3.5 h-3.5" />
                                    {sector.name}
                                </button>
                            ))}
                        </div>

                        {/* Live Status & Refresh */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-xs font-medium text-emerald-700">Live</span>
                            </div>

                            <button
                                onClick={() => fetchIndices(true)}
                                disabled={refreshing}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-sm"
                            >
                                <RefreshCw size={16} className={`text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
                                <span className="text-sm font-medium text-gray-700">
                                    {refreshing ? 'Refreshing...' : 'Refresh'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Error State */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3"
                        >
                            <AlertCircle size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-amber-800">{error}</p>
                                <button
                                    onClick={() => fetchIndices(true)}
                                    className="mt-2 text-xs text-amber-700 underline hover:no-underline"
                                >
                                    Try again
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4" />
                            <p className="text-sm text-gray-600">Fetching Indian market data...</p>
                        </div>
                    )}

                    {/* Market Advance/Decline Summary */}
                    {!loading && !error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 grid grid-cols-3 gap-3 sm:gap-4"
                        >
                            <div className="bg-green-50 rounded-lg p-3 text-center">
                                <p className="text-xs text-green-600 mb-1">Advance</p>
                                <p className="text-lg sm:text-xl font-bold text-green-700">{marketSummary.advance}</p>
                            </div>
                            <div className="bg-red-50 rounded-lg p-3 text-center">
                                <p className="text-xs text-red-600 mb-1">Decline</p>
                                <p className="text-lg sm:text-xl font-bold text-red-700">{marketSummary.decline}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 text-center">
                                <p className="text-xs text-gray-600 mb-1">Unchanged</p>
                                <p className="text-lg sm:text-xl font-bold text-gray-700">{marketSummary.unchanged}</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Indices by Category */}
                    {!loading && !error && getFilteredIndices().map((category, categoryIdx) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIdx * 0.1 }}
                            className="mb-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                        >
                            {/* Category Header */}
                            <div className={`bg-gradient-to-r ${getBgGradient(category.category)} px-4 sm:px-6 py-3 sm:py-4`}>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-base sm:text-lg font-semibold text-white">{category.category}</h2>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-white/80">Last updated:</span>
                                        <span className="text-xs font-medium text-white">
                                            {lastUpdated?.toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Index</th>
                                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Last Price</th>
                                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change %</th>
                                            <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Day High</th>
                                            <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Day Low</th>
                                            <th className="hidden xl:table-cell px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {category.indices.map((index, idx) => (
                                            <motion.tr
                                                key={index.name}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: (categoryIdx * 5 + idx) * 0.05 }}
                                                className="hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 text-xs sm:text-sm">
                                                    {index.name}
                                                </td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-medium text-gray-900 text-xs sm:text-sm">
                                                    {index.ltp}
                                                </td>
                                                <td className={`px-3 sm:px-6 py-3 sm:py-4 text-right font-semibold text-xs sm:text-sm ${getChangeColor(index.change)}`}>
                                                    <div className="flex items-center justify-end gap-1">
                                                        {getChangeIcon(index.change)}
                                                        <span className="hidden xs:inline">{index.change}</span>
                                                    </div>
                                                </td>
                                                <td className={`px-3 sm:px-6 py-3 sm:py-4 text-right font-semibold text-xs sm:text-sm ${getChangeColor(index.changePercent)}`}>
                                                    {index.changePercent}%
                                                </td>
                                                <td className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 text-right text-gray-600 text-xs sm:text-sm">
                                                    {index.high}
                                                </td>
                                                <td className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 text-right text-gray-600 text-xs sm:text-sm">
                                                    {index.low}
                                                </td>
                                                <td className="hidden xl:table-cell px-3 sm:px-6 py-3 sm:py-4 text-right text-gray-600 text-xs sm:text-sm">
                                                    {index.volume}
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    ))}

                    {/* Top Movers Section */}
                    {!loading && !error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="grid sm:grid-cols-2 gap-4 mt-6"
                        >
                            {/* Top Gainers */}
                            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                        <ArrowUp className="w-3.5 h-3.5 text-green-600" />
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-900">Top Gainers</h3>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { name: "Nifty Realty", change: "+1.26%" },
                                        { name: "Nifty Infrastructure", change: "+0.70%" },
                                        { name: "Nifty Midcap 100", change: "+0.61%" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-xs">
                                            <span className="text-gray-600">{item.name}</span>
                                            <span className="text-green-600 font-medium">{item.change}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Top Losers */}
                            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                                        <ArrowDown className="w-3.5 h-3.5 text-red-600" />
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-900">Top Losers</h3>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { name: "Nifty Metal", change: "-1.11%" },
                                        { name: "Nifty IT", change: "-0.67%" },
                                        { name: "Nifty Smallcap 100", change: "-0.49%" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-xs">
                                            <span className="text-gray-600">{item.name}</span>
                                            <span className="text-red-600 font-medium">{item.change}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Disclaimer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 sm:mt-8 bg-amber-50 rounded-lg p-3 sm:p-4 border border-amber-100"
                    >
                        <div className="flex items-start gap-2">
                            <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs text-amber-800 leading-relaxed">
                                    ⚠️ <span className="font-medium">Disclaimer:</span> Data is indicative and may be delayed by 15-20 minutes.
                                    Prices are derived from BSE and NSE sources and are for informational purposes only.
                                    Always verify with official exchange data before making investment decisions.
                                </p>
                                <div className="flex items-center gap-4 mt-2">
                                    <p className="text-[10px] text-amber-600">
                                        Source: Moneycontrol • BSE • NSE • Last updated: {lastUpdated?.toLocaleString() || 'N/A'}
                                    </p>
                                    <a
                                        href="https://www.moneycontrol.com/indian-indices/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[10px] text-emerald-600 hover:text-emerald-700"
                                    >
                                        View on Moneycontrol
                                        <ExternalLink size={10} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default IndianIndices;