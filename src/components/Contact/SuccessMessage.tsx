import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './SuccessMessage.css';

const SuccessMessage = () => {
  const { t } = useTranslation();

  return (
    <Box className="success-message-container">
      <Box className="success-message-content">
        <Typography variant="h1" className="success-title">
          {t('contact.success.title')}
        </Typography>
        <Typography variant="body1" className="success-subtitle">
          {t('contact.success.subtitle')}
        </Typography>
      </Box>
    </Box>
  );
};

export default SuccessMessage;