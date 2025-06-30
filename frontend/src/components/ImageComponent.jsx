import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logoZeroWaste from '../assets/logo_zero_waste.png'

const Image = () => {
  const [imagen, setImagen] = useState(null)
  const [volumen, setVolumen] = useState(null)
  const [tipoComida, setTipoComida] = useState(null)
  const [loading, setLoading] = useState(false)

  const formatTipoComida = (tipo) => {
    if (tipo === 'arroz_con_pollo') return 'Pollo con Arroz'
    if (tipo === 'fideos') return 'Fideos'
    return tipo
  }

  const fetchLatestImage = () => {
    const timestamp = new Date().getTime()
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(files => {
        const filtered = files
          .filter(name => /\.(jpg|jpeg|png)$/i.test(name))
          .sort()
          .reverse()

        if (filtered.length > 0) {
          const latest = filtered[0]
          setImagen(`http://localhost:5000/images/${latest}?t=${timestamp}`)
        }
      })
      .catch(err => console.error('Error al cargar imagen:', err))
  }

  const capturarFoto = () => {
    setLoading(true)
    fetch('http://localhost:5000/capture', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.filename) {
          setVolumen(data.volumen_cm3)
          setTipoComida(formatTipoComida(data.tipo_comida))

          setTimeout(() => {
            fetchLatestImage()
            setLoading(false)
          }, 500)
        } else {
          console.error('Error en la captura:', data.error)
          setLoading(false)
        }
      })
      .catch(err => {
        console.error('Error al capturar imagen:', err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetch('http://localhost:5000/last')
      .then(res => res.json())
      .then(data => {
        if (data.filename) {
          const timestamp = new Date().getTime()
          setImagen(`http://localhost:5000/images/${data.filename}?t=${timestamp}`)
          setVolumen(data.volumen_cm3)
          setTipoComida(formatTipoComida(data.tipo_comida))
        }
      })
      .catch(err => {
        console.error('Error al cargar la imagen inicial:', err)
      })

    const interval = setInterval(fetchLatestImage, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
  <div style={styles.container}>
    <div style={styles.contentWrapper}>
      <img src={logoZeroWaste} alt="Zero Waste" style={styles.logo} />
      <h2 style={styles.title}>📷 Última Imagen Capturada</h2>

      <button onClick={capturarFoto} disabled={loading} style={styles.button}>
        {loading ? 'Tomando muestra...' : 'Tomar muestra'}
      </button>

      <div style={styles.imageContainer}>
        {imagen ? (
          <>
            <img src={imagen} alt="Última imagen tomada" style={styles.image} />
            {volumen !== null && (
              volumen > 0 ? (
                <>
                  <p style={styles.info}>
                    Volumen: <strong>{volumen} cm³</strong>
                  </p>
                  {tipoComida && (
                    <p style={styles.info}>
                      Plato de comida: <strong>{tipoComida}</strong>
                    </p>
                  )}
                </>
              ) : (
                <p style={styles.warning}>⚠️ No se detecta comida en el plato.</p>
              )
            )}
          </>
        ) : (
          <p style={styles.info}>No se han encontrado imágenes aún.</p>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link to="/">
          <button style={styles.backButton}>🏠 Volver al Home</button>
        </Link>
      </div>
    </div>
  </div>
  )
}

const styles = {
  contentWrapper: {
  maxWidth: '600px',
  width: '100%',
  },
  container: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100vw',
  backgroundColor: '#f9fbfd',
  padding: '30px',
  boxSizing: 'border-box',
  textAlign: 'center',
  },
  logo: {
    width: '120px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '28px',
    color: '#34495e',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2980b9',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  backButton: {
    marginTop: '20px',
    padding: '8px 18px',
    backgroundColor: '#27ae60',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  imageContainer: {
    marginTop: '30px',
  },
  image: {
    maxWidth: '90%',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  info: {
    fontSize: '18px',
    marginTop: '10px',
    color: '#2c3e50',
  },
  warning: {
    fontSize: '18px',
    marginTop: '10px',
    color: '#e67e22',
  },
}

export default Image