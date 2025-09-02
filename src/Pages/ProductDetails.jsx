import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import Navbar from '../components/Navbar';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const BASE_IMAGE_URL = process.env.REACT_APP_API_URL;

  // Fetch product, related products, and user
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product
        const { data: productData } = await axios.get(`${BASE_IMAGE_URL}/api/home/all-products/${id}`);
        setProduct(productData);

        // Fetch related products
        if (productData.category) {
          const { data: related } = await axios.get(
            `${BASE_IMAGE_URL}/api/home/products?category=${productData.category}`
          );
          const filtered = related.filter(rp => rp._id !== productData._id);
          setRelatedProducts(filtered);
        }

        // Fetch user if token exists
        const token = localStorage.getItem('token');
        if (token) {
          const { data: userData } = await axios.get(`${BASE_IMAGE_URL}/api/user/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(userData);
        }
      } catch (err) {
        console.error("Failed to fetch product, related products, or user:", err);
      }
    };

    fetchData();
  }, [id, BASE_IMAGE_URL]);

  const handleBuy = async () => {
    if (!user) return alert("Please log in to continue.");
    if (!product.price) return alert("Product price not available.");

    setLoadingPayment(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BASE_IMAGE_URL}/api/order/create`,
        {
          amount: product.price,
          customer: {
            customer_id: user._id,
            customer_name: user.username,
            customer_email: user.email,
            customer_phone: user.phone,
          },
          orderItems: [
            {
              product: product._id,
              quantity: 1,
              price: product.price,
            },
          ],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { paymentSessionId } = res.data;

      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.onload = () => {
        const cashfree = window.Cashfree({ mode: "sandbox" });
        cashfree.checkout({ paymentSessionId, redirectTarget: "_self" });
      };
      document.body.appendChild(script);
    } catch (err) {
      console.error("Error initiating payment", err);
      alert("Payment initialization failed. Please log in again.");
    } finally {
      setLoadingPayment(false);
    }
  };

  if (!product) return <div>Loading...</div>;

  const images = product.images
    ? Array.isArray(product.images)
      ? product.images
      : product.images.split(",")
    : [];

  return (
    <>
      <Navbar />
      <div className="single-product">
        <div className="product-left-container">
          <div className="gallery">
            <img
              src={`${BASE_IMAGE_URL}${images[currentIndex]?.trim()}`}
              alt={`${product.name}-${currentIndex}`}
              className="main-image"
            />
            <div className="thumbnails">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={`${BASE_IMAGE_URL}${img.trim()}`}
                  alt={`${product.name}-thumb-${index}`}
                  className={index === currentIndex ? "thumb active" : "thumb"}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="related-products">
            <h4>Related Products:</h4>
            <div className="related-grid">
              {relatedProducts.length > 0 ? (
                relatedProducts.map(rp => (
                  <Link 
                    key={rp._id} 
                    to={`/product/${rp._id}`} 
                    className="related-card"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <img
                      src={`${BASE_IMAGE_URL}${
                        Array.isArray(rp.images) ? rp.images[0] : rp.images.split(",")[0]
                      }`}
                      alt={rp.name}
                    />
                    <div className="related-info">
                      <h5>{rp.name}</h5>
                      <p>₹{rp.price}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No related products found.</p>
              )}
            </div>
          </div>
        </div>

        <div className="product-container">
          <div className="product-info">
            <h2>{product.name}</h2>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Type:</strong> {product.type}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <div className="descriptions">
              <p><strong>Description:</strong> {product.description}</p>
            </div>
            {product.attributes && (
              <div className="specifications">
                <h4>Specifications:</h4>
                <ul>
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={handleBuy} disabled={loadingPayment || product.stock <= 0}>
              {loadingPayment ? "Processing..." : product.stock <= 0 ? "Out of Stock" : "Buy"}
            </button>
          </div>

          <div className="reviews">
            <h4>Customer Reviews:</h4>
            <ul>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <li key={index}>
                    <strong>{review.username}</strong>: {review.comment} (Rating: {review.rating})
                  </li>
                ))
              ) : (
                <li>No reviews yet.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
