
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="navbar-logo">IG</div>

          <div className="navbar-brand-text">
            <span className="brand-title">Instagram</span>
            <span className="brand-subtitle">Downloader</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`navbar-toggle ${
            menuOpen ? "active" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`mobile-menu ${
          menuOpen ? "open" : ""
        }`}
      >
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;

