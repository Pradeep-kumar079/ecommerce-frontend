import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./Cloth.css";
import { Link } from "react-router-dom";

const Cloths = () => {
  const [cloths, setCloths] = useState([]);
  const BASE_IMAGE_URL = "http://localhost:5000"; // include host

  useEffect(() => {
    axios.get(`${BASE_IMAGE_URL}/api/home/all-products`)
      .then(res => {
        const clothItems = res.data.filter(p => p.category === "clothing");
        setCloths(clothItems);
      })
      .catch(err => console.error("Error fetching cloths:", err));
  }, []);

  return (
    <div className="cloths-container">
      <h2>Clothes</h2>
      <p>Explore our collection of fashionable clothes.</p>
      <div className="cloths-list">
        {cloths.map(cloth => (
        //  <Link to={`/all-product/${cloth._id}`} key={cloth._id}>
          <ProductCard
            key={cloth._id}
            product={cloth}
            BASE_IMAGE_URL={BASE_IMAGE_URL}
          />
        //  </Link>
        ))}
      </div>
    </div>
  );
};

export default Cloths;
