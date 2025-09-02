import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Optional: logout API call
        // await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/logout`);

        // Clear local/session storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.clear(); // optional

        // Redirect to login after a short delay
        setTimeout(() => navigate('/login'), 500);
      } catch (err) {
        console.error("Logout failed:", err);
        navigate('/login'); // fallback
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
