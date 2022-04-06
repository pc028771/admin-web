import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DefaultLayout from '../../../components/DefaultLayout';

export default function UserForm(props) {
  return (
    <DefaultLayout>
      <Container maxWidth='md'>
        <Box component='form' noValidate autoComplete='off'>
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={12}>
              <Typography variant='h4'>編輯使用者</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField id='account' label='帳號' variant='filled' fullWidth required />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField id='firstName' label='姓' variant='filled' fullWidth />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField id='lastName' label='名字' variant='filled' fullWidth />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField id='email' label='Email' variant='filled' fullWidth />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained'>儲存</Button>
          </Grid>
        </Box>
      </Container>
    </DefaultLayout>
  );
}
