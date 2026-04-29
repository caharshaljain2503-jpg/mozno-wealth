import React from "react";

export const InlineLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        {/* Spinning Rings */}
        <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-500 animate-spin" />
        
        {/* Floating Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-ping" />
        </div>
      </div>
      
      <p className="mt-4 text-sm font-medium text-gray-600 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

// Shimmer Effect for Cards
export const CardShimmer = ({ count = 1 }) => {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className="rounded-xl border border-gray-100 p-6 bg-gradient-to-br from-white to-gray-50 animate-pulse"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4" />
              <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-full" />
              <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InlineLoader;