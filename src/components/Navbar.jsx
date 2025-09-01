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
        <li><a href='http://localhost:3000/home'><FontAwesomeIcon icon={faHome} /> Home</a></li>
        <li><a href='http://localhost:3000/products'><FontAwesomeIcon icon={faBox} /> Products</a></li>
        <li><a href='http://localhost:3000/about'><FontAwesomeIcon icon={faInfoCircle} /> About</a></li>
        <li><a href='http://localhost:3000/account'><FontAwesomeIcon icon={faUser} /> Account</a></li>
        <li><a href='http://localhost:3000/cart'><FontAwesomeIcon icon={faCartShopping} /> Cart</a></li>
        <li><a href='http://localhost:3000/logout'><FontAwesomeIcon icon={faRightToBracket} /> Logout</a></li>
      </ul>
    </div>
  );
};

export default Navbar;
