import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';


const ProductsHero = () => {
  const { t } = useTranslation();

  return (
    <Box className="products-hero">
      <Box className="hero-content">
        <Typography variant="h1" className="hero-title">
          {t('products.title')}
        </Typography>
        <Typography variant="subtitle1" className="hero-subtitle">
          {t('products.subtitle')}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductsHero;