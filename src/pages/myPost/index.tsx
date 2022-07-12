import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';
import fetcher from '../../lib/fetcher';
import CommonMenu from '../../components/common/CommonMenu';
import TimeLine from '../../components/timeLine/TimeLine';
import useGetPost from '../../hooks/useGetPost';
import { useSession } from 'next-auth/react';

type Props = {
  fallbackData: any;
};

const index = (props: Props) => {
  const { data: session } = useSession();
  const { posts, postsLoading, postsError } = useGetPost(
    '/api/post',
    props.fallbackData
  );
  const targetPost = posts?.filter(
    (post: any) => post.user_id === session?.user.id
  );

  return (
    <>
      <NextSeo
        title='自分の投稿|Tsunagaru'
        description='Tsunagaru自分の投稿ページ'
      />
      <CommonMenu>
        <TimeLine data={targetPost} load={postsLoading} err={postsError} />
      </CommonMenu>
    </>
  );
};

export default index;

export const getStaticProps: GetStaticProps = async () => {
  const API_URL = process.env.NEXTAUTH_URL;

  if (typeof API_URL === 'undefined') {
    return {
      props: {
        fallbackData: null,
      },
    };
  }

  const data = await fetcher(`${API_URL}/api/post`);
  const post = JSON.parse(JSON.stringify(data));

  return {
    props: {
      fallbackData: post,
    },
  };
};
