import React from 'react';

// Utility to format currency, duplicated here for self-contained component logic.
const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

export default function TotalSummary({ totalValue }) {
  return (
    <div className="mb-8 p-6 bg-gray-800 rounded-2xl shadow-xl border-l-4 border-yellow-500">
      <h2 className="text-2xl font-bold text-yellow-400">Overall Inventory Total Value:</h2>
      <p className="text-4xl font-extrabold text-white mt-2">{formatCurrency(totalValue)}</p>
    </div>
  );
}