import { useSWRConfig } from 'swr';
import { useCallback } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { getUsers } from '../services/user';
import Layout from '../components/Layout';
import DataGridActions, { renderCell } from '../components/DataGridActions';

const ResponsiveAppBar = () => {
  const { rows, isLoading } = getUsers();
  DataGridActions.onEditClick = useCallback(({ id, row }) => {
    console.log(id, row);
  }, []);

  const columns = [
    { field: 'account', headerName: '帳號', flex: 1, editable: false },
    { field: 'lastName', headerName: '姓', flex: 1, editable: true },
    { field: 'firstName', headerName: '名字', flex: 1, editable: true },
    { field: 'email', headerName: 'Email', flex: 1, editable: true },
    {
      field: 'actions',
      headerName: '',
      editable: false,
      minWidth: 170,
      renderCell,
    },
  ];

  const processRowUpdate = async (newUser, currentUser) => {
    if (_.isEqual(newUser, currentUser)) {
      return currentUser;
    }

    const { mutate } = useSWRConfig();

    let response = await fetch(`api/admin/users/${newUser.id}`, {
      body: JSON.stringify(newUser),
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
    });

    mutate('api/admin/users');
    return response.json();
  };

  if (isLoading) {
    return <Layout />;
  }

  return (
    <Layout>
      <DataGrid
        rows={rows}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: () => (
            <GridToolbarContainer>
              <Button variant='contained' size='small' color='primary' startIcon={<AddIcon />}>
                新增
              </Button>
            </GridToolbarContainer>
          ),
        }}
      ></DataGrid>
    </Layout>
  );
};

export default ResponsiveAppBar;
