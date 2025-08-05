import { useTranslation } from 'react-i18next';
import './G.Block5.css';
import RoBrochure from '../../../assets/Brosura-GLOBAL-GASES-GROUP.pdf';
import EnBrochure from '../../../assets/GLOBAL-GASES-GROUP Brochure.pdf';

const Block5 = () => {
  const { t, i18n } = useTranslation();

  const handleDownload = () => {
    const brochure = i18n.language === 'ro' ? RoBrochure : EnBrochure;
    window.open(brochure, '_blank');
  };

  return (
    <div className="block5-container">
      <div className="block5-content">
        <h2 className="block5-title">{t('product.global.block5.title')}</h2>
        <p className="block5-description">{t('product.global.block5.description')}</p>
        <button className="block5-button" onClick={handleDownload}>
          {t('product.global.block5.button')}
        </button>
      </div>
    </div>
  );
};

export default Block5;