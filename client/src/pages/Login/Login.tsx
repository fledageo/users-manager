import { useForm, type FieldValues } from "react-hook-form"
import styles from "./Login.module.css"
import { login } from "../../lib/api"
import type { ILoginData } from "../../lib/types"
import { useNavigate } from "react-router"

export const Login = () => {
  const { register, reset, handleSubmit } = useForm()
  const navigate = useNavigate()

  const handleLogin = (data: FieldValues) => {
    login(data as ILoginData)
      .then(res => {
        if (res.status == "ok") {
          localStorage.setItem('token', res.payload)
          
          reset()
          navigate("/")       
        }
      })
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit((data) => handleLogin(data))}>
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
