import useSWR, { useSWRConfig } from 'swr';
import fetcher from '../lib/fetcher';

export const getMyProfile = () => {
  const { data, error } = useSWR('api/user/me', fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const getUserById = id => {
  const { data, error } = useSWR(`api/admin/uses/${id}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const getUsers = () => {
  const { data, error } = useSWR(`api/admin/users`, fetcher);

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const createUser = newUser => {
  const { mutate } = useSWRConfig();
  mutate('api/admin/users', async () => {
    const updatedUsers = await fetch('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
    });

    return [...data, newUser];
  });
};
