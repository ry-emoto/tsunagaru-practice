import { NextPage } from 'next';
import { Typography } from '@mui/material';
import CommonMenu from '../components/common/CommonMenu';
import Home from '../components/home/Home';

const index: NextPage = () => {
  return (
    <CommonMenu>
      <Typography sx={{ mb: '10px' }}>ホーム</Typography>
      <Home />
    </CommonMenu>
  );
};

export default index;
