import type { IUser } from "../../lib/types"
import styles from "./Table.module.css"
import avatar from "../../assets/avatar.png"
import { useState, type Dispatch, type SetStateAction } from "react"
import { deleteUser } from "../../lib/api"
import { EditModal } from "../EditModal/EditModal"

interface IProps {
    users: IUser[],
    current: IUser,
    setUsers: Dispatch<SetStateAction<IUser[]>>
}


export const Table = ({ users, current, setUsers }: IProps) => {
    const [openMenu, setOpenMenu] = useState<string | null>(null)
    const [openModal, setOpenModal] = useState<IUser | null>(null)
    const readable = current.role?.permissions.read || []

    const toggleMenu = (userId: string) => {
        setOpenMenu(prev => prev === userId ? null : userId)
    }
    const handleDeleteUser = (id: string) => {
        deleteUser(id)
            .then(res => {
                if (res.status == "ok") {
                    setUsers(prev => {
                        return prev.filter(user => user._id !== res.payload._id)
                    })
                }
                setOpenMenu(null)
            })
    }

    const updateList = (updated: IUser) => {
        let list = users.map(user =>
            user._id === updated._id ? updated : user
        )
        setUsers(list)
    }

    return (
        <>
            <div className={styles.wrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th></th>
                            {
                                readable.map((field: String) => <th key={field as string}>{field}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className={styles.row}>
                                <td>
                                    {user._id === current._id && <span className={styles.mark}>You</span>}
                                    <img
                                        src={`http://localhost:5000/api/user/photo/${user.photo}`}
                                        alt={user.fullName}
                                        className={styles.avatar}
                                    />
                                </td>
                                {
                                    readable.map((field: string) => (

                                        <td key={field}>
                                            {
                                                field === "role" ? user.role?.name : user[field as keyof IUser] as string
                                            }
                                        </td>
                                    ))
                                }
                                {
                                    (current.role.scope == "any" || user._id == current._id) &&
                                    < td >
                                        <div className={styles.menuContainer}>
                                            <button
                                                className={styles.dotButton}
                                                onClick={() => toggleMenu(user._id as string)}
                                            >
                                                ⋮
                                            </button>
                                            {openMenu === user._id && (
                                                <div className={styles.dropdownMenu}>
                                                    <button onClick={() => setOpenModal(user)}>Edit</button>
                                                    {
                                                        current.role.delete &&
                                                        <button onClick={() => handleDeleteUser(user._id as string)}>
                                                            Delete
                                                        </button>
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                }

                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    openModal &&
                    <EditModal
                        setOpenModal={setOpenModal}
                        user={openModal}
                        currentUser={current}
                        updateList={updateList}
                    />
                }


            </div >
        </>
    )
}
