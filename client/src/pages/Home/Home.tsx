import { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css"
import { getAllUsers } from "../../lib/api";
import { Table } from "../../components/Table/Table";
import { useNavigate } from "react-router";
import UserContext from "../../context/UserContext";

export const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  // const userContext = useContext(UserContext)


  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    } else {
      getAllUsers().then(res => {
        if (res.status == "ok") {
          setUsers(res.payload)
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
              <button className={styles.action} onClick={() => navigate('/invite')}>+ Invite</button>
              <button className={styles.action}>Edit</button>
            </div>
            <div className={styles.logout}>
              <button className={styles.action} onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>

        <div className={styles.table_wrapper}>
          <Table users={users} />
        </div>
      </div>
    </div>
  )
}
