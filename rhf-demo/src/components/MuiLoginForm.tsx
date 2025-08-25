import { DevTool } from '@hookform/devtools';
import { Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

export const MuiLoginForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted', data);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width="300px">
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            required
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            required
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
          >
            Login
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </div>
  );
};
