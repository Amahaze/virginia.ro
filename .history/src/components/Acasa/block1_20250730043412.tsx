import { useTranslation } from 'react-i18next';
import { Box, Typography, Button } from '@mui/material';
import './Block1.css';

const Block1 = () => {
  const { t } = useTranslation();

  return (
    <Box className="block1-container" sx={{ backgroundColor: '#000' }}>
      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/assets/DNK.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Box className="block1-content">
        <Typography variant="h1" className="block1-title">
          {t('hero.title', 'Soluții profesionale pentru medicină și industrie')}
        </Typography>
        <Typography variant="subtitle1" className="block1-subtitle">
          {t('hero.subtitle', 'Echipamente certificate și parteneriate solide pentru performanță și siguranță în fiecare proiect.')}
        </Typography>
        <Box className="block1-buttons">
          <Button variant="contained" className="block1-button about-button" href="#despre">
            {t('about')}
          </Button>
          <Button variant="outlined" className="block1-button block1-contact-button" href="/contact">
            {t('contact')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Block1;