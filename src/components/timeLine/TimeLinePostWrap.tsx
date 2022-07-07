import React from 'react';
import { List, Divider, Typography } from '@mui/material';
import TimeLinePost from './TimeLinePost';

type Props = {
  posts: any;
  loading: any;
  error: any;
};

const TimeLinePostWrap = (props: Props) => {
  return (
    <>
      {props.error ? (
        'データ取得失敗...'
      ) : props.loading ? (
        'Loading中...'
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {props.posts && props.posts.length > 0 ? (
            props.posts.map((post: any) => (
              <React.Fragment key={post.id}>
                <TimeLinePost post={post} />
                <Divider variant='fullWidth' component='li' />
              </React.Fragment>
            ))
          ) : (
            <Typography>投稿はまだありません。</Typography>
          )}
        </List>
      )}
    </>
  );
};

export default TimeLinePostWrap;
