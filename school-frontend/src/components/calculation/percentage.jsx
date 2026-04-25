export const getPercentage = (studentId, attendanceData) => {

  let totalDays = 0;
  let presentDays = 0;

  Object.values(attendanceData).forEach((day) => {

    if (day[studentId]) {
      totalDays++;

      if (day[studentId] === "Present") presentDays++;
    }

  });

  if (totalDays === 0) return 0;

  return Math.round((presentDays / totalDays) * 100);
};