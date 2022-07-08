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

  const targetPost = posts?.filter(
    (post: any) =>
      post.bookmark?.filter((book: any) => book.user_id === 1).length > 0
  );

  return (
    <CommonMenu>
      <TimeLine data={targetPost} load={postsLoading} err={postsError} />
    </CommonMenu>
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
