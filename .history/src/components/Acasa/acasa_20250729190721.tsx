import { Box } from '@mui/material';
import Block1 from './Block1';
import Block2 from './Block2';
import Block3 from './Block3';
import './Acasa.css';

const Acasa = () => {
  return (
    <Box className="acasa-container">
      <Block1 />
      <Block2 />
      <Block3 />
    </Box>
  );
};

export default Acasa;