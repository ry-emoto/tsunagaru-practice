import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CreateCommentDialog from './CreateCommentDialog';
import { Post } from '../../../types/post';

type Props = {
  post: Post;
};

const CommentBtn = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Box>
        <IconButton size='small' onClick={handleClickOpen}>
          <ChatBubbleOutlineIcon fontSize='small' />
          {props.post._count.comment}
        </IconButton>
      </Box>
      <CreateCommentDialog open={open} setOpen={setOpen} post={props.post} />
    </>
  );
};

export default CommentBtn;
