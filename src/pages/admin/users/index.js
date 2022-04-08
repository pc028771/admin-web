import { useSWRConfig } from 'swr';
import { useCallback, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { getUsers } from '../../../services/user';
import Layout from '../../../components/Layout';
import PageLayout from '../../../components/PageLayout';
import DataGridActions, { renderCell } from '../../../components/DataGridActions';

export default function UserDataGrid() {
  const { mutate } = useSWRConfig();
  const { rows, isLoading } = getUsers();
  const [pageSize, setPageSize] = useState(25);
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

    let response = await fetch(`/api/admin/users/${newUser.id}`, {
      body: JSON.stringify(newUser),
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
    });

    mutate('/api/admin/users');
    return response.json();
  };

  if (isLoading) {
    return null;
  }

  return (
    <PageLayout pageTitle='使用者管理'>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        loading={isLoading}
        pageSize={pageSize}
        filterModel={{
          items: [
            { columnField: 'firstName', operatorValue: 'contains', value: '3' },
            { columnField: 'lastName', operatorValue: 'contains', value: '3asdfas' },
          ],
        }}
        rowsPerPageOptions={[10, 25, 50]}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={processRowUpdate}
        components={{
          LoadingOverlay: LinearProgress,
          Toolbar: () => (
            <GridToolbarContainer>
              <Button variant='contained' size='small' color='primary' startIcon={<AddIcon />} sx={{ mx: 0.5, mt: 1 }}>
                新增
              </Button>
            </GridToolbarContainer>
          ),
        }}
      ></DataGrid>
    </PageLayout>
  );
}

UserDataGrid.getLayout = page => <Layout>{page}</Layout>;
