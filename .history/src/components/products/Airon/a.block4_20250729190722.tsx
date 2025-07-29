import { useTranslation } from 'react-i18next';
import './A.Block4.css';

const Block4 = () => {
  const { t } = useTranslation();

  return (
    <div className="block4-container">
      <div className="block4-content">
        <h2 className="block4-title">{t('documentation.title')}</h2>
        <p className="block4-description">{t('documentation.description')}</p>
        <button className="block4-button" onClick={() => console.log('Download brochure')}>
          {t('documentation.button')}
        </button>
      </div>
    </div>
  );
};

export default Block4;