import { useTranslation } from 'react-i18next';
import './V.Block5.css';

const Block5 = () => {
  const { t } = useTranslation();

  return (
    <div className="v-block5-container">
      <div className="v-block5-content animate-on-scroll">
        <h2 className="v-block5-title fade-left">{t('product.varex.block5.title')}</h2>
        <p className="v-block5-description fade-right">{t('product.varex.block5.description')}</p>
        <button className="v-block5-button fade-right" onClick={() => console.log('Download brochure')}>
          {t('product.varex.block5.button')}
        </button>
      </div>
    </div>
  );
};

export default Block5;