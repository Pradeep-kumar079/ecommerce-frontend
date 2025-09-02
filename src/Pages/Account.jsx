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
    zip: "",
  });

  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loggedOut, setLoggedOut] = useState(false);

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoggedOut(true);
          return;
        }

        const res = await fetch(`${REACT_APP_API_URL}/api/user/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          setLoggedOut(true);
          return;
        }

        const data = await res.json();
        setUser({
          username: data.username || "",
          gender: data.gender || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          zip: data.zip || "",
        });
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoggedOut(true);
        return;
      }

      const res = await fetch(`${REACT_APP_API_URL}/api/user/get-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setOrders(data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoggedOut(true);
        return;
      }

      const res = await fetch(`${REACT_APP_API_URL}/api/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCartItems(data.cart?.items || []);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Failed to update profile");
        return;
      }

      alert("Profile updated successfully!");
      setUser(data);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedOut(true);
  };

  // Redirect if not logged in
  if (loggedOut) return <Navigate to="/login" />;

  const BASE_IMAGE_URL = REACT_APP_API_URL;

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
              onClick={() => {
                setActiveSection("cart");
                fetchCartItems();
              }}
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
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="mainActionDetails">
          {/* Profile */}
          {activeSection === "profile" && (
            <div className="DetailsPersonal">
              <h2>Profile Information</h2>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
              <label>Gender</label>
              <select name="gender" value={user.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
              <button className="saveBtn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          )}

          {/* Address */}
          {activeSection === "address" && (
            <div className="DetailsAddress">
              <h2>Manage Address</h2>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
              />
              <label>City</label>
              <input type="text" name="city" value={user.city} onChange={handleChange} />
              <label>State</label>
              <input type="text" name="state" value={user.state} onChange={handleChange} />
              <label>Zip Code</label>
              <input type="text" name="zip" value={user.zip} onChange={handleChange} />
              <button className="saveBtn" onClick={handleSave}>
                Save Address
              </button>
            </div>
          )}

          {/* Payment */}
          {activeSection === "payment" && (
            <div>
              <h2>Payment Methods</h2>
              <p>Saved cards, UPI, and wallets will appear here.</p>
            </div>
          )}

          {/* Orders */}
          {activeSection === "orders" && (
            <div className="orderActions">
              <h2>Your Orders</h2>
              {orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                orders.map((order) => (
                  <div key={order._id} className="order-card">
                    <h3>Order id: {order._id}</h3>
                    <p>
                      <strong>Status:</strong> {order.orderStatus}
                    </p>
                    <p>
                      <strong>Total:</strong> ₹{order.totalAmount}
                    </p>
                    <p>
                      <strong>Payment Method:</strong> {order.paymentMethod}
                    </p>
                    <p>
                      <strong>Payment Status:</strong> {order.paymentStatus}
                    </p>
                    <p>
                      <strong>Placed on:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                    <h4>Products:</h4>
                    {order.orderItems?.length > 0 ? (
                      order.orderItems.map((item, idx) => (
                        <div key={idx} className="product-item">
                          {item.product ? (
                            <>
                              <img
                                src={`${BASE_IMAGE_URL}${item.product.images?.[0]}`}
                                alt={item.product.name}
                              />
                              <div className="product-details">
                                <p>{item.product.name}</p>
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

          {/* Track */}
          {activeSection === "track" && (
            <div>
              <h2>Track Order</h2>
              <p>Enter your order ID to track the status.</p>
            </div>
          )}

          {/* Support */}
          {activeSection === "support" && (
            <div>
              <h2>Customer Support</h2>
              <p>Contact us at support@example.com or call 1800-123-456</p>
            </div>
          )}

          {/* FAQ */}
          {activeSection === "faq" && (
            <div>
              <h2>FAQ</h2>
              <p>Frequently Asked Questions will appear here.</p>
            </div>
          )}

          {/* Cart */}
          {activeSection === "cart" && (
            <div>
              <h2>Cart Items</h2>
              {cartItems.length === 0 ? (
                <p>No items in cart</p>
              ) : (
                <ul>
                  {cartItems.map((item) => (
                    <li
                      key={item._id || item.productId?._id}
                      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
                    >
                      {item.productId ? (
                        <>
                          <img
                            src={`${BASE_IMAGE_URL}${item.productId.images?.[0]}`}
                            alt={item.productId.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              marginRight: "10px",
                            }}
                          />
                          <span>
                            {item.productId.name} - ₹{item.productId.price} × {item.quantity}
                          </span>
                        </>
                      ) : (
                        <span>Product details not available</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Reviews */}
          {activeSection === "reviews" && (
            <div>
              <h2>My Reviews and Ratings</h2>
              <p>You haven't reviewed any product yet.</p>
            </div>
          )}

          {/* Notifications */}
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
