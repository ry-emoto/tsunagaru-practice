import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useGetPost = (url: string) => {
  const { data, error } = useSWR(url, fetcher);
  return {
    posts: data,
    postsLoading: !error && !data,
    postsError: error,
  };
};

export default useGetPost;
