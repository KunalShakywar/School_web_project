
import Table from "../../components/table/Table";
import { LiaUserTieSolid } from "react-icons/lia";
import "../../styles/pages/staff.css";

const columns = ["name", "role", "phone", "email", "department"];


  const FakeData = [
    {
      id: 1,
      name: "Ravi Sharma",
      role: "Teacher",
      phone: "9876543210",
      email: "ravi@gmail.com",
      department: "Assistant",
      photo: "https://via.placeholder.com/100"
    },
    {
      id: 2,
      name: "Anita Verma",
      role: "Staff",
      phone: "9123456780",
      email: "anita@gmail.com",
      department: "Accounts",
      photo: "https://via.placeholder.com/100"
    },
    {
      id: 3,
      name: "Rahul Singh",
      role: "Teacher",
      phone: "9999999999",
      email: "rahul@gmail.com",
      department: "Science",
      photo: "https://via.placeholder.com/100"
    },
    {
      id: 4,
      name: "Pooja Sharma",
      role: "Staff",
      phone: "8888888888",
      email: "pooja@gmail.com",
      department: "Library",
      photo: "https://via.placeholder.com/100"
    }
  ]


function StaffTable() {
  const data = FakeData
  return (
    <div className="staff-page">
      <h1 className="staff-page__title">
        <LiaUserTieSolid /> Staff Management
      </h1>

      <Table columns={columns} data={data} />

    </div>
  )

  
}

export default StaffTable;
