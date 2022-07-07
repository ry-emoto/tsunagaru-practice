import React from 'react';
import { useSession } from 'next-auth/react';
import { mutate } from 'swr';
import axios from 'axios';
import { Box, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

type Props = {
  post: any;
};

const FavoriteBtn = (props: Props) => {
  const { data: session } = useSession();

  const handleCreate = async (id: number) => {
    try {
      await axios.post(`/api/bookmark/${id}`);
      mutate('/api/post');
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/bookmark/${id}`);
      mutate('/api/post');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      {props.post.bookmark.find(
        (bookmark: any) => bookmark.user_id === session?.user.id
      ) ? (
        <IconButton size='small' onClick={() => handleDelete(props.post.id)}>
          <BookmarkIcon fontSize='small' color='primary' />
          {props.post._count.bookmark}
        </IconButton>
      ) : (
        <IconButton size='small' onClick={() => handleCreate(props.post.id)}>
          <BookmarkBorderIcon fontSize='small' />
          {props.post._count.bookmark}
        </IconButton>
      )}
    </Box>
  );
};

export default FavoriteBtn;
