import { useTranslation } from 'react-i18next';
import './A.Block4.css';
import RoBrochure from '../../../assets/Produse-AIRON-Industry.pdf';
import EnBrochure from '../../../assets/AIRON-Industry-Products.pdf';

const Block4 = () => {
  const { t, i18n } = useTranslation();

  const handleDownload = () => {
    const brochure = i18n.language === 'ro' ? RoBrochure : EnBrochure;
    window.open(brochure, '_blank');
  };

  return (
    <div className="block4-container">
      <div className="block4-content">
        <h2 className="block4-title">{t('documentation.title')}</h2>
        <p className="block4-description">{t('documentation.description')}</p>
        <button className="block4-button" onClick={handleDownload}>
          {t('documentation.button')}
        </button>
      </div>
    </div>
  );
};

export default Block4;