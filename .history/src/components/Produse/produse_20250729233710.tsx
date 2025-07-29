import { Box } from '@mui/material';
import ProductsHero from './blocks/ProductsHero';
import ProductsList from './blocks/ProductsList';
import '../../styles/Products.css';

const Produse = () => {
  return (
    <Box className="produse-container">
      <ProductsHero />
      <ProductsList />
    </Box>
  );
};

export default Produse;