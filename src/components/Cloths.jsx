import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./Cloth.css";

const Cloths = () => {
  const [cloths, setCloths] = useState([]);
  const BASE_IMAGE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchCloths = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_IMAGE_URL}/api/home/all-products`);
      const clothItems = res.data.filter(p => p.category === "clothing");
      setCloths(clothItems);
    } catch (err) {
      console.error("Error fetching cloths:", err);
    }
  }, [BASE_IMAGE_URL]);

  useEffect(() => {
    fetchCloths();
  }, [fetchCloths]);

  return (
    <div className="cloths-container">
      <h2>Clothes</h2>
      <p>Explore our collection of fashionable clothes.</p>
      <div className="cloths-list">
        {cloths.map(cloth => (
          <ProductCard
            key={cloth._id}
            product={cloth}
            BASE_IMAGE_URL={BASE_IMAGE_URL}
          />
        ))}
      </div>
    </div>
  );
};

export default Cloths;
