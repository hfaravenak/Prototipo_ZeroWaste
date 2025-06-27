import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>📷 Última Imagen Capturada</h2>

      <button onClick={capturarFoto} disabled={loading}>
        {loading ? 'Tomando muestra...' : 'Tomar muestra'}
      </button>

      <div style={{ marginTop: '20px' }}>
        {imagen ? (
          <>
            <img src={imagen} alt="Última imagen tomada" style={{ maxWidth: '600px' }} />

            {volumen !== null && (
              volumen > 0 ? (
                <>
                  <p style={{ fontSize: '18px', marginTop: '10px' }}>
                    Volumen: <strong>{volumen} Unidades volumétricas</strong>
                  </p>
                  {tipoComida && (
                    <p style={{ fontSize: '18px', marginTop: '5px' }}>
                      Plato de comida: <strong>{tipoComida}</strong>
                    </p>
                  )}
                </>
              ) : (
                <p style={{ fontSize: '18px', marginTop: '10px', color: 'orange' }}>
                  ⚠️ No se detecta comida en el plato.
                </p>
              )
            )}
          </>
        ) : (
          <p>No se han encontrado imágenes aún.</p>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link to="/">
          <button>🏠 Volver al Home</button>
        </Link>
      </div>
    </div>
  )
}

export default Image
