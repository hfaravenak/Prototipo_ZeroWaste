const Report = () => {
  // Datos estáticos de ejemplo
  const reportData = [
    { mes: 'Enero', año: 2025, monto: 345000 },
    { mes: 'Febrero', año: 2025, monto: 337500 },
    { mes: 'Marzo', año: 2025, monto: 329000 },
    { mes: 'Abril', año: 2025, monto: 334000 },
    { mes: 'Mayo', año: 2025, monto: 302000 },
    { mes: 'Junio', año: 2025, monto: 298000 },
    { mes: 'Julio', año: 2025, monto: 275000 },
    { mes: 'Agosto', año: 2025, monto: 253000 },
    { mes: 'Septiembre', año: 2025, monto: 245000 },
    { mes: 'Octubre', año: 2025, monto: 198000 },
    { mes: 'Noviembre', año: 2025, monto: 210500 },
    { mes: 'Diciembre', año: 2025, monto: 178000 },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Reportes Zero Waste</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Mes</th>
            <th style={styles.th}>Año</th>
            <th style={styles.th}>Monto</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((row, index) => (
            <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <td style={styles.td}>{row.mes}</td>
              <td style={styles.td}>{row.año}</td>
              <td style={styles.td}>${row.monto.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={styles.resumen}>
        En el transcurso del año 2025, se observa una tendencia general a la baja en los costos asociados al desperdicio de alimentos. 
        Comparando enero con diciembre, los costos se redujeron de $345.000 a $178.000, lo que representa una disminución aproximada del 48,4%. 
        Esta reducción refleja mejoras en la planificación, el control de porciones y la eficiencia operativa del restaurante.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    minHeight: '100vh',
    backgroundColor: '#f9fbfd',
    fontFamily: 'Arial, sans-serif',
    width: '100vw',
    boxSizing: 'border-box',
  },
  title: {
    marginBottom: '20px',
    color: '#34495e',
    fontSize: '28px',
  },
  table: {
    borderCollapse: 'collapse',
    width: '80%',
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
  resumen: {
    marginTop: '30px',
    fontSize: '16px',
    color: '#2c3e50',
    textAlign: 'center',
    maxWidth: '700px',
    lineHeight: '1.5',
  },
};

export default Report;
