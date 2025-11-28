import React, { useState } from 'react';
import ProductCard from './ProductCard'; // Assuming ProductCard is available

const categoryOptions = ["All", "Electronics", "Furniture", "Other"];

/**
 * Renders the filtered list of products.
 * @param {Object[]} products - Array of products.
 * @param {function} onDeleteProduct - Function to delete a product.
 * @param {function} onShowDetails - Function to show product details.
 * @param {function} onUpdateQuantity - Function to update product quantity.
 */
export default function ProductList({ products, onDeleteProduct, onShowDetails, onUpdateQuantity }) {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Search Icon SVG
  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );

  const filteredProducts = products.filter(product => {
    const categoryMatch = filter === "All" || product.category === filter;
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <section>
      {/* Search and Filter UI */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 bg-gray-700 rounded-xl border border-gray-600 text-dark-text focus:ring-primary-accent focus:border-primary-accent"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <SearchIcon />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl font-medium transition duration-200 ${
                filter === cat
                  ? 'bg-primary-accent text-dark-bg shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Card List */}
      <div className="mt-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onDelete={onDeleteProduct} 
              onViewDetails={onShowDetails}
              onUpdateQuantity={onUpdateQuantity} // NEW: Pass the update function
            />
          ))
        ) : (
          <div className="text-center p-12 bg-gray-800 rounded-xl text-gray-400">
            No products match your current filter and search criteria.
          </div>
        )}
      </div>
    </section>
  );
}