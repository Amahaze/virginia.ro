import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './Block2.css';

const Block2 = () => {
  const { t } = useTranslation();
  return (
    <Box className="block2-container">
      <h2 className="block2-title">{t('block2.title')}</h2>
      <div className="sponsor-carousel">
        <div className="sponsor-track">
          {[1, 2, 3, 4].map((set) => (
            <div key={`sponsor-set-${set}`} style={{ display: 'inline-flex' }}>
              <img src="/images/airon.png" alt="Airon sponsor" className="sponsor-image" />
              <img src="/images/global.png" alt="Global sponsor" className="sponsor-image" />
              <img src="/images/sppeed.png" alt="Speed sponsor" className="sponsor-image" />
              <img src="/images/varex.png" alt="Varex sponsor" className="sponsor-image" />
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default Block2;