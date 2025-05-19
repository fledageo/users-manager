import { sendResetMail } from '../../lib/api'
import styles from './ResetPassword.module.css'
import { useState } from 'react'

export const ResetPassword = () => {
    const [email,setEmail] = useState<string>("")
    const [isSent,setIsSent] = useState<boolean>(false)

    const handleSend = () => {
        sendResetMail(email)
        .then(res => {
            if(res.status == "ok"){
                setEmail("")  
                setIsSent(true)  
            }
        })
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2>Reset Password</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={styles.email_field}
                />
                <button className={styles.send_btn} onClick={handleSend}>Send Reset Link</button>
                {
                    isSent && <span>Link has been sent</span>
                }
            </div>
        </div>
    )
}
