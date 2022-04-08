import { Typography, Box } from '@mui/material';

export default function PageLayout({ pageTitle = 'Page title', children }) {
  return (
    <Box sx={{ py: 3, px: 3 }}>
      <Typography variant='h3'>{pageTitle}</Typography>
      <Box sx={{ mt: 3 }}>{children}</Box>
    </Box>
  );
}
