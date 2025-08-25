import { DevTool } from '@hookform/devtools';
import { useFieldArray, useForm } from 'react-hook-form';

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: { number: string }[];
};

export const YoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: 'Batman',
      email: '',
      channel: '',
      social: {
        twitter: '',
        facebook: '',
      },
      phoneNumbers: ['', ''],
      phNumbers: [{ number: '' }],
    },
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

  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control,
  });

  renderCount++;

  return (
    <div>
      <h1>Youtube Form ({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register('username', {
              required: {
                value: true,
                message: 'Username is required',
              },
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
              validate: {
                notAdmin: (fieldValue) =>
                  fieldValue !== 'admin@example.com' ||
                  'Username cannot be admin',
                notBlacklisted: (fieldValue) =>
                  !fieldValue.endsWith('baddomain.com') ||
                  'This domain is not supported',
                endsWithCom: (value) => {
                  return value.endsWith('.com') || 'Email must end with .com';
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register('channel', {
              required: {
                value: true,
                message: 'Channel is required',
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input type="text" id="twitter" {...register('social.twitter', {})} />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            {...register('social.facebook', {})}
          />
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary phone number</label>
          <input
            type="text"
            id="primary-phone"
            {...register('phoneNumbers.0', {})}
          />
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary phone number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register('phoneNumbers.1', {})}
          />
        </div>

        <div>
          <label>List of phone numbers</label>
          <button
            type="button"
            onClick={() => {
              append({ number: '' });
            }}
          >
            Append
          </button>
          {fields.map((field, index) => (
            <div key={field.id} className="form-control">
              <input
                type="text"
                {...register(`phNumbers.${index}.number` as const, {})}
              />
              {index > 0 && (
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
