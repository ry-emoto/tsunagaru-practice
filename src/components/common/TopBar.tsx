import * as React from 'react';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import stringToColor from '../../utils/stringToColor';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Menu, MenuItem, Stack } from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

type Props = {
  handleDrawerToggle: any;
};

const TopBar = (props: Props) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { data: session } = useSession();
  const userName = session?.user?.name;

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawerWidth = 200;
  return (
    <AppBar
      position='fixed'
      color='inherit'
      elevation={1}
      sx={{
        ml: { sm: `${drawerWidth}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        variant='dense'
        component={Stack}
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        {/* left-menu */}
        <Stack direction='row' alignItems='center'>
          <IconButton
            color='default'
            edge='start'
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <NextLink href='/' passHref style={{ cursor: 'pointer' }}>
            <MuiLink>
              <Stack
                direction='row'
                justifyContent='center'
                alignItems='center'
                spacing={0.3}
              >
                <HandshakeIcon sx={{ width: 30, height: 30 }} />
                <Typography variant='h5' fontWeight='bold'>
                  Tsunagaru
                </Typography>
              </Stack>
            </MuiLink>
          </NextLink>
        </Stack>

        {/* right-menu */}
        <Stack direction='row' alignItems='center' spacing={1}>
          <Stack direction='row' alignItems='center'>
            <IconButton>
              <HelpOutlineIcon sx={{ width: 26, height: 26 }} />
            </IconButton>
            <IconButton>
              <NotificationsNoneIcon sx={{ width: 26, height: 26 }} />
            </IconButton>
          </Stack>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {userName && (
              <Avatar
                sx={{ width: 30, height: 30, bgcolor: stringToColor(userName) }}
              >
                {userName.slice(0, 2)}
              </Avatar>
            )}
          </IconButton>
        </Stack>

        {/* menu */}
        <Menu
          sx={{ mt: '45px' }}
          id='menu-appbar'
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem>
            <Typography textAlign='center'>Profile</Typography>
          </MenuItem>
          <MenuItem onClick={() => signOut()}>
            <Typography textAlign='center'>Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
