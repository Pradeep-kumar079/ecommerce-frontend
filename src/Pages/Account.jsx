import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Account.css";
import { Navigate } from "react-router-dom";

const Account = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [user, setUser] = useState({
    username: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });

  const [orders, setOrders] = useState([]);
  const [cartItems , setCartItems] = useState([]);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) return;

          const res = await fetch(`${REACT_APP_API_URL}/api/user/`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!res.ok) {
            const errData = await res.json();
            console.error("Error fetching user:", errData);
            return;
          }

          const data = await res.json();
          setUser({
            username: data.username || data.username || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            city: data.city || "",
            state: data.state || "",
            zip: data.zip || "",
            gender: data.gender || ""
          });
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };

      fetchUser();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser((prev) => ({ ...prev, [name]: value }));
    };

    // Save updated user info to backend
    const handleSave = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Not logged in!");
          return;
        }

        const res = await fetch(`${REACT_APP_API_URL}/api/user/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ FIXED
          },
          body: JSON.stringify(user),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Error updating user:", data);
          alert("Failed to update profile");
          return;
        }

        alert("Profile updated successfully!");
        console.log("Update response data:", data);
        setUser(data);
      } catch (err) {
        console.error("Error updating user:", err);
      }
    };


    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, user not logged in");
          Navigate("/login");
          return;
        }

        const response = await fetch(`${REACT_APP_API_URL}/api/user/get-orders`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", response.status, errorText);
          return;
        }

        const data = await response.json();
        setOrders(data.orders);
        console.log("Fetched orders:", data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, user not logged in");
          return;
        }

        const response = await fetch(`${REACT_APP_API_URL}/api/cart/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Cart API response:", data);

        // ✅ Fix: correct path
        setCartItems(data.cart && data.cart.items ? data.cart.items : []);
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };
    const updateUserData = async () => {
     try {
       const token = localStorage.getItem("token");
       if (!token) {
         alert("Not logged in!");
         return;
       }

      const res = await fetch(`${REACT_APP_API_URL}/api/user/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
      });

       const data = await res.json();

       if (!res.ok) {
         console.error("Error updating user:", data);
         alert("Failed to update profile");
         return;
       }
       console.log("Update response data:", data);
       alert("Profile updated successfully!");
       setUser(data);
     } catch (err) {
       console.error("Error updating user:", err);
     }
   };

  return (
    <div>
      <Navbar />

      <div className="mainActions">
        {/* Sidebar */}
        <div className="Details">
          <h2>Account Details</h2>
          <div className="buttons">
            <button
              className={activeSection === "profile" ? "activeBtn" : ""}
              onClick={() => setActiveSection("profile")}
            >
              Profile Information
            </button>
            <button
              className={activeSection === "address" ? "activeBtn" : ""}
              onClick={() => setActiveSection("address")}
            >
              Manage Address
            </button>
            <button
              className={activeSection === "payment" ? "activeBtn" : ""}
              onClick={() => setActiveSection("payment")}
            >
              Payment Methods
            </button>
          </div>

          <h2>Your Orders</h2>
          <div className="buttons">
            <button
              className={activeSection === "orders" ? "activeBtn" : ""}
              onClick={() => {
                setActiveSection("orders");
                fetchOrders();
              }}
            >
              View Order History
            </button>
            <button
              className={activeSection === "track" ? "activeBtn" : ""}
              onClick={() => setActiveSection("track")}
            >
              Track Order
            </button>
          </div>

          <h2>Customer Support</h2>
          <div className="buttons">
            <button
              className={activeSection === "support" ? "activeBtn" : ""}
              onClick={() => setActiveSection("support")}
            >
              Contact Support
            </button>
            <button
              className={activeSection === "faq" ? "activeBtn" : ""}
              onClick={() => setActiveSection("faq")}
            >
              FAQ
            </button>
          </div>

          <h2>My Stuff</h2>
          <div className="buttons">
            <button
              className={activeSection === "cart" ? "activeBtn" : ""}
              onClick={() => setActiveSection("cart")}
            >
              Cart Items
            </button>
            <button
              className={activeSection === "reviews" ? "activeBtn" : ""}
              onClick={() => setActiveSection("reviews")}
            >
              My Reviews and Ratings
            </button>
            <button
              className={activeSection === "notifications" ? "activeBtn" : ""}
              onClick={() => setActiveSection("notifications")}
            >
              Notifications
            </button>
          </div>

          <div className="logout">
            <div className="buttons">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="mainActionDetails">
          {activeSection === "profile" && (
            <div className="DetailsPersonal">
              <h2>Profile Information</h2>
              <label htmlFor="name">Username</label>
              <input
                type="text"
                name="username"
                value={user.username || " "}
                onChange={handleChange}
              />

              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                id="gender"
                value={user.gender || " "}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={user.email || " "}
                onChange={handleChange}
              />

              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={user.phone || " "}
                onChange={handleChange}
              />

              <button className="saveBtn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          )}

          {activeSection === "address" && (
            <div className="DetailsAddress">
              <h2>Manage Address</h2>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={user.address || " "}
                onChange={handleChange}
              />

              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                value={user.city || " "}
                onChange={handleChange}
              />

              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                value={user.state || " "}
                onChange={handleChange}
              />

              <label htmlFor="zip">Zip Code</label>
              <input
                type="text"
                name="zip"
                value={user.zip || " "}
                onChange={handleChange}
              />

              <button className="saveBtn" onClick={handleSave}>
                Save Address
              </button>
            </div>
          )}

          {activeSection === "payment" && (
            <div>
              <h2>Payment Methods</h2>
              <p>Saved cards, UPI, and wallets will appear here.</p>
            </div>
          )}

          {activeSection === "orders" && (
        <div className="orderActions">
          <h2>Your Orders</h2>

          {orders.length === 0 ? (
          <p>No orders found.</p>
          ) : (
          orders.map((order) => (
          <div key={order._id} className="order-card">
          <h3>Order id : {order._id}</h3>
          <p><strong>Status:</strong> {order.orderStatus}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
          <p><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

          <h4>Products:</h4>
          {order.orderItems && order.orderItems.length > 0 ? (
          order.orderItems.map((item, index) => (
          <div key={index} className="product-item">
          {item.product ? (
            <>
              <img
                src={`${REACT_APP_API_URL}${item.product.images}`}
                alt={item.product.name}
              />
              <div className="product-details">
                <p className="product-name">{item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            </>
          ) : (
            <p>Product details not available</p>
          )}
          </div>
          ))
          ) : (
          <p>No products found in this order.</p>
          )}
          </div>
          ))
          )}
          </div>

          )}




          {activeSection === "track" && (
            <div>
              <h2>Track Order</h2>
              <p>Enter your order ID to track the status.</p>
            </div>
          )}

          {activeSection === "support" && (
            <div className="supportActions">
              <h2>Customer Support</h2>
              <p>Contact us at support@example.com or call 1800-123-456</p>
            </div>
          )}

          {activeSection === "faq" && (
            <div>
              <h2>FAQ</h2>
              <p>Frequently Asked Questions will appear here.</p>
            </div>
          )}

         {activeSection === "cart" && (
            <div>
              <h2>Cart Items</h2>
              <ul>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <li key={item._id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                      {item.productId ? (
                        <>
                          <img
                            src={item.productId.images}
                            alt={item.productId.name}
                            style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }}
                          />
                          <span>
                            {item.productId.name} - ₹{item.productId.price} × {item.quantity}
                          </span>
                        </>
                      ) : (
                        <span>Product details not available</span>
                      )}
                    </li>
                  ))
                ) : (
                  <li>No items in cart</li>
                )}
              </ul>
            </div>
          )}


          {activeSection === "reviews" && (
            <div>
              <h2>My Reviews and Ratings</h2>
              <p>You haven't reviewed any product yet.</p>
            </div>
          )}

          {activeSection === "notifications" && (
            <div>
              <h2>Notifications</h2>
              <p>No new notifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
