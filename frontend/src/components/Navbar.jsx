// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo_zero_waste.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Zero Waste Logo" className="navbar-logo" />
        <h1>Zero Waste - Prototipo</h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/image">Captura</Link></li>
        <li><Link to="/ingredientes">Ingredientes</Link></li>
        <li><Link to="/reportes">Reportes</Link></li>
        <li><Link to="/reporte-anual">Descarga Informe</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
