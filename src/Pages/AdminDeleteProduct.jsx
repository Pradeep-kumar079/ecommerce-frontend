import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDeleteProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const productId = window.location.pathname.split("/").pop();
  const APP_URL = process.env.REACT_APP_API_URL;

  // Fetch single product
  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`${APP_URL}/api/admin/product/${id}`);
      setProduct(response.data);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) fetchProduct(productId);
  }, [productId]);

  // Delete product
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`${APP_URL}/api/admin/delete-product/${id}`);
      alert("✅ Product deleted successfully!");
      navigate("/admin/manage-products");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("❌ Failed to delete product");
    }
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Delete Product</h2>
      {product ? (
        <div>
          <p>Are you sure you want to delete the following product?</p>
          <h3>{product.name}</h3>
          <p>Type: {product.type}</p>
          <p>Category: {product.category}</p>
          <p>Price: ₹{product.price}</p>
          <p>Stock: {product.stock}</p>
          <button
            onClick={() => handleDelete(product._id)}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Delete
          </button>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default AdminDeleteProduct;
