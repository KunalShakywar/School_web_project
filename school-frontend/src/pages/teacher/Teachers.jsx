import { useState } from "react";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";


import Table from "../../components/table/Table";


const FAKE_TEACHERS = [
  {
    id: 1,
    name: "Ravi Sharma",
    role: "Teacher",
    phone: "9876543210",
    email: "ravi@gmail.com",
    department: "Math",
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
    id: 3,
    name: "Ravi Sharma",
    role: "Teacher",
    phone: "9876543210",
    email: "ravi@gmail.com",
    department: "Math",
    photo: "https://via.placeholder.com/100"
  },
  {
    id: 4,
    name: "Anita Verma",
    role: "Staff",
    phone: "9123456780",
    email: "anita@gmail.com",
    department: "Accounts",
    photo: "https://via.placeholder.com/100"
  },
  {
    id: 5,
    name: "Rahul Singh",
    role: "Teacher",
    phone: "9999999999",
    email: "rahul@gmail.com",
    department: "Science",
    photo: "https://via.placeholder.com/100"
  },  {
    id: 6,
    name: "Ravi Sharma",
    role: "Teacher",
    phone: "9876543210",
    email: "ravi@gmail.com",
    department: "Math",
    photo: "https://via.placeholder.com/100"
  },
  {
    id: 7,
    name: "Anita Verma",
    role: "Staff",
    phone: "9123456780",
    email: "anita@gmail.com",
    department: "Accounts",
    photo: "https://via.placeholder.com/100"
  },
  {
    id: 8,
    name: "Rahul Singh",
    role: "Teacher",
    phone: "9999999999",
    email: "rahul@gmail.com",
    department: "Science",
    photo: "https://via.placeholder.com/100"
  }
];

function TeacherTable() {
const [name, setName] = useState("")



  const columns = ["name","role","phone","email","department"]

  const data = FAKE_TEACHERS
  return (
    <div className="p-5 pt-28">

      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <LiaChalkboardTeacherSolid /> Teacher Management
      </h1>
      
      <Table columns={columns} data={data} />
  
 
     
    </div>
  );
}
export default TeacherTable;
