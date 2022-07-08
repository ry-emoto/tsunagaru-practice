import React from 'react';
import stringToColor from '../../lib/stringToColor';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Stack,
  Avatar,
  Tooltip,
} from '@mui/material';
import FavoriteBtn from './FavoriteBtn';
import BookmarkBtn from './BookmarkBtn';
import CommentBtn from './CommentBtn';
import { useRouter } from 'next/router';

type Props = {
  post: any;
};

const TimeLinePost = (props: Props) => {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  return (
    <>
      {props.post ? (
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            {props.post?.user?.name && (
              <Tooltip title={props.post.user.name}>
                <Avatar
                  sx={{
                    bgcolor: stringToColor(props.post.user.name),
                  }}
                >
                  {props.post.user.name.slice(0, 2)}
                </Avatar>
              </Tooltip>
            )}
          </ListItemAvatar>
          <Stack width='100%'>
            <ListItemButton
              sx={{ m: 0, p: 0 }}
              onClick={() => router.push(`/${path}/${props.post.id}`)}
            >
              <ListItemText
                sx={{ whiteSpace: 'pre-line' }}
                primary={
                  <>
                    [{props.post?.type}]<br />
                    {props.post?.content}
                  </>
                }
                secondary={<>{props.post.created_at}</>}
              />
            </ListItemButton>
            <Stack
              direction='row'
              justifyContent='space-around'
              alignItems='center'
            >
              <FavoriteBtn post={props.post} />
              <BookmarkBtn post={props.post} />
              <CommentBtn post={props.post} />
            </Stack>
          </Stack>
        </ListItem>
      ) : (
        'データ取得失敗'
      )}
    </>
  );
};

export default TimeLinePost;
