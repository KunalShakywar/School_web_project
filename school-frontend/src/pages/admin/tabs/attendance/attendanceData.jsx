export const classOptions = [
  { label: "All Classes", value: "All" },
  { label: "8th", value: "8th" },
  { label: "9th", value: "9th" },
  { label: "10th", value: "10th" },
];

export const defaultSubject = "Mathematics";
export const defaultTeacher = "Ms. Sharma";

export const todayString = () => new Date().toJSON().split("T")[0];

export const normalizeStudents = (list = []) =>
  list.map((student) => ({
    id: student._id,
    roll: student.rollNumber,
    name: student.name,
    className: student.className,
    phone: student.phone,
  }));
