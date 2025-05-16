import { useState } from "react"
import styles from "./Invite.module.css"

export const Invite = () => {
    const [email,setEmail] = useState("")
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button>Send Invitation</button>
            </div>
        </div>
    )
}
