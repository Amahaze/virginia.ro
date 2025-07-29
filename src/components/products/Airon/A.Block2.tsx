import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './A.Block2.css';
import SpeedIcon from '@mui/icons-material/Speed';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';

const Block2: React.FC = () => {
  const { t } = useTranslation();
  const infoBoxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    infoBoxRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box className="block2-section">
      <Box className="block2-container">
        <Box className="block2-grid">
          <Box className="block2-row">
            <Box className="info-box" ref={(el: HTMLDivElement | null): void => { infoBoxRefs.current[0] = el; }}>
              <Box className="info-header">
                <SpeedIcon className="info-icon.A" />
                <Typography variant="h6" className="info-title">
                  {t('airon.block2.pressure.title')}
                </Typography>
              </Box>
              <Typography className="info-description">
                {t('airon.block2.pressure.description')}
              </Typography>
            </Box>
            
            <Box className="info-box" ref={(el: HTMLDivElement | null): void => { infoBoxRefs.current[1] = el; }}>
              <Box className="info-header">
                <AccessTimeIcon className="info-icon.A" />
                <Typography variant="h6" className="info-title">
                  {t('airon.block2.continuous.title')}
                </Typography>
              </Box>
              <Typography className="info-description">
                {t('airon.block2.continuous.description')}
              </Typography>
            </Box>
          </Box>

          <Box className="block2-row">
            <Box className="info-box" ref={(el: HTMLDivElement | null): void => { infoBoxRefs.current[2] = el; }}>
              <Box className="info-header">
                <LocalShippingIcon className="info-icon.A" />
                <Typography variant="h6" className="info-title">
                  {t('airon.block2.purity.title')}
                </Typography>
              </Box>
              <Typography className="info-description">
                {t('airon.block2.purity.description')}
              </Typography>
            </Box>
            
            <Box className="info-box" ref={(el: HTMLDivElement | null): void => { infoBoxRefs.current[3] = el; }}>
              <Box className="info-header">
                <InventoryIcon className="info-icon.A" />
                <Typography variant="h6" className="info-title">
                  {t('airon.block2.options.title')}
                </Typography>
              </Box>
              <Typography className="info-description">
                {t('airon.block2.options.description')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Block2;