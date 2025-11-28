import React from 'react';
// Assuming QuantityControl is defined and exported from its own file
import QuantityControl from './QuantityControl'; 

// Utility to format currency
const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

export default function ProductCard({ product, onDelete, onViewDetails, onUpdateQuantity }) {
  const subtotal = product.price * product.quantity;

  return (
    <div className="flex flex-col sm:flex-row p-4 mb-4 border border-dark-card rounded-xl bg-dark-card shadow-lg transition duration-300 hover:shadow-primary-accent/50">
      <div className="shrink-0 mb-4 sm:mb-0 sm:mr-6">
        {/* Displaying the actual image */}
        <img 
          src={product.image || 'https://placehold.co/128x128/333333/ffffff?text=No+Image'} 
          alt={product.name} 
          className="w-full h-32 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-600"
          // Fallback if image fails to load
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src="https://placehold.co/128x128/333333/ffffff?text=No+Image";
          }}
        />
      </div>
      
      <div className="grow">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-primary-accent mb-1">{product.name}</h3>
          <button 
            onClick={() => onDelete(product.id)}
            className="text-red-400 hover:text-red-500 transition duration-150 p-2 rounded-full hover:bg-gray-700 text-xl font-bold leading-none"
            title="Delete Product"
          >
            &times; 
          </button>
        </div>
        
        <p className="text-sm text-gray-400 mb-2">Category: <span className="font-medium text-gray-200">{product.category}</span></p>
        <p className="text-sm text-gray-300 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <p>Price: <span className="font-bold text-lg text-green-400">{formatCurrency(product.price)}</span></p>
          <div className="flex flex-col">
            <p className="mb-1">Current Stock:</p>
            {/* NEW: Quantity Control */}
            <QuantityControl 
              currentQuantity={product.quantity}
              onUpdateQuantity={onUpdateQuantity}
              productId={product.id}
            />
          </div>
          <p className="col-span-2 mt-2 pt-2 border-t border-gray-600">Subtotal: <span className="font-extrabold text-xl text-yellow-400">{formatCurrency(subtotal)}</span></p>
        </div>
        
        <button
          onClick={() => onViewDetails(product)}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition duration-150 text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
}