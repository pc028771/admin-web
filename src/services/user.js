import useSWR, { useSWRConfig } from 'swr';
import fetcher from '../lib/fetcher';

export const getMyProfile = () => {
  const { data, error } = useSWR('/api/user/me', fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const getUserById = id => {
  const { data, error } = useSWR(`/api/admin/uses/${id}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const getUsers = () => {
  const { data, error } = useSWR(`/api/admin/users`, fetcher);

  return {
    ...data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const getRelations = () => {
  const { data, error } = useSWR('/api/admin/users/relations', fetcher);

  return {
    ...data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const createUser = async newUser => {
  const { mutate } = useSWRConfig();
  return await mutate('/api/admin/users', async () => {
    const updatedUsers = await fetch('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
    });

    return [...data, newUser];
  });
};

export const updateUser = async newUser => {
  const { mutate } = useSWRConfig();
  const { id } = newUser;

  return await mutate('/api/admin/users', async users => {
    const updatedUsers = await fetch(`/api/admin/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newUser),
    });
    let updatedIndex = _.findIndex(users, { id });
    return [...data, newUser];
  });
};
