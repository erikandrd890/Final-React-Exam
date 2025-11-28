import React, { useState } from 'react';

export default function ProductForm({ onAddProduct }) {
  // 1. Initialize state for all form fields
  const [formData, setFormData] = useState({
    name: '',
    category: '', // Better to start empty or use a default dropdown value
    price: 0,
    quantity: 0,
    description: '',
    image: '', // New field for image URL
  });

  const PlusCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  );

  // 2. Universal change handler to update state
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.description || formData.price <= 0 || formData.quantity <= 0) {
      alert("Please fill in the product name, description, and ensure price/quantity are greater than zero.");
      return;
    }

    // 3. Pass the complete form data up to the parent
    onAddProduct(formData); 

    // Reset form after submission
    setFormData({
      name: '',
      category: '',
      price: 0,
      quantity: 0,
      description: '',
      image: '',
    });
  };

  return (
    <section className="bg-dark-card p-6 rounded-2xl shadow-2xl mb-10 border border-gray-700">
      <h2 className="text-2xl font-bold text-primary-accent mb-6 flex items-center">
        <PlusCircleIcon /> Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <input 
          type="text" 
          name="name" // Unique name attribute is crucial for handleChange
          placeholder="Product Name" 
          value={formData.name}
          onChange={handleChange}
          required
          className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-dark-text focus:ring-primary-accent focus:border-primary-accent" 
        />
        
        <input 
          type="text" 
          name="category"
          placeholder="Category (e.g., Electronics)" 
          value={formData.category}
          onChange={handleChange}
          required
          className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-dark-text focus:ring-primary-accent focus:border-primary-accent" 
        />
        
        <input 
          type="number" 
          name="price"
          placeholder="Price" 
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
          className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-dark-text focus:ring-primary-accent focus:border-primary-accent" 
        />
        
        <input 
          type="number" 
          name="quantity"
          placeholder="Quantity" 
          value={formData.quantity}
          onChange={handleChange}
          min="0"
          required
          className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-dark-text focus:ring-primary-accent focus:border-primary-accent" 
        />
        
        {/* NEW: Image URL Input */}
        <input 
          type="url" 
          name="image" 
          placeholder="Image URL (Link to product picture)" 
          value={formData.image}
          onChange={handleChange}
          className="col-span-1 md:col-span-2 p-3 bg-gray-700 rounded-lg border border-gray-600 text-dark-text focus:ring-primary-accent focus:border-primary-accent"
        />

        <textarea 
          name="description"
          placeholder="Product Description" 
          rows="3" 
          value={formData.description}
          onChange={handleChange}
          required
          className="col-span-1 md:col-span-2 p-3 bg-gray-700 rounded-lg border border-gray-600 text-dark-text focus:ring-primary-accent focus:border-primary-accent">
        </textarea>
        
        <button
          type="submit"
          className="col-span-1 md:col-span-2 mt-4 p-3 bg-primary-accent text-dark-bg font-bold rounded-xl hover:bg-sky-500 transition duration-200 shadow-lg shadow-primary-accent/30"
        >
          Submit Product
        </button>
      </form>
    </section>
  );
}