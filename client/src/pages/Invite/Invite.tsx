import styles from "./Invite.module.css"
import { inviteUser } from "../../lib/api"
import { useState } from "react"
import { useNavigate } from "react-router"

export const Invite = () => {
    const [email,setEmail] = useState("")
    const navigate = useNavigate()

    const handleSend = () => {
        inviteUser(email)
        .then(res => {
            if(res.status === "ok"){
                setEmail("")
                navigate("/")
            }
        })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2>Send Invitation</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={styles.email_field}
                />
                <button className={styles.send_btn} onClick={handleSend}>Send Invitation</button>
            </div>
        </div>
    )
}
