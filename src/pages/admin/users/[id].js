import _ from 'lodash';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import DefaultLayout from '../../../components/DefaultLayout';
import { getUsers, getRelations } from '../../../services/user';

export default function UserForm() {
  const {
    query: { id },
  } = useRouter();
  const { rows, isLoading: isUserLoading } = getUsers();
  const { roles, isLoading: isRelationLoading } = getRelations();
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  if (isUserLoading || isRelationLoading) {
    return null;
  }
  let user = _.find(rows, { id: parseInt(id) });
  console.log(user, roles);

  return (
    <DefaultLayout>
      <Container maxWidth='md'>
        <Box noValidate autoComplete='off'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ my: 1 }}>
              <Grid item xs={12}>
                <Typography variant='h4'>編輯使用者</Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Controller
                  name='account'
                  control={control}
                  defaultValue={user?.account ?? ''}
                  rules={{ required: true }}
                  render={({ field }) => <TextField {...field} label='帳號' type='email' fullWidth required />}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Controller
                  name='firstName'
                  control={control}
                  defaultValue={user?.firstName ?? ''}
                  rules={{}}
                  render={({ field }) => <TextField {...field} label='姓' fullWidth />}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Controller
                  name='lastName'
                  control={control}
                  defaultValue={user?.lastName ?? ''}
                  rules={{}}
                  render={({ field }) => <TextField {...field} label='名字' fullWidth />}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Controller
                  name='email'
                  control={control}
                  defaultValue={user?.email ?? ''}
                  rules={{}}
                  render={({ field }) => <TextField {...field} label='Email' fullWidth />}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel id='role-label'>群組</InputLabel>
                  <Controller
                    name='roles'
                    control={control}
                    defaultValue={user?.roles ?? ''}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field} label='群組' labelId='role-label' fullWidth>
                        {roles.map(({ id, key, name }) => (
                          <MenuItem key={key} value={id}>
                            <Checkbox checked={user.roles.indexOf(id) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button href='/admin/users' variant='outlined' sx={{ m: 1 }}>
                取消
              </Button>
              <Button type='submit' variant='contained' sx={{ m: 1 }}>
                儲存
              </Button>
            </Grid>
          </form>
        </Box>
      </Container>
    </DefaultLayout>
  );
}
