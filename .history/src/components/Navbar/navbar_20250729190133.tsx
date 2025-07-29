import { useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="transparent" elevation={0}>
      <Toolbar className="toolbar">
        <Box className="logo">
          <picture>
            <source media="(max-width: 600px)" srcSet="/src/assets/Logo-1.png" />
            <source media="(min-width: 601px) and (max-width: 960px)" srcSet="/src/assets/Logo-2.png" />
            <source media="(min-width: 961px)" srcSet="/src/assets/Logo.png" />
            <img src="/src/assets/Logo.png" alt="Verginia" />
          </picture>
          <span>Verginia</span>
        </Box>
        
        <Box className="nav-links">
          <Button
              component={Link}
              to="/"
              disableRipple
              disableElevation
              variant="text"
              sx={{
                textTransform: 'none',
                '&.MuiButton-root': {
                  padding: '0.25rem 0',
                }
              }}
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
              sx={{
                textTransform: 'none',
                '&.MuiButton-root': {
                  padding: '0.25rem 0',
                }
              }}
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
              sx={{
                textTransform: 'none',
                '&.MuiButton-root': {
                  padding: '0.25rem 0',
                }
              }}
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
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {t('contact').charAt(0).toUpperCase() + t('contact').slice(1).toLowerCase()}
          </Button>
          <IconButton
            className="mobile-menu-button"
            onClick={handleMobileMenu}
            sx={{ display: { sm: 'none' } }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </IconButton>
          <Menu
            anchorEl={mobileMenuAnchorEl}
            open={Boolean(mobileMenuAnchorEl)}
            onClose={() => setMobileMenuAnchorEl(null)}
            sx={{
              display: { sm: 'none' },
              '& .MuiPaper-root': {
                width: '100%',
                maxWidth: '400px',
                borderRadius: '16px',
                mt: 1.5,
                backgroundColor: 'white'
              }
            }}
          >
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={() => setMobileMenuAnchorEl(null)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </IconButton>
                <Box className="mobile-logo" sx={{ width: '24px', height: '24px' }}>
                  <img src="/src/assets/Logo-1.png" alt="Verginia Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </Box>
              </Box>
              <MenuItem 
                component={Link}
                to="/"
                onClick={() => setMobileMenuAnchorEl(null)} 
                disableRipple
                sx={{ textTransform: 'none' }}
                className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                {t('home').charAt(0).toUpperCase() + t('home').slice(1).toLowerCase()}
              </MenuItem>
              <MenuItem 
                component={Link}
                to="/products"
                onClick={() => setMobileMenuAnchorEl(null)} 
                disableRipple
                sx={{ textTransform: 'none' }}
                className={`mobile-nav-link ${location.pathname === '/products' ? 'active' : ''}`}
              >
                {t('products').charAt(0).toUpperCase() + t('products').slice(1).toLowerCase()}
              </MenuItem>
              <MenuItem 
                component={Link}
                to="/news"
                onClick={() => setMobileMenuAnchorEl(null)} 
                disableRipple
                sx={{ textTransform: 'none' }}
                className={`mobile-nav-link ${location.pathname === '/news' ? 'active' : ''}`}
              >
                {t('news').charAt(0).toUpperCase() + t('news').slice(1).toLowerCase()}
              </MenuItem>
              <MenuItem 
                component={Link}
                to="/contact"
                onClick={() => setMobileMenuAnchorEl(null)} 
                disableRipple
                sx={{ textTransform: 'none' }}
                className={`mobile-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              >
                {t('contact').charAt(0).toUpperCase() + t('contact').slice(1).toLowerCase()}
              </MenuItem>
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;