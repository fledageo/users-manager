import { useNavigate, useSearchParams } from "react-router"
import styles from "./Activate.module.css"
import { useEffect, useState } from "react"
import { activateUser, verifyToken } from "../../lib/api"
import { useForm, type FieldValues } from "react-hook-form"

export const Activate = () => {
    const [userId, setUserId] = useState<string>("")
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
                } else {
                    setTokenExpired(true)
                }
            })
    }, [])

    const handleActivate = (data: FieldValues) => {
        if (data.password === data.confirmPassword) {
            const formData = new FormData()

            formData.append("fullName", `${data.name} ${data.surname}`)
            formData.append("phone", data.phone)
            formData.append("password", data.password)
            formData.append("_id", userId)

            if (data.photo && data.photo[0]) {
                formData.append("photo", data.photo[0]);
            }
            activateUser(formData, userId)
                .then(res => {
                    if (res.status == "ok") {
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
                                <div className={styles.uploadWrapper}>
                                    <label htmlFor="fileUpload">Choose Photo</label>
                                    <input
                                        type="file"
                                        id="fileUpload"
                                        className={`${styles.field} ${styles.fileField}`}
                                        {...register("photo")}
                                    />
                                </div>

                                <button type="submit" className={styles.btn}>Activate</button>
                            </form>
                        </div>
                }
            </div>
        </div>
    )
}
