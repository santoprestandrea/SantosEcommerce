import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import "./Navbar.css";

/* navbar responsive che contiene tutti i link necessari per andare nelle altre pagine */
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
  };

  return (
    <nav className="navbar">
      <div className={`menu-icon ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className="logo-container">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <div className="logo-title-container">
            <img src="/logo.png" alt="Logo" className="logo" />
            <h1 className="site-title">E-Shop Informatica</h1>
          </div>
        </Link>
      </div>
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/prodotti" className="nav-link" onClick={closeMenu}>Prodotti</Link></li>
        <li><Link to="/chi-siamo" className="nav-link" onClick={closeMenu}>Chi siamo</Link></li>
        <li><Link to="/indirizzo" className="nav-link" onClick={closeMenu}>Indirizzo</Link></li>
        <li><Link to="/contatti" className="nav-link" onClick={closeMenu}>Contatti</Link></li>

        {user?.role === "admin" && (
          <li><Link to="/admin" className="nav-link" onClick={closeMenu}>Dashboard Admin</Link></li>
        )}

        {user ? (
          <>
            <li><span className="nav-link">Ciao, {user.email}</span></li>
            <li><button className="btn-logout" onClick={handleLogout} >Esci</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
