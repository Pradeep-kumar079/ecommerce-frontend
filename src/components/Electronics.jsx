import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './Electronic.css';

const Electronics = () => {
  const [electronics, setElectronics] = useState([]);
  const BASE_IMAGE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchElectronics = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_IMAGE_URL}/api/home/all-products`);
      const electronicItems = res.data.filter(p => p.category === "electronics");
      setElectronics(electronicItems);
    } catch (err) {
      console.error("Error fetching electronics:", err);
    }
  }, [BASE_IMAGE_URL]);

  useEffect(() => {
    fetchElectronics();
  }, [fetchElectronics]);

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
