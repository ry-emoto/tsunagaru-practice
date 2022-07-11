import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';
import fetcher from '../../lib/fetcher';
import CommonMenu from '../../components/common/CommonMenu';
import TimeLine from '../../components/timeLine/TimeLine';
import useGetPost from '../../hooks/useGetPost';

type Props = {
  fallbackData: any;
};

const index = (props: Props) => {
  const { posts, postsLoading, postsError } = useGetPost(
    '/api/post',
    props.fallbackData
  );

  return (
    <>
      <NextSeo
        title='全ての投稿|Tsunagaru'
        description='Tsunagaru全ての投稿ページ'
      />
      <CommonMenu>
        <TimeLine data={posts} load={postsLoading} err={postsError} />
      </CommonMenu>
    </>
  );
};

export default index;

export const getStaticProps: GetStaticProps = async () => {
  const API_URL = process.env.API_URL_ROOT;

  if (typeof API_URL === 'undefined') {
    return {
      props: {
        fallbackData: undefined,
      },
    };
  }

  const data = await fetcher(`${API_URL}/api/post`);
  return {
    props: {
      fallbackData: data,
    },
  };
};
