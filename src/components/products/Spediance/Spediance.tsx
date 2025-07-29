import React, { useEffect, useRef } from 'react';
import './Spediance.css';
import S_Block1 from './S.Block1';
import S_Block2 from './S.Block2';
import S_Block3 from './S.Block3';
import G_Block6 from '../Global/G.Block6';

const Spediance: React.FC = () => {
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

    const elements = containerRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="spediance" ref={containerRef}>
      <S_Block1 />
      <S_Block2 />
      <S_Block3 />
      <G_Block6 />
    </div>
  );
};

export default Spediance;