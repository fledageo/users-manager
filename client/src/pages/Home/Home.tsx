import { useEffect, useState } from "react";
import styles from "./Home.module.css"
import { getAllUsers } from "../../lib/api";
import { Table } from "../../components/Table/Table";
import { redirect, useNavigate } from "react-router";

// const users = [
//   {
//     _id: 1,
//     photo: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
//     fullName: 'John Doe',
//     phone: '+1 (555) 123-4567',
//     status: 'Active',
//   },
//   {
//     _id: 2,
//     photo: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
//     fullName: 'Jane Smith',
//     phone: '+1 (555) 987-6543',
//     status: 'Inactive',
//   },
// ];

export const Home = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    } else {
      getAllUsers()
        .then(res => {
          if (res.status == "ok") {
            setUsers(res.payload)
          }
        })
    }
  }, [])

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
              <button className={styles.action}>Logout</button>
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
