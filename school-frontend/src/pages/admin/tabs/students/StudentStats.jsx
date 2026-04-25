import { FaMoneyBillWave, FaUsers } from "react-icons/fa";

function StatCard({ title, value, icon: Icon, bgClass, textClass }) {
  return (
    <div className="bg-blue-100 dark:bg-gray-800 p-4 rounded-t-lg">
      <p className={`font-semibold flex items-center gap-2 ${bgClass} w-fit text-white px-2 py-1 rounded`}>
        <Icon /> {title}
      </p>
      <p className={`text-xl mt-2 ${textClass}`}>{value}</p>
    </div>
  );
}

function StudentStats({ totalStudents, totalPaid, totalRemaining }) {
  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Students"
        value={totalStudents}
        icon={FaUsers}
        bgClass="bg-blue-600"
        textClass="text-blue-700"
      />
      <StatCard
        title="Paid Fees"
        value={totalPaid}
        icon={FaMoneyBillWave}
        bgClass="bg-green-600"
        textClass="text-green-700"
      />
      <StatCard
        title="Remaining Fees"
        value={totalRemaining}
        icon={FaMoneyBillWave}
        bgClass="bg-red-600"
        textClass="text-red-700"
      />
    </div>
  );
}

export default StudentStats;
