import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './S.Block2.css';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessIcon from '@mui/icons-material/Business';
import ElderlyIcon from '@mui/icons-material/Elderly';

const Block2: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box className="s-block2-section">
      <Box className="s-block2-container">
        <Box className="s-block2-grid">
          <Box className="s-block2-row">
            <Box className="s-block2-info-box animate-on-scroll">
              <Box className="s-block2-info-header">
                <HomeIcon className="s-block2-info-icon" />
                <Typography variant="h6" className="s-block2-info-title">
                  {t('product.spediance.block2.residential.title')}
                </Typography>
              </Box>
              <Typography className="s-block2-info-description" sx={{ textAlign: 'left' }}>
                {t('product.spediance.block2.residential.description')}
              </Typography>
            </Box>
            
            <Box className="s-block2-info-box animate-on-scroll">
              <Box className="s-block2-info-header">
                <ApartmentIcon className="s-block2-info-icon" />
                <Typography variant="h6" className="s-block2-info-title">
                  {t('product.spediance.block2.apartments.title')}
                </Typography>
              </Box>
              <Typography className="s-block2-info-description" sx={{ textAlign: 'left' }}>
                {t('product.spediance.block2.apartments.description')}
              </Typography>
            </Box>
          </Box>

          <Box className="s-block2-row">
            <Box className="s-block2-info-box animate-on-scroll">
              <Box className="s-block2-info-header">
                <BusinessIcon className="s-block2-info-icon" />
                <Typography variant="h6" className="s-block2-info-title">
                  {t('product.spediance.block2.mixed.title')}
                </Typography>
              </Box>
              <Typography className="s-block2-info-description" sx={{ textAlign: 'left' }}>
                {t('product.spediance.block2.mixed.description')}
              </Typography>
            </Box>
            
            <Box className="s-block2-info-box animate-on-scroll">
              <Box className="s-block2-info-header">
                <ElderlyIcon className="s-block2-info-icon" />
                <Typography variant="h6" className="s-block2-info-title">
                  {t('product.spediance.block2.senior.title')}
                </Typography>
              </Box>
              <Typography className="s-block2-info-description" sx={{ textAlign: 'left' }}>
                {t('product.spediance.block2.senior.description')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Block2;