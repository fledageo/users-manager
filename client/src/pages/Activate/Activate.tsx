import { useNavigate, useSearchParams } from "react-router"
import styles from "./Activate.module.css"
import { useEffect, useState } from "react"
import { activateUser, verifyToken } from "../../lib/api"
import { useForm, type FieldValues } from "react-hook-form"

export const Activate = () => {
    const [userId, setUserId] = useState<string | number>("")
    const [tokenExpired, setTokenExpired] = useState<boolean>(false)
    
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    
    const [searchParams] = useSearchParams()
    
    const token = searchParams.get("token") as string


    useEffect(() => {
        verifyToken(token)
            .then(res => {
                if (res.status == "ok") {
                    setUserId(res.payload)
                }else{
                    setTokenExpired(true)
                }   
            })
    }, [])

    const handleActivate = (data: FieldValues) => {
        if(data.password === data.confirmPassword){
            const user = {
                fullName: `${data.name} ${data.surname}`,
                phone: data.phone,
                password: data.password
            }
            activateUser(user, userId)
            .then(res => {
                if(res.status == "ok"){
                    navigate("/login")
                }
            })
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {
                    tokenExpired ? <div className={styles.error_wrapper}>
                        <h2>Activation Token Expired</h2>
                    </div>
                        :
                        <div className={styles.activation}>
                            <form className={styles.form} onSubmit={handleSubmit((data) => handleActivate(data))}>
                                <h3 className={styles.title}>Activation</h3>
                                <input
                                    type="text"
                                    className={styles.field}
                                    placeholder="Name"
                                    {...register("name", { required: true })}
                                />
                                <input
                                    type="text"
                                    placeholder="Surname"
                                    className={styles.field}
                                    {...register("surname", { required: true })}
                                />
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    className={styles.field}
                                    {...register("phone", { required: true })}
                                />

                                <input
                                    type="password"
                                    placeholder="Password"
                                    className={styles.field}
                                    {...register("password", { required: true })}
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className={styles.field}
                                    {...register("confirmPassword", { required: true })}
                                />
                                <button type="submit" className={styles.btn}>Activate</button>
                            </form>
                        </div>
                }
            </div>
        </div>
    )
}
