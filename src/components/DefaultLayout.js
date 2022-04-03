import { Stack, Box } from '@mui/material';
import AdminAppBar from './AdminAppBar';

const DefaultLayout = ({ children }) => {
  return (
    <Stack sx={{ height: '100vh' }}>
      <AdminAppBar />
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Stack>
  );
};

export default DefaultLayout;
