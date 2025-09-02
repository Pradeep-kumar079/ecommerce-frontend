import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCartShopping,
  faBars,
  faTimes,
  faHome,
  faBox,
  faInfoCircle,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <div className='navbar'>
      <h1>My Store</h1>

      <div className="menubar" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </div>

      <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
        <div className="nameblock">
          <h3>Hello, Pradeep</h3>
        </div>
        <li>
          <a href={`${API_URL}/home`}>
            <FontAwesomeIcon icon={faHome} /> Home
          </a>
        </li>
        <li>
          <a href={`${API_URL}/products`}>
            <FontAwesomeIcon icon={faBox} /> Products
          </a>
        </li>
        <li>
          <a href={`${API_URL}/about`}>
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </a>
        </li>
        <li>
          <a href={`${API_URL}/account`}>
            <FontAwesomeIcon icon={faUser} /> Account
          </a>
        </li>
        <li>
          <a href={`${API_URL}/cart`}>
            <FontAwesomeIcon icon={faCartShopping} /> Cart
          </a>
        </li>
        <li>
          <a href={`${API_URL}/logout`}>
            <FontAwesomeIcon icon={faRightToBracket} /> Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
