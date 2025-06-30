// src/components/Footer.jsx
import './Footer.css';
import logoICDA from '../assets/logo_icda.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h2>Zero Waste</h2>
        <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-linkedin"></i>
          <i className="fab fa-youtube"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-columns">
          <div className="footer-column">
            <p>Quienes somos</p>
            <p>Servicios</p>
            <p>Proveedores</p>
          </div>
          <div className="footer-column">
            <p>Contáctanos</p>
            <p>Reclamos</p>
          </div>
        </div>
        <img src={logoICDA} alt="Logo ICDA" className="footer-logo" />
      </div>
    </footer>
  );
};

export default Footer;
