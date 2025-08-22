import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"

let renderCount = 0

type FormValues = {
  username: string
  email: string
  channel: string
}

export const YoutubeForm = () => {
  const form = useForm<FormValues>()
  const { register, handleSubmit, control } = form

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data)
  }

  renderCount++

  return (
    <div>
      <h1>Youtube Form ({renderCount/2})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username",
          {
            required: {
              value: true,
              message: "Username is required"
            },
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters"
            }
          }
        )} />
        <br />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email",
          {
            required: {
              value: true,
              message: "Email is required"
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address"
            }
          }
        )} />
        <br />
        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />
        <br />
        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  )
}
