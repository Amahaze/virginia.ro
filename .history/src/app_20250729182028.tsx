import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar/Navbar';
import Acasa from './components/Acasa/Acasa';
import Produse from './components/Produse/Produse';
import Stiri from './components/Stiri/Stiri';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Global from './components/products/Global/Global';
import Airon from './components/products/Airon/Airon';
import Varex from './components/products/Varex/Varex';
import Spediance from './components/products/Spediance/Spediance';
import theme from './theme';
import './App.css';

function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Acasa />} />
        <Route path="/products" element={<Produse />} />
        <Route path="/products/global" element={<Global />} />
        <Route path="/products/airon" element={<Airon />} />
        <Route path="/products/varex" element={<Varex />} />
        <Route path="/products/spediance" element={<Spediance />} />
        <Route path="/news" element={<Stiri />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;