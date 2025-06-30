import { saveAs } from 'file-saver'
import Papa from 'papaparse'

const ReportDownload = () => {
  const data = [
    { mes: 'Enero', año: 2025, monto: 1200 },
    { mes: 'Febrero', año: 2025, monto: 950 },
    { mes: 'Marzo', año: 2025, monto: 1100 },
  ]

  const descargarCSV = () => {
    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'reporte_anual.csv')
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Reporte Anual</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Mes</th>
            <th style={styles.th}>Año</th>
            <th style={styles.th}>Monto ($)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fila, i) => (
            <tr key={i} style={i % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <td style={styles.td}>{fila.mes}</td>
              <td style={styles.td}>{fila.año}</td>
              <td style={styles.td}>{fila.monto}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={descargarCSV} style={styles.button}>⬇️ Descargar CSV</button>
    </div>
  )
}

const styles = {
  container: {
  padding: '30px',
  backgroundColor: '#f9fbfd',
  fontFamily: 'Arial, sans-serif',
  minHeight: '100vh',
  textAlign: 'center',
  width: '100vw',
  boxSizing: 'border-box',
  },
  title: {
    fontSize: '28px',
    color: '#34495e',
    marginBottom: '20px',
  },
  table: {
    margin: '0 auto 20px auto',
    borderCollapse: 'collapse',
    width: '80%',
    maxWidth: '600px',
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  th: {
    borderBottom: '2px solid #2980b9',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#ecf3fa',
    color: '#2980b9',
  },
  td: {
  padding: '10px',
  borderBottom: '1px solid #ddd',
  color: '#2c3e50',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: 'white',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
}

export default ReportDownload
