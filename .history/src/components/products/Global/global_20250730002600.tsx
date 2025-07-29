import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './Global.css';
import globalImage from '../../../assets/prod.global.png';
import Block2 from './G.Block2';
import Block3 from './G.Block3';
import Block4 from './G.Block4';
import Block5 from './G.Block5';
import Block6 from './G.Block6';

const Global: React.FC = () => {
  const { t } = useTranslation();

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
      { threshold: 0.2 }
    );

    const imageElement = document.querySelector('.global-hero-image');
    const textElement = document.querySelector('.global-hero-text');

    if (imageElement) observer.observe(imageElement);
    if (textElement) observer.observe(textElement);

    return () => observer.disconnect();
  }, []);

  return (
    <Box className="global-container">
      {/* Hero Section with Image, Title, and Description */}
      <Box className="global-hero-section">
        <Container className="global-hero-content">
          <img 
            src={globalImage} 
            alt="Global Gases Group" 
            className="global-hero-image"
          />
          <Box className="global-hero-text">
            <Typography variant='h2' className="global-hero-title">
              {t('product.global.hero.title')}
            </Typography>
            <Typography variant="body1" className="global-hero-description">
              {t('product.global.hero.description')}
            </Typography>
          </Box>
        </Container>
      </Box>
      
      {/* Block 2 Section */}
      <Block2 />

      {/* Block 3 Section */}
      <Block3 />

      {/* Block 4 Section */}
      <Block4 />

      {/* Block 5 Section */}
      <Block5 />

      {/* Block 6 Section */}
      <Block6 />
    </Box>
  );
};

export default Global;