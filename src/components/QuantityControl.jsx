import React, { useState } from 'react';

/**
 * A reusable component for dynamically changing the quantity of a product.
 * @param {number} currentQuantity - The current quantity value.
 * @param {function} onUpdateQuantity - Callback function (productId, newQuantity) to update state in the parent.
 * @param {number} productId - The ID of the product being updated.
 */
export default function QuantityControl({ currentQuantity, onUpdateQuantity, productId }) {
  const [quantity, setQuantity] = useState(currentQuantity);

  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    // Ensure quantity is not less than 0
    const finalQuantity = Math.max(0, newQuantity);
    setQuantity(finalQuantity);
    onUpdateQuantity(productId, finalQuantity);
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onUpdateQuantity(productId, newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(0, quantity - 1);
    setQuantity(newQuantity);
    onUpdateQuantity(productId, newQuantity);
  };

  return (
    <div className="flex items-center space-x-2 mt-2">
      <button 
        onClick={handleDecrement}
        disabled={quantity <= 0}
        className="px-3 py-1 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 disabled:bg-gray-600 transition duration-150"
      >
        -
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min="0"
        className="w-16 p-1 text-center bg-gray-700 rounded-lg border border-gray-600 text-white focus:ring-primary-accent focus:border-primary-accent"
      />
      <button 
        onClick={handleIncrement}
        className="px-3 py-1 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition duration-150"
      >
        +
      </button>
    </div>
  );
}