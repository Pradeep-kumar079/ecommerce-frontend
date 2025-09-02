import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Toys.css';

const Toys = () => {
  const BASE_IMAGE_URL = "http://localhost:https://ecommerce-backend-4hva.onrender.com";
  const [toys, setToys] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_IMAGE_URL}/api/home/all-products`)
      .then(res => {
        const toyItems = res.data.filter(p => p.category === "toys");
        setToys(toyItems);
      })
      .catch(err => console.error("Error fetching toys:", err));
  }, []);

  return (
    <div className="toys-container">
      <div className="toys-list">
        {toys.map(item => (
          <ProductCard
            key={item._id}
            product={item}
            BASE_IMAGE_URL={BASE_IMAGE_URL}
          />
        ))}
      </div>
    </div>
  )
}

export default Toys;
