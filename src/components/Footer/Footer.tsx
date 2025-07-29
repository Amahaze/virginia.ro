import { Box, Container, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';
import Logo from '../../assets/Logo.png';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box component="footer" className="footer">
      <Container>
        <Box className="footer-content">
          <Box className="footer-left">
            <Box className="logo-container">
              <img src={Logo} alt="Verginia Logo" className="footer-logo" />
              <Typography variant="h6" className="footer-brand">Verginia</Typography>
            </Box>
          </Box>
          <Box className="footer-center">
            <nav className="footer-nav">
              <Link to="/" className="footer-link">{t('home')}</Link>
              <Link to="/products" className="footer-link">{t('products')}</Link>
              <Link to="/news" className="footer-link">{t('news')}</Link>
              <Link to="/contact" className="footer-link">{t('contact')}</Link>
            </nav>
          </Box>
          <Box className="footer-right">
            <Box className="social-links">
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="currentColor"/>
                </svg>
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon linkedin"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3ZM9 17H6.477V9H9V17ZM7.694 8.056C6.923 8.056 6.408 7.523 6.408 6.863C6.408 6.187 6.941 5.671 7.73 5.671C8.501 5.671 9.016 6.187 9.016 6.863C9.016 7.523 8.501 8.056 7.694 8.056ZM18 17H15.558V12.718C15.558 11.632 15.167 10.912 14.233 10.912C13.505 10.912 13.063 11.398 12.868 11.867C12.798 12.031 12.781 12.256 12.781 12.482V17H10.339V9H12.781V10.081C13.154 9.526 13.748 8.732 15.149 8.732C16.909 8.732 18 9.881 18 12.436V17Z" fill="currentColor"/>
                </svg>
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon twitter"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
                </svg>
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Typography className="copyright">
          © {new Date().getFullYear()} Verginia. {t('rights')}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;