export const initialFormState = {
  roll: "",
  name: "",
  className: "",
  qualification: "",
  phone: "",
  email: "",
  password: "",
  totalFees: "",
  paidFees: "",
};

export const classOptions = [
  { label: "All Classes", value: "All" },
  { label: "8th", value: "8th" },
  { label: "9th", value: "9th" },
  { label: "10th", value: "10th" },
];

export const classFormOptions = [
  { label: "Select Class", value: "" },
  { label: "8th", value: "8th" },
  { label: "9th", value: "9th" },
  { label: "10th", value: "10th" },
];

export const normalizeStudents = (list = []) =>
  list.map((student) => ({
    id: student._id,
    roll: student.rollNumber,
    name: student.name,
    className: student.className,
    qualification: student.qualification ?? student.stream ?? "",
    phone: student.phone,
    email: student.email,
    totalFees: student.totalFees ?? 0,
    paidFees: student.paidFees ?? 0,
  }));
