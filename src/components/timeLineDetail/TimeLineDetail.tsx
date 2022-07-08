import React from 'react';
import TimeLinePost from '../timeLine/TimeLinePost';
import stringToColor from '../../lib/stringToColor';
import {
  Avatar,
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import FormatTime from '../../lib/formatTime';

type Props = {
  data: any;
  load: any;
  err: any;
};

const TimeLineDetail = (props: Props) => {
  const post = props.data;
  const postsLoading = props.load;
  const postsError = props.err;

  const sortComments = post?.comment?.reduceRight(
    (p: any, c: any) => [...p, c],
    []
  );
  return (
    <>
      {postsError ? (
        'データ取得失敗...'
      ) : postsLoading ? (
        'Loading中...'
      ) : (
        <Box component={Stack} alignItems='center' sx={{ m: 'auto' }}>
          <Stack spacing={1} sx={{ width: '100%' }}>
            <Card sx={{ p: '20px' }}>
              <TimeLinePost post={post} />
            </Card>

            {sortComments && sortComments.length > 0 ? (
              <>
                <Typography>{`コメント一覧（${sortComments?.length}件）`}</Typography>
                <Card sx={{ p: '10px' }}>
                  <List>
                    {sortComments.map((comment: any) => (
                      <React.Fragment key={comment.id}>
                        <ListItem alignItems='flex-start'>
                          <ListItemAvatar>
                            {comment?.user?.name && (
                              <Tooltip title={comment.user.name}>
                                <Avatar
                                  sx={{
                                    bgcolor: stringToColor(comment.user.name),
                                  }}
                                >
                                  {comment.user.name.slice(0, 2)}
                                </Avatar>
                              </Tooltip>
                            )}
                          </ListItemAvatar>
                          <ListItemText
                            sx={{ whiteSpace: 'pre-line' }}
                            primary={comment.comment}
                            secondary={
                              <FormatTime dateString={comment.created_at} />
                            }
                          />
                        </ListItem>
                        <Divider variant='fullWidth' component='li' />
                      </React.Fragment>
                    ))}
                  </List>
                </Card>
              </>
            ) : (
              <Typography>コメントはまだありません。</Typography>
            )}
          </Stack>
        </Box>
      )}
    </>
  );
};

export default TimeLineDetail;
