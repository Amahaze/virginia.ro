import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './V.Block3.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PetsIcon from '@mui/icons-material/Pets';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import BusinessIcon from '@mui/icons-material/Business';

const Block3: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box className="v-block3-section">
      <Typography variant="h4" className="v-block3-title animate-on-scroll">
        {t('product.varex.block3.title')}
      </Typography>
      <Box className="v-block3-container">
        <Box className="v-block3-grid">
          <Box className="v-block3-item animate-on-scroll">
            <FavoriteIcon className="v-block3-icon" />
            <Typography variant="h6" className="v-block3-item-title">
              {t('product.varex.block3.health')}
            </Typography>
          </Box>
          <Box className="v-block3-item animate-on-scroll">
            <PetsIcon className="v-block3-icon" />
            <Typography variant="h6" className="v-block3-item-title">
              {t('product.varex.block3.veterinary')}
            </Typography>
          </Box>
          <Box className="v-block3-item animate-on-scroll">
            <LocalAirportIcon className="v-block3-icon" />
            <Typography variant="h6" className="v-block3-item-title">
              {t('product.varex.block3.airport')}
            </Typography>
          </Box>
          <Box className="v-block3-item animate-on-scroll">
            <BusinessIcon className="v-block3-icon" />
            <Typography variant="h6" className="v-block3-item-title">
              {t('product.varex.block3.industrial')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Block3;