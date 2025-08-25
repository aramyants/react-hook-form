import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react';
import { useFieldArray, useForm, type FieldErrors } from 'react-hook-form';

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
  age: number;
  dob: Date;
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
      age: 0,
      dob: new Date(),
    },
    mode: 'all',
  });

  const {
    register,
    handleSubmit,
    control,
    formState: {
      errors,
      touchedFields,
      dirtyFields,
      isDirty,
      isValid,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
      submitCount,
    },
    watch,
    getValues,
    setValue,
    reset,
    trigger
  } = form;

  // console.log(isSubmitting, isSubmitted, isSubmitSuccessful, submitCount);
  // console.log({ touchedFields, dirtyFields, isDirty, isValid });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted', data);
  };

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleGetValues = () => {
    console.log('Form values:', getValues());
  };

  const handleSetValue = () => {
    setValue('username', 'Superman', {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control,
  });

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log('Form errors:', errors);
  };

  // const watchForm = watch();

  renderCount++;

  return (
    <div>
      <h1>Youtube Form ({renderCount / 2})</h1>
      {/* <h2>Watched value: {JSON.stringify(watchForm)}</h2> */}
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
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
                emailAvailable: async (value) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${value}`
                  );
                  const data = await response.json();
                  return data.length === 0 || 'Email already exists';
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
          <input
            type="text"
            id="twitter"
            {...register('social.twitter', {
              required: {
                value: true,
                message: 'Twitter handle is required',
              },
              disabled: watch('channel') === '',
            })}
          />
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
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register('age', {
              valueAsNumber: true,
              required: {
                value: true,
                message: 'Age is required',
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register('dob', {
              valueAsDate: true,
              required: {
                value: true,
                message: 'Date of birth is required',
              },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>
        <button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
          Submit
        </button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>{' '}
        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>
        <button type="button" onClick={handleSetValue}>
          Set Value
        </button>
        <button type="button" onClick={() => trigger("email")}>
          Validate
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
