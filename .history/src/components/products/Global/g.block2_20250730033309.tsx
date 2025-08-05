import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './G.Block2.css';
import truckImage from '../../../assets/global.truck.png';
import cisternImage from '../../../assets/glboal.cisterna.png';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const Block2: React.FC = () => {
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

    const textElements = document.querySelectorAll('.info-items');
    const imageElements = document.querySelectorAll('.block2-images');

    textElements.forEach(element => observer.observe(element));
    imageElements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <Box className="block2-section">
      <Box className="block2-container">
        <Box className="g-block2-content" sx={{ display: 'flex', justifyContent: 'flex-start', gap: '2rem' }}>
          <Box className="info-items">
            <Box className="info-item">
              <AcUnitIcon className="info-icon" />
              <Box className="info-text">
                <Typography variant="h6" className="info-title">
                  {t('product.global.block2.support.title')}
                </Typography>
                <Typography className="info-description">
                  {t('product.global.block2.support.description')}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="block2-images">
            <Box className="image-text-pair">
              <Box className="image-container">
                <img src={truckImage} alt="Delivery Truck" className="block2-image" />
              </Box>
              <Box className="info-item">
                <LocalShippingIcon className="info-icon" />
                <Box className="info-text">
                  <Typography variant="h6" className="info-title">
                    {t('product.global.block2.delivery.title')}
                  </Typography>
                  <Typography className="info-description">
                    {t('product.global.block2.delivery.description')}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="image-text-pair">
              <Box className="image-container">
                <img src={cisternImage} alt="Storage Cistern" className="block2-image" />
              </Box>
              <Box className="info-item">
                <InventoryIcon className="info-icon" />
                <Box className="info-text">
                  <Typography variant="h6" className="info-title">
                    {t('product.global.block2.inventory.title')}
                  </Typography>
                  <Typography className="info-description">
                    {t('product.global.block2.inventory.description')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Block2;