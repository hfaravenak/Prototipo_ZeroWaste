import { Link } from 'react-router-dom'
import logoZeroWaste from '../assets/logo_zero_waste.png'
import logoIcda from '../assets/logo_icda.png'

const Home = () => {
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        
        <h2 style={styles.title}>Zero Waste - Prototipo</h2>
        <p style={styles.subtitle}>
          Bienvenido a la simulación local del proyecto Zero Waste.
        </p>
        <Link to="/image">
          <button style={styles.button}>Ir a imagen 📸</button>
        </Link>
        <img
          src={logoIcda}
          alt="Logo ICDA Soluciones"
          style={styles.logoIcda}
        />
      </div>
    </div>
  )
}

const styles = {
  pageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f0f4f8',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '90%',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  logoPrincipal: {
    width: '180px',
    marginBottom: '20px',
  },
  title: {
    marginBottom: '10px',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: '18px',
    marginBottom: '30px',
    color: '#444', 
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  logoIcda: {
    width: '120px',
    marginTop: '30px',
  },
}

export default Home