import type { IUser } from "../../lib/types"
import styles from "./Table.module.css"

interface IProps {
    users:IUser[]
}

export const Table = ({users}:IProps) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Picture</th>
                    <th>Full Name</th>
                    <th>Phone</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {users.map(({ _id, photo, fullName, phone, status }) => (
                    <tr key={_id} >
                        <td>
                            <img
                                src={photo}
                                alt={fullName}
                                className={styles.avatar}
                            />
                        </td>
                        <td>{fullName}</td>
                        <td>{phone}</td>
                        <td>{status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
