import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './HomeAppliances.css';

const HomeAppliances = () => {
  const [homeAppliances, setHomeAppliances] = useState([]);
  const BASE_IMAGE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchHomeAppliances = async () => {
      try {
        const res = await axios.get(`${BASE_IMAGE_URL}/api/home/all-products`);
        // Filter only home appliances
        const homeApplianceItems = res.data.filter(p => p.category === "home-appliances");
        setHomeAppliances(homeApplianceItems);
      } catch (err) {
        console.error("Error fetching home appliances:", err);
      }
    };

    fetchHomeAppliances();
  }, [BASE_IMAGE_URL]);

  return (
    <div className="home-appliances-container">
      <h1 className="home-appliances-title">Home Appliances</h1>
      <div className="home-appliances-list">
        {homeAppliances.map(item => (
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

export default HomeAppliances;
