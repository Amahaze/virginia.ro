import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import Block1 from './V.Block1';
import Block2 from './V.Block2';
import Block3 from './V.Block3';
import Block4 from './V.Block4';
import Block5 from './V.Block5';
import Block6 from '../Global/G.Block6';

const Varex: React.FC = () => {
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
    <Box className="varex-container" ref={containerRef}>
      <Block1 />
      <Block2 />
      <Block3 />
      <Block4 />
      <Block5 />
      <Block6 />
    </Box>
  );
};

export default Varex;