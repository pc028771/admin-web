import useSWR from 'swr';
import fetcher from '../lib/fetcher';

export const getUser = () => {
  const { data, error } = useSWR('api/user/me', fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
