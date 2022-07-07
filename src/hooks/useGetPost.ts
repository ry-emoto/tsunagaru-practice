import useSWR from 'swr';
import fetcher from '../lib/fetcher';

const useGetPost = (url: string) => {
  const { data, error } = useSWR(url, fetcher);
  return {
    posts: data,
    postsLoading: !error && !data,
    postsError: error,
  };
};

export default useGetPost;
