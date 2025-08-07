import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Acasa, {}) }), _jsx(Route, { path: "/products", element: _jsx(Produse, {}) }), _jsx(Route, { path: "/products/global", element: _jsx(Global, {}) }), _jsx(Route, { path: "/products/airon", element: _jsx(Airon, {}) }), _jsx(Route, { path: "/products/varex", element: _jsx(Varex, {}) }), _jsx(Route, { path: "/products/spediance", element: _jsx(Spediance, {}) }), _jsx(Route, { path: "/news", element: _jsx(Stiri, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) })] }), _jsx(Footer, {})] }));
}
export default App;
