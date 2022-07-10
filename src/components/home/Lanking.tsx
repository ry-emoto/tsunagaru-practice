import {
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import stringToColor from '../../lib/stringToColor';

type Props = {
  users: any;
};

const Lanking = (props: Props) => {
  return (
    <List>
      {props.users.map((user: any, index: any) => (
        <React.Fragment key={user.id}>
          <ListItem alignItems='center'>
            <Typography width='60px' fontWeight='bold'>
              {index + 1}位
            </Typography>
            <ListItemAvatar>
              {user?.name && (
                <Tooltip title={user.name}>
                  <Avatar
                    sx={{
                      bgcolor: stringToColor(user.name),
                    }}
                  >
                    {user.name.slice(0, 2)}
                  </Avatar>
                </Tooltip>
              )}
            </ListItemAvatar>
            <Stack width='100%'>
              <ListItemText
                sx={{ whiteSpace: 'pre-line' }}
                primary={<>{user.name}</>}
                secondary={
                  <>
                    <Chip
                      label={`投稿:${user._count.post}`}
                      variant='outlined'
                    />
                    <Chip
                      label={`コメント:${user._count.comment}`}
                      variant='outlined'
                    />
                    <Chip
                      label={`いいね:${user._count.like}`}
                      variant='outlined'
                    />
                  </>
                }
              />
            </Stack>
          </ListItem>
          <Divider variant='fullWidth' component='li' />
        </React.Fragment>
      ))}
    </List>
  );
};

export default Lanking;
