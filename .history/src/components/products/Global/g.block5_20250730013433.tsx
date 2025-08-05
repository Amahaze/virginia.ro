import { useTranslation } from 'react-i18next';
import './G.Block5.css';

const Block5 = () => {
  const { t } = useTranslation();

  return (
    <div className="block5-container">
      <div className="block5-content">
        <h2 className="block5-title">{t('product.global.block5.title')}</h2>
        <p className="block5-description">{t('product.global.block5.description')}</p>
        <button className="block5-button" onClick={() => console.log('Download brochure')}>
          {t('product.global.block5.button')}
        </button>
      </div>
    </div>
  );
};

export default Block5;