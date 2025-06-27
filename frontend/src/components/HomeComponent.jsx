import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>🏠 Home - Prototipo Zero Waste</h2>
      <p>Bienvenido a la simulación local del proyecto Zero Waste.</p>
      <Link to="/image">
        <button>Ir a imagen 📸</button>
      </Link>
    </div>
  )
}

export default Home
