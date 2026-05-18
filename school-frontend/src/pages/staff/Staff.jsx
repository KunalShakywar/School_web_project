import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { LiaUserTieSolid } from "react-icons/lia";
import { FaIdCard, FaSearch, FaUsers } from "react-icons/fa";

import Table from "../../components/table/Table";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function normalizeStaff(item = {}) {
  return {
    id: item._id || item.id,
    name: item.name || item.userId?.name || "Unknown Staff",
    role: item.role || item.subject || "Staff",
    qualification: item.qualification || "-",
    department: item.department || item.role || item.className || "-",
    email: item.email || item.userId?.email || "-",
    phone: item.phone || "-",
    photo: item.photo || item.avatar || item.userId?.photo || "https://via.placeholder.com/120?text=Staff",
  };
}

function StaffCard({ staff }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-4">
        <img
          src={staff.photo}
          alt={staff.name}
          className="h-16 w-16 rounded-2xl border border-slate-200 object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-slate-900">
                {staff.name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{staff.role}</p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Staff
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <FaIdCard className="shrink-0 text-slate-400" />
              <span className="font-medium text-slate-500">Dpt:</span>
              <span className="" >{staff.department}</span>
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="py-1 text-sm text-blue-600">Tap to view details</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function StaffDetailsModal({ staff, onClose }) {
  if (!staff) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[calc(100dvh-3rem)] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <img
            src={staff.photo}
            alt={staff.name}
            className="h-16 w-16 rounded-2xl border border-slate-200 object-cover"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-slate-900">
                  {staff.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{staff.role}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <span className="mt-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Staff
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-3 text-sm text-slate-700">
          <p className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <span className="font-medium text-slate-500">Department</span>
            <span className="text-right">{staff.department}</span>
          </p>
          <p className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <span className="font-medium text-slate-500">Phone</span>
            <span className="text-right">{staff.phone}</span>
          </p>
          <p className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <span className="font-medium text-slate-500">Email</span>
            <span className="break-all text-right">{staff.email}</span>
          </p>
          <p className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <span className="font-medium text-slate-500">Qualification</span>
            <span className="text-right">{staff.qualification}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function StaffTable() {
  const [search, setSearch] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadStaff = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${API_BASE_URL}/api/staff`);
        if (cancelled) return;

        const records = Array.isArray(response.data?.data) ? response.data.data : [];
        setStaff(records.map(normalizeStaff));
        setFetchError("");
      } catch (error) {
        if (cancelled) return;
        setStaff([]);
        setFetchError("Unable to load staff records right now.");
      }
      finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadStaff();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredStaff = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return staff;

    return staff.filter((item) => {
      const fields = [
        item.name,
        item.role,
        item.department,
        item.qualification,
        item.email,
        item.phone,
      ];

      return fields.some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      );
    });
  }, [search, staff]);

  const columns = [
    {
      key: "photo",
      label: "Photo",
      render: (item) => (
        <img
          src={item.photo}
          alt={item.name}
          className="mx-auto h-12 w-12 rounded-full border border-slate-200 object-cover"
        />
      ),
    },
    {
      key: "name",
      label: "Name",
      render: (item) => (
        <div>
          <p className="font-semibold text-slate-900">{item.name}</p>
          <p className="text-xs text-slate-500">{item.role}</p>
        </div>
      ),
    },
    { key: "department", label: "Department" },
    { key: "qualification", label: "Qualification" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
  ];

  return (
    <div className="min-h-screen  px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white px-5 py-5 shadow-sm sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <LiaUserTieSolid size={24} />
                </span>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Staff Management
                  </h1>

                </div>
              </div>
            </div>

            <div className="relative w-full lg:max-w-md">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search staff by name, department, email..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
              <FaUsers className="text-slate-500" />
              {loading ? "Loading staff..." : fetchError || `${filteredStaff.length} staff`}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-base font-semibold text-slate-900">Loading staff records...</p>
            <p className="mt-2 text-sm text-slate-500">
              Please wait while we fetch live data from the backend.
            </p>
          </div>
        ) : fetchError ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
            <p className="text-base font-semibold text-red-700">{fetchError}</p>
            <p className="mt-2 text-sm text-red-600">
              Make sure the backend is running and the staff or teacher API is available.
            </p>
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-base font-semibold text-slate-900">No staff found</p>
            <p className="mt-2 text-sm text-slate-500">
              Try a different search term.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:hidden">
              {filteredStaff.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedStaff(item)}
                  className="text-left"
                >
                  <StaffCard staff={item} />
                </button>
              ))}
            </div>

            <div className="hidden md:block">
              <Table
                title="Staff List"
                subtitle={`Showing ${filteredStaff.length} record${
                  filteredStaff.length === 1 ? "" : "s"
                }`}
                showSearch={false}
                showPagination={false}
                data={filteredStaff}
                columns={columns}
              />
            </div>
          </>
        )}
        {selectedStaff && (
          <StaffDetailsModal
            staff={selectedStaff}
            onClose={() => setSelectedStaff(null)}
          />
        )}
      </div>
    </div>
  );
}

export default StaffTable;
