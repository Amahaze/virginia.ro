import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './G.Block3.css';
import ScienceIcon from '@mui/icons-material/Science';
import SecurityIcon from '@mui/icons-material/Security';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import BoltIcon from '@mui/icons-material/Bolt';
import BuildIcon from '@mui/icons-material/Build';

const Block3: React.FC = () => {
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
    <Box className="block3-section">
      <Box className="block3-container">
        <Box className="block3-grid">
          <Box className="block3-row-1">
            <Box className="info-box" ref={(el: HTMLDivElement | null): void => { infoBoxRefs.current[0] = el; }}>
              <ScienceIcon className="info-icon" />
              <Typography variant="h6" className="info-title">
                {t('block3.container1.title')}
              </Typography>
              <Typography className="info-description">
                {t('block3.container1.description')}
              </Typography>
            </Box>
            
            <Box className="info-box" ref={(el: HTMLDivElement | null): void => { infoBoxRefs.current[1] = el; }}>
              <SecurityIcon className="info-icon" />
              <Typography variant="h6" className="info-title">
                {t('block3.container2.title')}
              </Typography>
              <Typography className="info-description">
                {t('block3.container2.description')}
              </Typography>
            </Box>
            
            <Box className="info-box" ref={(el: HTMLDivElement | null): void => { infoBoxRefs.current[2] = el; }}>
              <AirplanemodeActiveIcon className="info-icon" />
              <Typography variant="h6" className="info-title">
                {t('block3.container3.title')}
              </Typography>
              <Typography className="info-description">
                {t('block3.container3.description')}
              </Typography>
            </Box>
          </Box>

          <Box className="block3-row-2">
            <Box className="info-box" ref={(el: HTMLDivElement | null): void => { infoBoxRefs.current[3] = el; }}>
              <BoltIcon className="info-icon" />
              <Typography variant="h6" className="info-title">
                {t('block3.container4.title')}
              </Typography>
              <Typography className="info-description">
                {t('block3.container4.description')}
              </Typography>
            </Box>
            
            <Box className="info-box" ref={(el: HTMLDivElement | null): void => { infoBoxRefs.current[4] = el; }}>
              <BuildIcon className="info-icon" />
              <Typography variant="h6" className="info-title">
                {t('block3.container5.title')}
              </Typography>
              <Typography className="info-description">
                {t('block3.container5.description')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Block3;