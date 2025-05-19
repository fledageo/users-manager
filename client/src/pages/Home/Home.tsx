import { useEffect, useState } from "react";
import styles from "./Home.module.css"
import { getAllUsers } from "../../lib/api";
import { Table } from "../../components/Table/Table";
import { useNavigate } from "react-router";
import type { IUser } from "../../lib/types";

export const Home = () => {
  const [currentUser, setCurrentUser] = useState<IUser>({})
  const [users, setUsers] = useState<IUser[]>([])
  const navigate = useNavigate()
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    } else {
      getAllUsers().then(res => {
        if (res.status == "ok") {
          setUsers(res.payload.allUsers)
          setCurrentUser(res.payload.currentUser)
        }else{
          navigate("/login")
        }
      })
    }
  }, [])


  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header_container}>
            <div className={styles.actions}>
              {
                currentUser?.role?.invite && <button className={styles.action} onClick={() => navigate('/invite')}>+ Invite</button>
              }
            </div>
            <div className={styles.logout}>
              <button className={styles.action} onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>

        <div className={styles.table_wrapper}>
          <Table users={users} current={currentUser} setUsers={setUsers}/>
        </div>
      </div>
    </div>
  )
}
