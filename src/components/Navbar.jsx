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
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
          <Link to="/">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
        </li>
        <li>
          <Link to="/products">
            <FontAwesomeIcon icon={faBox} /> Products
          </Link>
        </li>
        <li>
          <Link to="/about">
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </Link>
        </li>
        <li>
          <Link to="/account">
            <FontAwesomeIcon icon={faUser} /> Account
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} /> Cart
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <FontAwesomeIcon icon={faRightToBracket} /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
