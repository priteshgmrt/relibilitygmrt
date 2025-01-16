import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "../App.css";
import logo from "../assets/ncra-logo.png";
import Menu_icon from "./Menu_icon";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/reliabilitygmrt" className="navbar-logo">
          <img src={logo} alt="GMRT Logo" className="logo" />
        </Link>
        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          <Menu_icon />
        </div>
        {/* Navigation Menu */}
        <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          <li className="navbar-item active">
            <Link to="/reliabilitygmrt" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/upload-excel" className="navbar-link color">
              Upload Excel
            </Link>
          </li>
          <li className="navbar-item">
            <a
              href="http://callsheet.gmrt.ncra.tifr.res.in/"
              className="navbar-link"
            >
              Callsheet
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="https://www.gmrt.ncra.tifr.res.in/"
              className="navbar-link"
            >
              Official-web
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
