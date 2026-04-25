import { useAuth } from "../../auth/context/AuthContext";

const ParentProfile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
          Parent Profile
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          {user?.name || "Parent"}
        </h1>
        <p className="mt-2 text-slate-600">{user?.email || "No email available"}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-100 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Role</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {user?.role || "parent"}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              Logged in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentProfile;
