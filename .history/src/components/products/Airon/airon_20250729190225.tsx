import React from 'react';
import { Box } from '@mui/material';
import './Airon.css';
import Block1 from './A.Block1';
import Block2 from './A.Block2';
import Block3 from './A.Block3';
import Block4 from './A.Block4';
import Block6 from '../Global/G.Block6';

const Airon: React.FC = () => {
  return (
    <Box className="airon-container">
      <Block1 />
      <Block2 />
      <Block3 />
      <Block4 />
      <Block6 />
    </Box>
  );
};

export default Airon;