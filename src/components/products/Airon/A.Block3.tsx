import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './A.Block3.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LanguageIcon from '@mui/icons-material/Language';
import VerifiedIcon from '@mui/icons-material/Verified';
import BoltIcon from '@mui/icons-material/Bolt';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

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
        <Typography variant="h2" className="block3-title">
          {t('airon.block3.title')}
        </Typography>
        <Box className="block3-grid">
          <Box className="block3-row-1">
            <Box className="info-box" ref={(el: HTMLDivElement | null): void => { infoBoxRefs.current[0] = el; }}>
              <PlayCircleOutlineIcon className="info-icon" />
              <Typography variant="h6" className="info-title">
                {t('airon.block3.plug_play.title')}
              </Typography>
            </Box>
            
            <Box className="info-box" ref={(el: HTMLDivElement | null): void => { infoBoxRefs.current[1] = el; }}>
              <LanguageIcon className="info-icon" />
              <Typography variant="h6" className="info-title">
                {t('airon.block3.extreme_environments.title')}
              </Typography>
            </Box>
            
            <Box className="info-box" ref={(el: HTMLDivElement | null): void => { infoBoxRefs.current[2] = el; }}>
              <VerifiedIcon className="info-icon" />
              <Typography variant="h6" className="info-title">
                {t('airon.block3.oxygen_purity.title')}
              </Typography>
            </Box>
          </Box>

          <Box className="block3-row-2">
            <Box className="info-box" ref={(el: HTMLDivElement | null): void => { infoBoxRefs.current[3] = el; }}>
              <BoltIcon className="info-icon" />
              <Typography variant="h6" className="info-title">
                {t('airon.block3.energy_efficiency.title')}
              </Typography>
            </Box>
            
            <Box className="info-box" ref={(el: HTMLDivElement | null): void => { infoBoxRefs.current[4] = el; }}>
              <SettingsSuggestIcon className="info-icon" />
              <Typography variant="h6" className="info-title">
                {t('airon.block3.modular_systems.title')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Block3;