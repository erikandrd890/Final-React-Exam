"use client";

import React, { useState } from 'react';
import TotalSummary from '../components/TotalSummary';
import ProductList from '../components/ProductList';
import ProductDetailsModal from '../components/ProductDetailsModal';
import ProductForm from '../components/ProductForm';

import { initialProducts } from '../data/initialProducts';

export default function ProductDashboard() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // State to control which secondary panel is visible: 'list', 'form', or 'cart'
  const [viewMode, setViewMode] = useState('list'); 

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    const quantityToSet = Math.max(0, newQuantity);

    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, quantity: quantityToSet } : product
      )
    );
  };

  const handleAddProduct = (newProduct) => {
    const image = newProduct.image || `https://placehold.co/128x128/333333/ffffff?text=${newProduct.name ? newProduct.name.substring(0, 3) : 'NEW'}`;
    setProducts([...products, { 
        ...newProduct, 
        id: Date.now(), 
        rating: 4.0, 
        image,
        // Ensure price and quantity are numbers just in case form data is string
        price: parseFloat(newProduct.price), 
        quantity: parseInt(newProduct.quantity, 10)
    }]);
    setViewMode('list'); // Switch back to list view after adding
  };

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
  };

  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  // Helper to determine active button styles
  const getButtonClass = (mode) => (
    // FIX APPLIED HERE: Added 'inline-flex items-center justify-center' for perfect centering
    `px-4 py-2 rounded-lg font-bold transition duration-200 inline-flex items-center justify-center ${
      viewMode === mode
        ? 'bg-primary-accent text-dark-bg shadow-lg shadow-primary-accent/40'
        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    }`
  );

  return (
    <main className="min-h-screen bg-dark-bg">
      {/* Navbar/Header */}
      <nav className="sticky top-0 z-10 bg-dark-card shadow-2xl border-b border-gray-700">
        <div className=" mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-extrabold text-white sm:mb-0">
            Product Management App
          </h1>

          <div className="flex space-x-3">
            <button
              onClick={() => setViewMode('list')}
              className={getButtonClass('list')}
            >
              Product List
            </button>
            <button
              onClick={() => setViewMode('form')}
              className={getButtonClass('form')}
            >
              + Add Product
            </button>
            <button
              onClick={() => setViewMode('cart')}
              className={getButtonClass('cart')}
            >
              🛒 Cart Summary
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-4 sm:p-8 lg:p-12">
        {/* Conditional Rendering of Views */}
        {viewMode === 'list' && (
          <ProductList 
            products={products}
            onDeleteProduct={handleDelete}
            onShowDetails={handleShowDetails}
            onUpdateQuantity={handleUpdateQuantity} 
          />
        )}

        {viewMode === 'form' && (
          <ProductForm onAddProduct={handleAddProduct} />
        )}

        {viewMode === 'cart' && (
          <TotalSummary totalValue={totalInventoryValue} isCartView={true} />
        )}

        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      </div>
    </main>
  );
}