// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeComponent from './components/HomeComponent';
import ImageComponent from './components/ImageComponent';
import IngredientReportComponent from './components/IngredientReportComponent';
import ReportComponent from './components/ReportComponent';
import ReportDownloadComponent from './components/ReportDownloadComponent';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/image" element={<ImageComponent />} />
          <Route path="/ingredientes" element={<IngredientReportComponent />} />
          <Route path="/reportes" element={<ReportComponent />} />
          <Route path="/reporte-anual" element={<ReportDownloadComponent />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
