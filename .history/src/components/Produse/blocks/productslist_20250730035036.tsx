import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useCallback } from 'react';

import globalImage from '../../../assets/global.c.png';
import heliuImage from '../../../assets/heliu.png';
import xrayImage from '../../../assets/x-ray.tube.png';
import fitnessImage from '../../../assets/fitnes.png';

const ProductsList = () => {
  const { t } = useTranslation();
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setProductRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    productRefs.current[index] = el;
  }, []);

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
      { threshold: 0.1 }
    );

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box className="products-list">
      <Box 
        className="product-container oxygen-product"
        ref={setProductRef(0)}>
        <Box className="product-content">
          <Typography variant="h3" className="product-title">
            {t('products.oxygen.title')}
          </Typography>
          <Typography className="product-description">
            {t('products.oxygen.description')}
          </Typography>
          <Button 
            variant="outlined" 
            className="details-button" 
            component={Link} 
            to="/products/global"
          >
            {t('products.details')}
          </Button>
        </Box>
        <Box className="product-image-container">
          <img src={globalImage} alt={t('products.oxygen.title')} className="product-image" />
        </Box>
      </Box>
      <Box 
        className="product-container helium-product"
        ref={setProductRef(1)}>
        <Box className="product-image-container">
          <img src={heliuImage} alt={t('products.heliu.title')} className="product-image" />
        </Box>
        <Box className="product-content">
          <Typography variant="h3" className="product-title">
            {t('products.heliu.title')}
          </Typography>
          <Typography className="product-description">
            {t('products.heliu.description')}
          </Typography>
          <Button 
            variant="outlined" 
            className="details-button" 
            component={Link} 
            to="/products/airon"
          >
            {t('products.details')}
          </Button>
        </Box>
      </Box>
      <Box 
        className="product-container xray-product"
        ref={setProductRef(2)}>
        <Box className="product-content">
          <Typography variant="h3" className="product-title">
            {t('products.xray.title')}
          </Typography>
          <Typography className="product-description">
            {t('products.xray.description')}
          </Typography>
          <Button 
            variant="outlined" 
            className="details-button" 
            component={Link} 
            to="/products/varex"
          >
            {t('products.details')}
          </Button>
        </Box>
        <Box className="product-image-container">
          <img src={xrayImage} alt={t('products.xray.title')} className="product-image" />
        </Box>
      </Box>
      <Box 
        className="product-container fitness-product"
        ref={setProductRef(3)}>
        <Box className="product-image-container">
          <img src={fitnessImage} alt={t('products.fitness.title')} className="product-image" />
        </Box>
        <Box className="product-content">
          <Typography variant="h3" className="product-title">
            {t('products.fitness.title')}
          </Typography>
          <Typography className="product-description">
            {t('products.fitness.description')}
          </Typography>
          <Button 
            variant="outlined" 
            className="details-button" 
            component={Link} 
            to="/products/spediance"
          >
            {t('products.details')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsList;