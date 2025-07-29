import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './V.Block4.css';

const Block4: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box className="v-block4-container">
      <Box className="v-block4-grid">
        <Box className="v-block4-item animate-on-scroll">
          <Box className="v-block4-line" />
          <Typography variant="h3" className="v-block4-title">
            {t('product.varex.block4.digital.title')}
          </Typography>
          <Typography className="v-block4-description">
            {t('product.varex.block4.digital.description')}
          </Typography>
        </Box>

        <Box className="v-block4-item animate-on-scroll">
          <Box className="v-block4-line" />
          <Typography variant="h3" className="v-block4-title">
            {t('product.varex.block4.energy.title')}
          </Typography>
          <Typography className="v-block4-description">
            {t('product.varex.block4.energy.description')}
          </Typography>
        </Box>

        <Box className="v-block4-item animate-on-scroll">
          <Box className="v-block4-line" />
          <Typography variant="h3" className="v-block4-title">
            {t('product.varex.block4.oem.title')}
          </Typography>
          <Typography className="v-block4-description">
            {t('product.varex.block4.oem.description')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Block4;