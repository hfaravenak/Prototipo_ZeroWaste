import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const ReportDownload = () => {
  const data = [
    { ingrediente: 'Arroz', plato: 'Pollo con Arroz', cantidad: 150, unidad: 'gramos', porcentaje: -10 },
    { ingrediente: 'Aceite', plato: 'Pollo con Arroz', cantidad: 10, unidad: 'mililitros', porcentaje: -5 },
    { ingrediente: 'Fideos', plato: 'Fideos con Salsa', cantidad: 180, unidad: 'gramos', porcentaje: 15 },
    { ingrediente: 'Salsa', plato: 'Fideos con Salsa', cantidad: 60, unidad: 'mililitros', porcentaje: 0 },
    { ingrediente: 'Carne', plato: 'Estofado', cantidad: 200, unidad: 'gramos', porcentaje: 5 },
    { ingrediente: 'Papas', plato: 'Estofado', cantidad: 120, unidad: 'gramos', porcentaje: -15 },
  ];

  const descargarCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'resumen_porciones_receta.csv');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🍽️ Resumen de Porciones por Receta</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Ingrediente</th>
            <th style={styles.th}>Plato</th>
            <th style={styles.th}>Cantidad</th>
            <th style={styles.th}>Unidad</th>
            <th style={styles.th}>% Ajuste</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fila, i) => (
            <tr key={i} style={i % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <td style={styles.td}>{fila.ingrediente}</td>
              <td style={styles.td}>{fila.plato}</td>
              <td style={styles.td}>{fila.cantidad}</td>
              <td style={styles.td}>{fila.unidad}</td>
              <td style={styles.td}>
                {fila.porcentaje > 0 ? '+' : ''}
                {fila.porcentaje}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={descargarCSV} style={styles.button}>⬇️ Descargar CSV</button>
    </div>
  );
};

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
    width: '90%',
    maxWidth: '800px',
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
};

export default ReportDownload;