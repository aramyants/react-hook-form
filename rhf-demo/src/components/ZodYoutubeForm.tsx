import { DevTool } from '@hookform/devtools';
import { useForm, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

let renderCount = 0;

const schema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Email must be a valid email" }),
  channel: z.string().min(1, { message: "Channel is required" }),
});

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

export const ZodYoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: 'Batman',
      email: '',
      channel: '',
    },
    resolver: zodResolver(schema),
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
      <h1>Zod Youtube Form ({renderCount / 2})</h1>
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
