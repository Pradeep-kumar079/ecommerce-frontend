import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product, BASE_IMAGE_URL = "http://localhost:5000" }) => {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = () => setLiked(!liked);

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      // 👇 send product to backend
      const token = localStorage.getItem("token"); // ensure user logged in
      const res = await fetch("http://localhost:5000/api/cart/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // required because of verifyToken middleware
        },
        body: JSON.stringify({
          productId: product._id,
          attributes: {}, // if you don’t have attributes (size, color etc.), keep empty
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Product added to cart!");
        console.log("Updated Cart:", data.cart);
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("⚠️ Error adding product to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-container">
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="product-card">
          <img
            src={`${BASE_IMAGE_URL}${product.images?.[0] || ""}`}
            alt={product.name}
            className="product-img"
          />
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <p>{product.description}</p>

          <div className="product-buttons">
            <button
              onClick={handleLike}
              style={{ color: liked ? "red" : "gray", fontSize: "24px" }}
            >
              <FaHeart />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault(); // stop <Link> navigation
                handleAddToCart();
              }}
              disabled={loading}
              style={{ fontSize: "12px", width: "60px" }}
            >
              {loading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
