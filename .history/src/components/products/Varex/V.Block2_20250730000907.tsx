import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './V.Block2.css';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DevicesIcon from '@mui/icons-material/Devices';
import SettingsIcon from '@mui/icons-material/Settings';

const Block2: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = containerRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Box className="block2-section" ref={containerRef}>
      <Box className="block2-container">
        <Box className="block2-grid">
          <Box className="block2-row">
            <Box className="info-box animate-on-scroll">
              <Box className="info-header">
                <RadioButtonCheckedIcon className="info-icon.V" />
                <Typography variant="h6" className="info-title">
                  {t('product.varex.block2.radiation.title')}
                </Typography>
              </Box>
              <Typography className="info-description">
                {t('product.varex.block2.radiation.description')}
              </Typography>
            </Box>
            
            <Box className="info-box animate-on-scroll">
              <Box className="info-header">
                <AccessTimeIcon className="info-icon.V" />
                <Typography variant="h6" className="info-title">
                  {t('product.varex.block2.reliability.title')}
                </Typography>
              </Box>
              <Typography className="info-description">
                {t('product.varex.block2.reliability.description')}
              </Typography>
            </Box>
          </Box>

          <Box className="block2-row">
            <Box className="info-box animate-on-scroll">
              <Box className="info-header">
                <SettingsIcon className="info-icon.V" />
                <Typography variant="h6" className="info-title">
                  {t('product.varex.block2.integration.title')}
                </Typography>
              </Box>
              <Typography className="info-description">
                {t('product.varex.block2.integration.description')}
              </Typography>
            </Box>
            
            <Box className="info-box animate-on-scroll">
              <Box className="info-header">
                <DevicesIcon className="info-icon.V" />
                <Typography variant="h6" className="info-title">
                  {t('product.varex.block2.compatibility.title')}
                </Typography>
              </Box>
              <Typography className="info-description">
                {t('product.varex.block2.compatibility.description')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Block2;