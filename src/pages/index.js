import { Paper, Box } from '@mui/material';
import { getUsers } from '../services/user';
import DefaultLayout from '../components/DefaultLayout';
import { DataGrid } from '@mui/x-data-grid';

const ResponsiveAppBar = () => {
  const { users, isLoading } = getUsers();

  if (isLoading) {
    return (
      <DefaultLayout>
        <Box>Loading</Box>
      </DefaultLayout>
    );
  }

  const columns = [
    { field: 'account', headerName: 'Account', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
  ];

  return (
    <DefaultLayout>
      <DataGrid rows={users} columns={columns}></DataGrid>
    </DefaultLayout>
  );
};

export default ResponsiveAppBar;
