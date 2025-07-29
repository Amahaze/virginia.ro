import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './A.Block1.css';
import oxygenImage from '../../../assets/oxygen.hely.png';

const Block1: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box className="airon-block1-container">
      <Box className="airon-block1-hero-section">
        <Container className="airon-block1-hero-content">
          <img 
            src={oxygenImage} 
            alt={t('product.airon.title')} 
            className="airon-block1-hero-image"
          />
          <Typography variant='h2' className="airon-block1-hero-title">
            {t('product.airon.title')}
          </Typography>
          <Typography variant="body1" className="airon-block1-hero-description">
            {t('product.airon.subtitle')}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Block1;