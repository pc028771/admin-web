import _ from 'lodash';
import { useCallback } from 'react';
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
import Chip from '@mui/material/Chip';
import Layout from '../../../components/Layout';
import { getRelations, getUserById } from '../../../services/user';

export default function UserForm() {
  const {
    query: { id },
  } = useRouter();

  const { user, userRole, isLoading: isUserLoading } = getUserById(id);
  const { roles, isLoading: isRelLoading } = getRelations();
  const { control, handleSubmit } = useForm();
  const onSubmit = useCallback(data => {
    console.log(data);
  });

  if (isUserLoading || isRelLoading) {
    return 'Loading';
  }

  return (
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
                defaultValue={user.account}
                rules={{ required: true }}
                render={({ field }) => <TextField {...field} label='帳號' type='email' fullWidth required />}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <Controller
                name='firstName'
                control={control}
                defaultValue={user.firstName}
                rules={{}}
                render={({ field }) => <TextField {...field} label='姓' fullWidth />}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <Controller
                name='lastName'
                control={control}
                defaultValue={user.lastName}
                rules={{}}
                render={({ field }) => <TextField {...field} label='名字' fullWidth />}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <Controller
                name='email'
                control={control}
                defaultValue={user.email}
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
                  rules={{ required: true }}
                  defaultValue={userRole}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        label='群組'
                        labelId='role-label'
                        multiple
                        fullWidth
                        onChange={({ target: { value } }) => {
                          userRole.splice(0, userRole.length - 1, ...value.sort());
                          field.onChange(value);
                        }}
                        renderValue={selected => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map(roleId => (
                              <Chip key={roleId} label={_.get(_.find(roles, { id: roleId }), 'name')} />
                            ))}
                          </Box>
                        )}
                      >
                        {roles.map(({ id, key, name }) => (
                          <MenuItem key={key} value={id}>
                            <Checkbox checked={userRole.includes(id)} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }}
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
  );
}

UserForm.getLayout = page => <Layout>{page}</Layout>;
