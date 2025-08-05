import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import './V.Block5.css';
import RoBrochure from '../../../assets/Brosura-VAREX-IMAGING.pdf';
import EnBrochure from '../../../assets/VAREX-IMAGING-brochure.pdf';

const Block5 = () => {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );

    const container = containerRef.current;
    if (container) {
      const animatedElements = container.querySelectorAll('.animate-on-scroll, .fade-left, .fade-right');
      animatedElements.forEach((element) => observer.observe(element));
    }

    return () => observer.disconnect();
  }, []);

  const handleDownload = () => {
    const brochure = i18n.language === 'ro' ? RoBrochure : EnBrochure;
    window.open(brochure, '_blank');
  };

  return (
    <div className="v-block5-container" ref={containerRef}>
      <div className="v-block5-content animate-on-scroll">
        <h2 className="v-block5-title fade-left">{t('product.varex.block5.title')}</h2>
        <p className="v-block5-description fade-right">{t('product.varex.block5.description')}</p>
        <button className="v-block5-button fade-right" onClick={handleDownload}>
          {t('product.varex.block5.button')}
        </button>
      </div>
    </div>
  );
};

export default Block5;