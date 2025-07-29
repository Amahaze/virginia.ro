import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './S.Block3.css';
import CompressIcon from '@mui/icons-material/Compress';
import BoltIcon from '@mui/icons-material/Bolt';
import MonitorIcon from '@mui/icons-material/Monitor';

const Block3: React.FC = () => {
  const { t } = useTranslation();
  const boxRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    boxRefs.current.forEach((box) => {
      if (box) observer.observe(box);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box className="block3-section">
      <Box className="block3-container">
        <Typography variant="h2" className="block3-title">
          {t('product.spediance.block3.title')}
        </Typography>
        <Box className="block3-grid">
          <Box className="block3-row">
            <Box 
              className="info-box"
              ref={(el: HTMLDivElement | null): void => { boxRefs.current[0] = el }}
            >
              <Box className="info-title-container">
                <CompressIcon className="info-icon" />
                <Typography variant="h6" className="info-title">
                  {t('product.spediance.block3.compact.title')}
                </Typography>
              </Box>
              <Typography className="info-description">
                {t('product.spediance.block3.compact.description')}
              </Typography>
            </Box>
            
            <Box 
              className="info-box"
              ref={(el: HTMLDivElement | null): void => { boxRefs.current[1] = el }}
            >
              <Box className="info-title-container">
                <BoltIcon className="info-icon" />
                <Typography variant="h6" className="info-title">
                  {t('product.spediance.block3.efficiency.title')}
                </Typography>
              </Box>
              <Typography className="info-description">
                {t('product.spediance.block3.efficiency.description')}
              </Typography>
            </Box>
            
            <Box 
              className="info-box"
              ref={(el: HTMLDivElement | null): void => { boxRefs.current[2] = el }}
            >
              <Box className="info-title-container">
                <MonitorIcon className="info-icon" />
                <Typography variant="h6" className="info-title">
                  {t('product.spediance.block3.control.title')}
                </Typography>
              </Box>
              <Typography className="info-description">
                {t('product.spediance.block3.control.description')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Block3;