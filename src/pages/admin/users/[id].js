import _ from 'lodash';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DefaultLayout from '../../../components/DefaultLayout';
import { getUsers } from '../../../services/user';

export default function UserForm() {
  const router = useRouter();
  const { id } = router.query;
  const { rows, isLoading } = getUsers();
  let user = _.find(rows, { id: parseInt(id) });
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  if (_.isEmpty(user) || isLoading) {
    return null;
  }

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
                  render={({ field }) => <TextField {...field} label='帳號' variant='filled' type='email' fullWidth required />}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Controller
                  name='firstName'
                  control={control}
                  defaultValue={user?.firstName ?? ''}
                  rules={{}}
                  render={({ field }) => <TextField {...field} label='姓' variant='filled' fullWidth />}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Controller
                  name='lastName'
                  control={control}
                  defaultValue={user?.lastName ?? ''}
                  rules={{}}
                  render={({ field }) => <TextField {...field} label='名字' variant='filled' fullWidth />}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Controller
                  name='email'
                  control={control}
                  defaultValue={user?.email ?? ''}
                  rules={{}}
                  render={({ field }) => <TextField {...field} label='Email' variant='filled' fullWidth />}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained'>
                儲存
              </Button>
            </Grid>
          </form>
        </Box>
      </Container>
    </DefaultLayout>
  );
}
