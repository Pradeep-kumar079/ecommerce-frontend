import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './Sports.css';

const Sports = () => {
  const BASE_IMAGE_URL = process.env.REACT_APP_API_URL; // API base URL
  const [sportsProducts, setSportsProducts] = useState([]);

  useEffect(() => {
    const fetchSportsProducts = async () => {
      try {
        const res = await axios.get(`${BASE_IMAGE_URL}/api/home/all-products`);
        const sportsItems = res.data.filter(p => p.category === "sports");
        setSportsProducts(sportsItems);
        console.log("Sports products fetched:", sportsItems);
      } catch (err) {
        console.error("Error fetching sports products:", err);
      }
    };

    fetchSportsProducts();
  }, [BASE_IMAGE_URL]);

  return (
    <div className="sports-container">
      <div className="sports-list">
        {sportsProducts.map(item => (
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

export default Sports;
