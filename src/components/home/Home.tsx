import { SyntheticEvent, useState } from 'react';
import { Box, Card, Tab, Stack } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Lanking from './Lanking';
import Mission from './Mission';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { User } from '../../../types/user';

type Props = {
  user: User;
  users: User[];
};

const Home = (props: Props) => {
  const [value, setValue] = useState('1');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card component={Stack} alignItems='center' sx={{ p: '10px', m: 'auto' }}>
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <TabList onChange={handleChange} centered>
              <Tab
                icon={<EmojiEventsOutlinedIcon />}
                label='ランキング'
                value='1'
              />
              <Tab icon={<FlagOutlinedIcon />} label='ミッション' value='2' />
            </TabList>
          </Box>
          <Box>
            <TabPanel value='1'>
              <Lanking users={props.users} />
            </TabPanel>
            <TabPanel value='2'>
              <Mission user={props.user} />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Card>
  );
};

export default Home;
