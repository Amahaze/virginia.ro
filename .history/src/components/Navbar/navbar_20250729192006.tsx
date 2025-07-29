import { useState } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <AppBar position="fixed" color="transparent" elevation={0}>
      <Toolbar className="toolbar">
        <Box className="logo">
          <img src="/src/assets/Logo.png" alt="Verginia" />
          <span>Verginia</span>
        </Box>
        
        <Box className="nav-links">
          <Button
            component={Link}
            to="/"
            disableRipple
            disableElevation
            variant="text"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            {t('home').charAt(0).toUpperCase() + t('home').slice(1).toLowerCase()}
          </Button>
          <Button
            component={Link}
            to="/products"
            disableRipple
            disableElevation
            variant="text"
            className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
          >
            {t('products').charAt(0).toUpperCase() + t('products').slice(1).toLowerCase()}
          </Button>
          <Button
            component={Link}
            to="/news"
            disableRipple
            disableElevation
            variant="text"
            className={`nav-link ${location.pathname === '/news' ? 'active' : ''}`}
          >
            {t('news').charAt(0).toUpperCase() + t('news').slice(1).toLowerCase()}
          </Button>
        </Box>

        <Box className="right-section">
          <Box className="language-buttons">
            <Button
              onClick={() => handleLanguageChange('ro')}
              className={`lang-button ${i18n.language === 'ro' ? 'active' : ''}`}
            >
              RO
            </Button>
            <Button
              onClick={() => handleLanguageChange('en')}
              className={`lang-button ${i18n.language === 'en' ? 'active' : ''}`}
            >
              EN
            </Button>
            <Button
              onClick={() => handleLanguageChange('ru')}
              className={`lang-button ${i18n.language === 'ru' ? 'active' : ''}`}
            >
              RU
            </Button>
          </Box>
          <Button
            component={Link}
            to="/contact"
            variant="contained"
            className="contact-button"
          >
            {t('contact').charAt(0).toUpperCase() + t('contact').slice(1).toLowerCase()}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;