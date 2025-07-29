import { useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './Block3.css';
import laborantImage from '../../assets/laborant.png';
import peopleImage from '../../assets/people-home.png';
import floareImage from '../../assets/flaore.png';

const Block3 = () => {
  const { t } = useTranslation();
  const descriptionRef = useRef<HTMLDivElement>(null);
  const advantagesImageRef = useRef<HTMLDivElement>(null);
  const advantageItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contactTextRef = useRef<HTMLDivElement>(null);
  const contactImageRef = useRef<HTMLDivElement>(null);

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

    if (descriptionRef.current) {
      observer.observe(descriptionRef.current);
    }

    if (advantagesImageRef.current) {
      observer.observe(advantagesImageRef.current);
    }

    advantageItemRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    if (contactTextRef.current) {
      observer.observe(contactTextRef.current);
    }

    if (contactImageRef.current) {
      observer.observe(contactImageRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <Box className="block3-container">
      <Box className="about-section" id="about">
        <Typography variant="h2" className="block3-title">
          {t('block3.title')}
        </Typography>
        <Typography
          className="block3-description"
          ref={descriptionRef}
        >
          {t('block3.description')}
        </Typography>
        <Box className="block3-image-container">
          <img src={peopleImage} alt="Team" className="block3-image" />
        </Box>
      </Box>

      <Box className="advantages-section">
        <Box className="advantages-content">
          <Box className="advantages-left">
            <Typography variant="h3" className="advantages-title">
              {t('block3.advantages')}
            </Typography>
            <Box className="advantages-image-container" ref={advantagesImageRef}>
              <img src={laborantImage} alt="Laboratory Technician" className="advantages-image" />
            </Box>
          </Box>
          <Box className="advantages-list">
            <Box className="advantage-item" ref={(el: HTMLDivElement | null) => {
              if (el) advantageItemRefs.current[0] = el;
            }}>
              <div className="advantage-dot" />
              <Box className="advantage-content">
                <Typography variant="h4" className="advantage-item-title">
                  {t('block3.advantage1.title')}
                </Typography>
                <Typography className="advantage-item-description">
                  {t('block3.advantage1.description')}
                </Typography>
              </Box>
            </Box>
            <Box className="advantage-item" ref={(el: HTMLDivElement | null) => {
              if (el) advantageItemRefs.current[1] = el;
            }}>
              <div className="advantage-dot" />
              <Box className="advantage-content">
                <Typography variant="h4" className="advantage-item-title">
                  {t('block3.advantage2.title')}
                </Typography>
                <Typography className="advantage-item-description">
                  {t('block3.advantage2.description')}
                </Typography>
              </Box>
            </Box>
            <Box className="advantage-item" ref={(el: HTMLDivElement | null) => {
              if (el) advantageItemRefs.current[2] = el;
            }}>
              <div className="advantage-dot" />
              <Box className="advantage-content">
                <Typography variant="h4" className="advantage-item-title">
                  {t('block3.advantage3.title')}
                </Typography>
                <Typography className="advantage-item-description">
                  {t('block3.advantage3.description')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="contact-section">
        <Box className="contact-content">
          <Box className="contact-text" ref={contactTextRef}>
            <Typography variant="h2" className="contact-title">
              {t('block3.contact.title')}
            </Typography>
            <Typography className="contact-subtitle">
              {t('block3.contact.subtitle')}
            </Typography>
            <Button variant="contained" className="contact-button">
              {t('block3.contact.button')}
            </Button>
          </Box>
          <Box className="contact-image-container" ref={contactImageRef}>
            <img src={floareImage} alt="Decorative Flower" className="contact-image" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Block3;