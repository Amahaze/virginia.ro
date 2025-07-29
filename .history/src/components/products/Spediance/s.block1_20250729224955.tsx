import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './S.Block1.css';
import spedianceImage from '../../../assets/spediance-train.png';

const Block1: React.FC = () => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box className="spediance-block1-container">
      <Box className="spediance-block1-hero-section">
        <Container 
          className="spediance-block1-hero-content" 
          ref={contentRef}
        >
          <img 
            src={spedianceImage} 
            alt={t('product.spediance.block1.title')} 
            className="spediance-block1-hero-image fade-left"
          />
          <Typography variant='h2' className="spediance-block1-hero-title fade-right">
            {t('product.spediance.block1.title')}
          </Typography>
          <Typography variant="body1" className="spediance-block1-hero-description fade-right">
            {t('product.spediance.block1.description')}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Block1;