export const defaultSubjects = ["Maths", "Science", "English"];

export const defaultStudents = [
  { id: 1, roll: "101", name: "Rahul Sharma", googleLink: "", marks: { Maths: 85, Science: 80, English: 75 } },
  { id: 2, roll: "102", name: "Aman Verma", googleLink: "", marks: { Maths: 70, Science: 65, English: 60 } },
  { id: 3, roll: "103", name: "Priya Singh", googleLink: "", marks: { Maths: 92, Science: 88, English: 91 } },
  { id: 4, roll: "104", name: "Suresh Patel", googleLink: "", marks: { Maths: 78, Science: 82, English: 85 } },
  { id: 5, roll: "105", name: "Neha Gupta", googleLink: "", marks: { Maths: 70, Science: 65, English: 60 } },
  { id: 6, roll: "106", name: "Priya Singh", googleLink: "", marks: { Maths: 92, Science: 88, English: 91 } },
  { id: 7, roll: "107", name: "Rahul Sharma", googleLink: "", marks: { Maths: 85, Science: 80, English: 75 } },
  { id: 8, roll: "108", name: "Aman Verma", googleLink: "", marks: { Maths: 70, Science: 65, English: 60 } },
  { id: 9, roll: "109", name: "Priya Singh", googleLink: "", marks: { Maths: 92, Science: 88, English: 91 } },
  { id: 10, roll: "110", name: "Rahul Sharma", googleLink: "", marks: { Maths: 85, Science: 80, English: 75 } },
  { id: 11, roll: "111", name: "Aman Verma", googleLink: "", marks: { Maths: 70, Science: 65, English: 60 } },
  { id: 12, roll: "112", name: "Priya Singh", googleLink: "", marks: { Maths: 92, Science: 88, English: 91 } },
];

export const rollInputId = "marks-roll-input";
export const nameInputId = "marks-name-input";
export const subjectInputId = "marks-subject-input";

export const totalMarks = (marks) =>
  Object.values(marks).reduce((a, b) => a + b, 0);

export const percentage = (marks, subjects) => {
  const total = totalMarks(marks);
  const max = subjects.length * 100;
  return ((total / max) * 100).toFixed(1);
};

export const grade = (p) => {
  if (p >= 90) return "A+";
  if (p >= 80) return "A";
  if (p >= 70) return "B";
  if (p >= 60) return "C";
  if (p >= 50) return "D";
  return "F";
};
