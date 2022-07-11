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
    (post: any) =>
      post.bookmark?.filter((book: any) => book.user_id === session?.user.id)
        .length > 0
  );

  return (
    <>
      <NextSeo
        title='ブックマーク|Tsunagaru'
        description='Tsunagaruブックマークページ'
      />
      <CommonMenu>
        <TimeLine data={targetPost} load={postsLoading} err={postsError} />
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
