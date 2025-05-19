import { useNavigate, useSearchParams } from 'react-router'
import { changePassword, sendResetMail, verifyToken } from '../../lib/api'
import styles from './ResetPassword.module.css'
import { useEffect, useState } from 'react'

interface IResetPassword {
    pass: string
    confirmPass: string
}

export const ResetPassword = () => {
    const [email, setEmail] = useState<string>("")
    const [userId, setUserId] = useState<string | number>("")
    const [isSent, setIsSent] = useState<boolean>(false)
    const [newPass, setNewPass] = useState<IResetPassword>({ pass: "", confirmPass: "" })

    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            verifyToken(token)
                .then(res => {
                    if (res.status == "ok") {
                        setUserId(res.payload)
                    } else {
                        navigate("/login")
                    }
                })
        }
    }, [])

    const handleSend = () => {
        sendResetMail(email)
            .then(res => {
                if (res.status == "ok") {
                    setEmail("")
                    setIsSent(true)
                }
            })
    }

    const handleChange = () => {
        if(newPass.pass.trim() !== "" && newPass.pass === newPass.confirmPass){
            console.log(userId)
            changePassword(newPass.pass,userId)
            .then(res => {
                if(res.status === "ok"){
                    navigate("/login")
                }
            })
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {
                    token ?
                        <>
                            <h2>Change Password</h2>

                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPass.pass}
                                onChange={(e) => setNewPass({ ...newPass, pass: e.target.value })}
                                className={styles.field}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={newPass.confirmPass}
                                onChange={(e) => setNewPass({ ...newPass, confirmPass: e.target.value })}
                                className={styles.field}
                            />
                            <button className={styles.send_btn} onClick={handleChange}>Change Password</button>
                        </>
                        :
                        <>
                            <h2>Reset Password</h2>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className={styles.field}
                            />
                            <button className={styles.send_btn} onClick={handleSend}>Send Reset Link</button>
                            {
                                isSent && <span>Link has been sent</span>
                            }
                        </>

                }
            </div>
        </div>
    )
}
