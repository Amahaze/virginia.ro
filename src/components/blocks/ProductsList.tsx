import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './ProductsList.css';
import globalImage from '../../../assets/global.c.png';
import heliuImage from '../../../assets/heliu.png';
import xrayImage from '../../../assets/x-ray.tube.png';
import fitnessImage from '../../../assets/fitnes.png';

const ProductsList = () => {
  const { t } = useTranslation();

  return (
    <Box className="products-list">
      <Box className="product-container oxygen-product">
        <Box className="product-content">
          <Typography variant="h3" className="product-title">
            {t('products.oxygen.title')}
          </Typography>
          <Typography className="product-description">
            {t('products.oxygen.description')}
          </Typography>
          <Button variant="outlined" className="details-button">
            {t('products.details')}
          </Button>
        </Box>
        <Box className="product-image-container">
          <img src={globalImage} alt={t('products.oxygen.title')} className="product-image" />
        </Box>
      </Box>
      <Box className="product-container helium-product">
        <Box className="product-content">
          <Typography variant="h3" className="product-title">
            {t('products.heliu.title')}
          </Typography>
          <Typography className="product-description">
            {t('products.heliu.description')}
          </Typography>
          <Button variant="outlined" className="details-button">
            {t('products.details')}
          </Button>
        </Box>
        <Box className="product-image-container">
          <img src={heliuImage} alt={t('products.heliu.title')} className="product-image" />
        </Box>
      </Box>
      <Box className="product-container xray-product">
        <Box className="product-content">
          <Typography variant="h3" className="product-title">
            {t('products.xray.title')}
          </Typography>
          <Typography className="product-description">
            {t('products.xray.description')}
          </Typography>
          <Button variant="outlined" className="details-button">
            {t('products.details')}
          </Button>
        </Box>
        <Box className="product-image-container">
          <img src={xrayImage} alt={t('products.xray.title')} className="product-image" />
        </Box>
      </Box>
      <Box className="product-container fitness-product">
        <Box className="product-content">
          <Typography variant="h3" className="product-title">
            {t('products.fitness.title')}
          </Typography>
          <Typography className="product-description">
            {t('products.fitness.description')}
          </Typography>
          <Button variant="outlined" className="details-button">
            {t('products.details')}
          </Button>
        </Box>
        <Box className="product-image-container">
          <img src={fitnessImage} alt={t('products.fitness.title')} className="product-image" />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsList;