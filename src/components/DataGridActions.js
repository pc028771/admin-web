import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import _ from 'lodash';

const DataGridActions = {
  onEditClick: () => {},
  onAddClick: () => {},
  onDeleteClick: () => {},
};

const renderCell = props => {
  let { onEditClick, onAddClick, onDeleteClick } = DataGridActions;
  let {
    row: { id, isNew },
  } = props;

  if (id == -1) {
    return (
      <Box>
        <Button variant='contained' color='primary' size='small' onClick={() => _.isFunction(onAddClick) && onAddClick(props)}>
          新增
        </Button>
      </Box>
    );
  }

  return (
    <Stack direction='row' spacing={1}>
      <Button
        variant='contained'
        color='primary'
        size='small'
        startIcon={<EditIcon />}
        onClick={() => _.isFunction(onEditClick) && onEditClick(props)}
      >
        編輯
      </Button>
      <Button
        variant='outlined'
        color='error'
        size='small'
        startIcon={<DeleteIcon />}
        onClick={() => _.isFunction(onDeleteClick) && onDeleteClick(props)}
      >
        刪除
      </Button>
    </Stack>
  );
};

export default DataGridActions;
export { renderCell };
