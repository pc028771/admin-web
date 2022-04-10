import { Grid, Stack, TextField, Container, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';

export default function Signin() {
  const router = useRouter();
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      account: '',
      password: '',
    },
  });

  const onSubmit = async data => {
    let response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return router.push('/admin/users');
    }

    return false;
  };

  return (
    <Box sx={{ backgroundColor: 'lightBlue', height: '100vh', width: '100vw' }}>
      <Container maxWidth='xs' sx={{ pt: '20vh' }}>
        <Paper component={'form'} sx={{ pt: 4, px: 3, pb: 6 }} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name='account'
              control={control}
              rules={{ require: true }}
              render={({ field }) => <TextField {...field} variant='standard' label='帳號' fullWidth />}
            />
            <Controller
              name='password'
              control={control}
              rules={{ require: true }}
              render={({ field }) => <TextField {...field} variant='standard' label='密碼' fullWidth />}
            />
            <Button type='submit'>登入</Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
