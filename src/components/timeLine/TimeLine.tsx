import { SyntheticEvent, useState } from 'react';
import { Box, Card, Tab, Stack } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import TimeLinePostWrap from './TimeLinePostWrap';
import useGetPost from '../../hooks/useGetPost';

const TimeLine = () => {
  const [value, setValue] = useState('1');
  const { posts: allPosts, postsLoading, postsError } = useGetPost('/api/post');
  const sharePosts = allPosts?.filter((post: any) => post.type === '共有');
  const qaPosts = allPosts?.filter((post: any) => post.type === 'Q&A');
  const suggestionPosts = allPosts?.filter((post: any) => post.type === '提案');

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
              <Tab label={`All(${allPosts?.length})`} value='1' />
              <Tab label={`共有(${sharePosts?.length})`} value='2' />
              <Tab label={`Q&A(${qaPosts?.length})`} value='3' />
              <Tab label={`提案(${suggestionPosts?.length})`} value='4' />
            </TabList>
          </Box>
          <Box>
            <TabPanel value='1'>
              {
                <TimeLinePostWrap
                  posts={allPosts}
                  loading={postsLoading}
                  error={postsError}
                />
              }
            </TabPanel>
            <TabPanel value='2'>
              {
                <TimeLinePostWrap
                  posts={sharePosts}
                  loading={postsLoading}
                  error={postsError}
                />
              }
            </TabPanel>
            <TabPanel value='3'>
              {
                <TimeLinePostWrap
                  posts={qaPosts}
                  loading={postsLoading}
                  error={postsError}
                />
              }
            </TabPanel>
            <TabPanel value='4'>
              {
                <TimeLinePostWrap
                  posts={suggestionPosts}
                  loading={postsLoading}
                  error={postsError}
                />
              }
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Card>
  );
};

export default TimeLine;
