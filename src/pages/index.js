import { Paper, Box } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../contexts/user-context';

const ResponsiveAppBar = () => {
  const { user } = useContext(UserContext);
  return (
    <Box>
      <Paper sx={{ m: 2 }}>{JSON.stringify(user)}</Paper>
    </Box>
  );
};

export default ResponsiveAppBar;
