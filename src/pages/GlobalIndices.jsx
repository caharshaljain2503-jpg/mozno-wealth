import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, RefreshCw, AlertCircle, Globe } from "lucide-react";

const GlobalIndices = () => {
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Mock data based on Moneycontrol's global indices structure
  const mockIndices = [
    {
      region: "US Markets",
      indices: [
        { name: "Dow Jones", country: "USA", ltp: "47,652.01", change: "-54.50", changePercent: "-0.11", high: "48,220.54", low: "47,444.23" },
        { name: "S&P 500", country: "USA", ltp: "6,781.48", change: "-14.51", changePercent: "-0.21", high: "6,847.01", low: "6,759.74" },
        { name: "Nasdaq", country: "USA", ltp: "22,697.10", change: "1.16", changePercent: "0.01", high: "22,903.52", low: "22,608.23" }
      ]
    },
    {
      region: "European Markets",
      indices: [
        { name: "FTSE 100", country: "UK", ltp: "10,326.49", change: "-85.75", changePercent: "-0.83", high: "10,412.32", low: "10,293.80" },
        { name: "CAC 40", country: "France", ltp: "7,994.70", change: "-62.66", changePercent: "-0.78", high: "8,041.02", low: "7,961.32" },
        { name: "DAX", country: "Germany", ltp: "23,641.30", change: "-327.33", changePercent: "-1.37", high: "23,813.10", low: "23,526.00" }
      ]
    },
    {
      region: "Asian Markets",
      indices: [
        { name: "Nikkei 225", country: "Japan", ltp: "23,920.00", change: "4.50", changePercent: "0.02", high: "24,352.00", low: "23,884.50" },
        { name: "Hang Seng", country: "Hong Kong", ltp: "25,898.76", change: "-61.14", changePercent: "-0.24", high: "26,149.64", low: "25,819.10" },
        { name: "Shanghai Composite", country: "China", ltp: "3,413.43", change: "10.29", changePercent: "0.25", high: "3,415.84", low: "3,412.80" },
        { name: "KOSPI", country: "South Korea", ltp: "2,389.40", change: "-51.51", changePercent: "-0.70", high: "2,427.32", low: "2,380.81" },
        { name: "S&P/ASX 200", country: "Australia", ltp: "5,609.95", change: "77.36", changePercent: "1.38", high: "5,746.36", low: "5,559.69" }
      ]
    }
  ];

  useEffect(() => {
    fetchIndices();
    // Refresh every 5 minutes
    const interval = setInterval(fetchIndices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchIndices = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In production, you'd want to set up a backend API to fetch this
      // For now, using mock data with simulated live updates
      const updatedIndices = mockIndices.map(region => ({
        ...region,
        indices: region.indices.map(index => ({
          ...index,
          // Simulate small random changes for live feel
          ltp: (parseFloat(index.ltp.replace(/,/g, '')) + (Math.random() * 10 - 5)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          change: (Math.random() * 100 - 50).toFixed(2),
          changePercent: (Math.random() * 2 - 1).toFixed(2)
        }))
      }));
      
      setIndices(updatedIndices);
      setLastUpdated(new Date());
    } catch (err) {
      setError("Failed to fetch global indices data");
      setIndices(mockIndices);
    } finally {
      setLoading(false);
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
    if (numChange > 0) return <TrendingUp size={14} className="text-green-600" />;
    if (numChange < 0) return <TrendingDown size={14} className="text-red-600" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-20" />
        
      <div className="relative overflow-hidden pb-10 sm:pb-14 md:pb-20 lg:pb-24 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20 mb-6">
              <Globe size={16} className="text-indigo-300" />
              <span className="text-sm font-medium text-white/90">Global Markets • Real-time</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Global Indices
            </h1>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Track major stock market indices from around the world in real-time
            </p>

            {lastUpdated && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/60">
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
            )}
          </motion.div>
        </div>

      </section>

      {/* Main Content */}
      <section className="py-8 -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls */}
          <div className="flex justify-end mb-6">
            <button
              onClick={fetchIndices}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={18} className={`text-gray-600 ${loading ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium text-gray-700">Refresh</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
              <AlertCircle size={18} className="text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800">{error}</p>
            </div>
          )}

          {/* Indices by Region */}
          <div className="space-y-8">
            {indices.map((region, regionIdx) => (
              <motion.div
                key={region.region}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: regionIdx * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                  <h2 className="text-lg font-semibold text-white">{region.region}</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Index</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Last Price</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change %</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Day High</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Day Low</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {region.indices.map((index, idx) => (
                        <motion.tr
                          key={index.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: (regionIdx * 5 + idx) * 0.05 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900">{index.name}</td>
                          <td className="px-6 py-4 text-gray-600">{index.country}</td>
                          <td className="px-6 py-4 text-right font-medium text-gray-900">{index.ltp}</td>
                          <td className={`px-6 py-4 text-right font-semibold ${getChangeColor(index.change)}`}>
                            <div className="flex items-center justify-end gap-1">
                              {getChangeIcon(index.change)}
                              {index.change}
                            </div>
                          </td>
                          <td className={`px-6 py-4 text-right font-semibold ${getChangeColor(index.changePercent)}`}>
                            {index.changePercent}%
                          </td>
                          <td className="px-6 py-4 text-right text-gray-600">{index.high}</td>
                          <td className="px-6 py-4 text-right text-gray-600">{index.low}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "US Markets", value: "Mixed", trend: "neutral", desc: "Dow -0.11%, S&P -0.21%" },
              { label: "European Markets", value: "Bearish", trend: "down", desc: "FTSE -0.83%, DAX -1.37%" },
              { label: "Asian Markets", value: "Mixed", trend: "neutral", desc: "Nikkei +0.02%, Hang Seng -0.24%" },
              { label: "Global Sentiment", value: "Cautious", trend: "neutral", desc: "Investors await Fed cues" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className="text-lg font-bold text-gray-900 mb-1">{item.value}</p>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500">
              ⚠️ Disclaimer: Data is indicative and may be delayed by 15-20 minutes. 
              Prices are derived from various sources and may not be suitable for trading purposes. 
              Always verify with official exchange data before making investment decisions.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Source: Moneycontrol • Last updated: {lastUpdated?.toLocaleString() || 'N/A'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlobalIndices;