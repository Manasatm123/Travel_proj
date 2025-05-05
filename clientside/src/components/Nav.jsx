import '../CSS/Navbar.css';


import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaCog } from "react-icons/fa";


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__title">My App</div>
      <div className="navbar__right">
        <FaBell className="navbar__icon" />

        <div className="navbar__dropdown" ref={dropdownRef}>
          <FaCog
            className="navbar__icon"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div className="dropdown__menu">
              <a href="/login" className="dropdown__item">Login</a>
              <a href="/register" className="dropdown__item">Register</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
