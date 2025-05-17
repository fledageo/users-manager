import type { IUser } from "../../lib/types"
import styles from "./Table.module.css"
import avatar from "../../assets/avatar.png"

interface IProps {
    users:IUser[]
}


export const Table = ({users}:IProps) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Picture</th>
                    <th>Email</th>
                    <th>Full Name</th>
                    <th>Phone</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {users.map(({ _id, photo, fullName, phone, status, email }) => (
                    <tr key={_id} >
                        <td>
                            <img
                                src={photo || avatar}
                                alt={fullName}
                                className={styles.avatar}
                            />
                        </td>
                        <td>{email}</td>
                        <td>{fullName}</td>
                        <td>{phone}</td>
                        <td className={`${status == "invited" ? styles.status_invited : styles.status_active}`}>
                            {status}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
