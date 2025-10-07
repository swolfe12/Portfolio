import React, { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import logo from './../../assets/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Desktop Left: Logo / Mobile Center */}
        <div className="navbar__logo">
            <img src={logo} className="logo" alt="SW"></img>
        </div>

        {/* Desktop Middle Nav */}
        <ul className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          <li>Home</li>
          <li>About</li>
          <li>Projects</li>
          <li>Contact</li>
        </ul>

        {/* Desktop Right Socials */}
        <div className="navbar__socials">
          <a href="#"><FaGithub /></a>
          <a href="#"><FaLinkedin /></a>
        </div>

        {/* Mobile Hamburger */}
        <button className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>
          <div className="navbar__mobile-socials">
            <a href="#"><FaGithub /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
