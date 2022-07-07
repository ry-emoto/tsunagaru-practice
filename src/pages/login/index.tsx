import { Button, Card, Divider, Stack, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { NextSeo } from 'next-seo';
import HandshakeIcon from '@mui/icons-material/Handshake';

const index = () => {
  return (
    <>
      <NextSeo
        title='ログイン|Tsunagaru'
        description='Tsunagaruのログインページです。'
      />
      <Stack sx={{ p: '30px' }}>
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={0.5}
        >
          <HandshakeIcon sx={{ width: 36, height: 36 }} color='primary' />
          <Typography variant='h4' fontWeight='bold' color='primary'>
            Tsunagaru
          </Typography>
        </Stack>
        <Card
          component={Stack}
          width='400px'
          textAlign='center'
          spacing={3}
          sx={{ p: '30px', m: '0 auto', mt: '60px' }}
        >
          <Typography variant='h5'>ログイン</Typography>
          <Stack divider={<Divider>or</Divider>} spacing={2}>
            <Stack spacing={1}>
              <Button
                startIcon={<GoogleIcon />}
                variant='outlined'
                color='inherit'
                sx={{ textTransform: 'none', borderRadius: '30px' }}
                onClick={() => signIn('google', { callbackUrl: '/' })}
              >
                Sign in with Google
              </Button>
              <Button
                startIcon={<GitHubIcon />}
                variant='outlined'
                color='inherit'
                sx={{ textTransform: 'none', borderRadius: '30px' }}
                onClick={() => signIn('github', { callbackUrl: '/' })}
              >
                Sign in with GitHub
              </Button>
            </Stack>
            <Button
              variant='contained'
              color='primary'
              sx={{ textTransform: 'none', borderRadius: '30px' }}
              onClick={() => signIn('credentials', { callbackUrl: '/' })}
            >
              ゲストログイン
            </Button>
          </Stack>
        </Card>
      </Stack>
    </>
  );
};

export default index;
