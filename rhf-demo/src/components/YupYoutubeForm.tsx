import { DevTool } from '@hookform/devtools';
import { useForm, type FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

let renderCount = 0;

const schema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .notOneOf(['admin@example.com'], 'Username cannot be admin')
    .notOneOf(['baddomain.com'], 'This domain is not supported')
    .test('endsWithCom', 'Email must end with .com', (value) => {
      return value?.endsWith('.com');
    })
    .test('emailAvailable', 'Email already exists', async (value) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?email=${value}`
      );
      const data = await response.json();
      return data.length === 0;
    }),
  channel: Yup.string().required('Channel is required'),
});

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

export const YupYoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: 'Batman',
      email: '',
      channel: '',
    },
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted', data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log('Form errors:', errors);
  };

  renderCount++;

  return (
    <div>
      <h1>Youtube Form ({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register('username')}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register('channel')}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
