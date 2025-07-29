import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './G.Block1.css';
import productImage from '../../../assets/prod.global.png';

const Block1: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box className="g-block1-section">
      <Box className="g-block1-container">
        <Box className="g-block1-content">
          <Box className="g-block1-text">
            <Typography variant="h1" className="g-block1-title">
              {t('product.global.block1.title')}
            </Typography>
            <Typography variant="body1" className="g-block1-description">
              {t('product.global.block1.description')}
            </Typography>
          </Box>
          <Box className="g-block1-image-container">
            <img src={productImage} alt="Global Product" className="g-block1-image" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Block1;