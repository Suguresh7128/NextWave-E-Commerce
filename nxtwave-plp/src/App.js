// src/App.js
import React from 'react';
import ProductList from './components/ProductList';
import './App.css'; // Import CSS for styling

function App() {
  return (
    <div className="App">
      <h1>Product Listing Page</h1>
      <ProductList />
    </div>
  );
}

export default App;
