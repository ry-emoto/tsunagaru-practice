import { NextSeo } from 'next-seo';
import Login from '../../components/login/Login';

const index = () => {
  return (
    <>
      <NextSeo
        title='ログイン|Tsunagaru'
        description='Tsunagaruのログインページです。'
      />
      <Login />
    </>
  );
};

export default index;
