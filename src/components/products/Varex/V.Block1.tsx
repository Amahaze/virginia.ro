import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './V.Block1.css';
import varexImage from '../../../assets/varex-ray.png';

const Block1: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box className="varex-block1-container">
      <Box className="varex-block1-hero-section">
        <Container className="varex-block1-hero-content animate-on-scroll">
          <img 
            src={varexImage} 
            alt={t('product.varex.title')} 
            className="varex-block1-hero-image fade-left"
          />
          <Typography variant='h2' className="varex-block1-hero-title fade-right">
            {t('product.varex.title')}
          </Typography>
          <Typography variant="body1" className="varex-block1-hero-description fade-right" style={{ whiteSpace: 'pre-line' }}>
            {t('product.varex.subtitle')}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Block1;