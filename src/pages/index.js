import { Paper } from '@mui/material';
import { getUser } from '../services/user';
import DefaultLayout from '../components/DefaultLayout';

const ResponsiveAppBar = () => {
  const { user, isLoading } = getUser();

  return (
    <DefaultLayout>
      <Paper sx={{ m: 2 }}>{JSON.stringify(user)}</Paper>
    </DefaultLayout>
  );
};

export default ResponsiveAppBar;
