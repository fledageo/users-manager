import { useForm, type FieldValues } from "react-hook-form"
import styles from "./Login.module.css"
import { login } from "../../lib/api"
import type { ILoginData } from "../../lib/types"
import { useNavigate } from "react-router"
import { useContext } from "react"
import UserContext from "../../context/UserContext"

export const Login = () => {
  const { register, handleSubmit } = useForm()
  const context = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogin = (data: FieldValues) => {
    login(data as ILoginData)
      .then(res => {
        if (res.status == "ok") {
          localStorage.setItem('token', res.payload.token)
          context?.setUser(res.payload.user)
          navigate("/")
        }
      })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit((data) => handleLogin(data))}>
          <h2 className={styles.title}>Login</h2>
          <input
            type="text"
            placeholder="Email"
            className={styles.field}
            {...register("email", { required: true })}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.field}
            {...register("password", { required: true })}
          />
          <button type="submit" className={styles.btn}>Login</button>
        </form>
      </div>
    </div>
  )
}
