import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './G.Block4.css';

const Block4: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box className="block4-container">
      <Box className="block4-grid">
        <Box className="block4-item">
          <Box className="block4-line" />
          <Typography variant="h3" className="block4-title">
            {t('product.global.block4.flexibility.title')}
          </Typography>
          <Typography className="block4-description">
            {t('product.global.block4.flexibility.description')}
          </Typography>
        </Box>

        <Box className="block4-item">
          <Box className="block4-line" />
          <Typography variant="h3" className="block4-title">
            {t('product.global.block4.safety.title')}
          </Typography>
          <Typography className="block4-description">
            {t('product.global.block4.safety.description')}
          </Typography>
        </Box>

        <Box className="block4-item">
          <Box className="block4-line" />
          <Typography variant="h3" className="block4-title">
            {t('product.global.block4.services.title')}
          </Typography>
          <Typography className="block4-description">
            {t('product.global.block4.services.description')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Block4;