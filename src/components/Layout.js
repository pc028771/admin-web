import { Stack, Box, Toolbar, AppBar } from '@mui/material';
import AppBarMenu from './AppBarMenu';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='fixed' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <AppBarMenu />
      </AppBar>
      <Sidebar />
      <Stack sx={{ flexGrow: 1, flexShrink: 1 }}>
        <Toolbar sx={{ flexGrow: 0 }} />
        {children}
      </Stack>
    </Box>
  );
}
