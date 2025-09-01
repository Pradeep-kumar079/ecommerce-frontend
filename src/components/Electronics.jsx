import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './Electronic.css';



const Electronics = () => {
  const [electronics, setElectronics] = useState([]);
  const BASE_IMAGE_URL = "http://localhost:5000"; // include host

  useEffect(() => {
    axios.get(`${BASE_IMAGE_URL}/api/home/all-products`)
      .then(res => {
        const electronicItems = res.data.filter(p => p.category === "electronics");
        setElectronics(electronicItems);
      })
      .catch(err => console.error("Error fetching electronics:", err));
  }, []);

  return (
    <div className="electronics-container">
      <h2>Electronics</h2>
      <p>Explore our collection of latest electronics.</p>
      <div className="electronics-list">
        {electronics.map(item => (
          <ProductCard
            key={item._id}
            product={item}
            BASE_IMAGE_URL={BASE_IMAGE_URL}
          />
        ))}
      </div>
    </div>
  );
};

export default Electronics;
