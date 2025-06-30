import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const IngredientReport = () => {
  // Datos de prueba
  const data = [
    { ingrediente: 'Arroz', desperdicio: 15, tipo: 'sólido' },
    { ingrediente: 'Aceite', desperdicio: 6, tipo: 'líquido' },
    { ingrediente: 'Carne', desperdicio: 12, tipo: 'sólido' },
    { ingrediente: 'Leche', desperdicio: 7, tipo: 'líquido' },
  ]

  // Colores para el gráfico
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  // Convertimos los datos para el gráfico
  const pieData = data.map((item) => ({
    name: item.ingrediente,
    value: item.desperdicio,
  }))

  const getUnidad = (tipo) => (tipo === 'líquido' ? 'Litros' : 'Kg')

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧾 Reporte de Ingredientes</h2>

      <div style={styles.section}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Ingrediente</th>
              <th style={styles.th}>Desperdicio</th>
              <th style={styles.th}>Unidad</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} style={i % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td style={styles.td}>{item.ingrediente}</td>
                <td style={styles.td}>{item.desperdicio}</td>
                <td style={styles.td}>{getUnidad(item.tipo)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.chartContainer}>
        <h3 style={styles.subtitle}>Distribución del Desperdicio</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const styles = {
  container: {
  padding: '30px',
  minHeight: '100vh',
  backgroundColor: '#f9fbfd',
  fontFamily: 'Arial, sans-serif',
  width: '100vw',           // ✅ asegura ancho total
  boxSizing: 'border-box',  // ✅ evita scrolls indeseados
  },
  title: {
    textAlign: 'center',
    color: '#34495e',
    fontSize: '28px',
    marginBottom: '20px',
  },
  section: {
    display: 'flex',
    justifyContent: 'center',
  },
  table: {
    borderCollapse: 'collapse',
    width: '90%',
    maxWidth: '600px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
  },
  th: {
    borderBottom: '2px solid #2980b9',
    padding: '12px 15px',
    textAlign: 'left',
    color: '#2980b9',
    fontWeight: '600',
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    color: '#2c3e50',
  },
  evenRow: {
    backgroundColor: '#f7f9fc',
  },
  oddRow: {
    backgroundColor: 'white',
  },
  chartContainer: {
    marginTop: '40px',
    width: '100%',
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subtitle: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '10px',
  },
}

export default IngredientReport