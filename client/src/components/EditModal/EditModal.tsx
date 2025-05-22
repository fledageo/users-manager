import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import styles from './EditModal.module.css'
import type { IUser } from '../../lib/types'
import { updateUser } from '../../lib/api'

interface IProps {
    setOpenModal: Dispatch<SetStateAction<IUser | null>>
    user: IUser,
    currentUser: IUser
    updateList: (updated: IUser) => void
}

export const EditModal = ({ setOpenModal, user, currentUser, updateList }: IProps) => {
    const [fieldsValues, setFieldsValues] = useState<any>()
    const ref = useRef<HTMLDivElement | null>(null)
    const allowApdate = currentUser.role?.permissions.update

    useEffect(() => {
        const values: IUser = {};
        allowApdate.forEach((field: string) => {
            const key = field as keyof IUser
            values[key] = key == "role" ? user[key]?.name : user[key]
        });
        setFieldsValues(values)
    }, [])

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target == ref.current) {
            setOpenModal(null)
        }
    }

    const handleEdit = () => {
        const formdata = new FormData()
        for (let key in fieldsValues) {
            if (key != "photo") {
                formdata.append(key, fieldsValues[key])
            } else {
                const file = fieldsValues[key]
                if (file) {
                    formdata.append("photo", file)
                }
            }
        }
        updateUser(user._id as string, formdata)
            .then(res => {
                if (res.status == "ok") {
                    updateList(res.payload as IUser)
                    setOpenModal(null)
                }
            })
    }

    return (
        <div className={styles.modal_layout} onClick={(e) => handleCloseModal(e)} ref={ref}>
            <div className={styles.modal}>
                <h2 className={styles.modal_title}>{allowApdate.length > 0 ? "Edit" : "You Can't Edit"}</h2>

                <div className={styles.edit}>
                    {
                        allowApdate.map((field: string) => <div key={field}>
                            {
                                fieldsValues && (
                                    field == "role" ?
                                        <select
                                            className={styles.field}
                                            onChange={(e) => setFieldsValues({ ...fieldsValues, role: e.target.value })}
                                            value={fieldsValues.role}
                                        >
                                            <option value="user">User</option>
                                            <option value="editor">Editor</option>
                                        </select>
                                        : field == "photo" ?
                                            <input
                                                type="file"
                                                className={styles.field}
                                                onChange={(e) => setFieldsValues({ ...fieldsValues, photo: e.target.files?.[0] })}
                                            />
                                            :
                                            <input
                                                type="text"
                                                className={styles.field}
                                                placeholder={field}
                                                value={fieldsValues[field as keyof IUser]}
                                                onChange={(e) => setFieldsValues({ ...fieldsValues, [field]: e.target.value })}
                                            />

                                )
                            }
                        </div>)
                    }

                    {
                        allowApdate.length > 0 && <button onClick={handleEdit} className={styles.btn}>Save</button>
                    }
                </div>
            </div>
        </div>
    )
}
