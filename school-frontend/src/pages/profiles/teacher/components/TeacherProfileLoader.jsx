const TeacherProfileLoader = ({ message = "Loading profile..." }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <p className="text-sm text-slate-400">{message}</p>
      </div>
    </div>
  );
};

export default TeacherProfileLoader;
