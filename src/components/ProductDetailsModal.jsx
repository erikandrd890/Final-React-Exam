import React from 'react';

export default function ProductDetailsModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-dark-bg p-8 rounded-xl shadow-2xl max-w-lg w-full relative border border-primary-accent">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold">
          &times;
        </button>
        <h2 className="text-3xl font-bold text-primary-accent mb-4">{product.name} Details</h2>
        
        <div className="space-y-3 text-gray-200">
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> {`$${product.price.toFixed(2)}`}</p>
          <p><strong>Quantity in Stock:</strong> {product.quantity}</p>
          <p><strong>Rating:</strong> {product.rating} / 5</p>
          <p className="pt-4 border-t border-gray-700"><strong>Description:</strong> {product.description}</p>
        </div>
      </div>
    </div>
  );
}