import { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Table({
  columns = [],
  data = [],
  actions,
  cellRenderers = {},
  showSearch = true,
  searchPlaceholder = "Search records...",
  searchValue,
  onSearchChange,
  showPagination = true,
  rowsPerPage = 5,
  title = "Table records",
  subtitle,
  emptyTitle = "No records found",
  emptyDescription = "Try a different search term or clear the filter to see all rows.",
  className = "",
  tableWrapperClassName = "",
  tableClassName = "",
}) {

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const isSearchControlled = typeof searchValue !== "undefined" && typeof onSearchChange === "function";
  const activeSearch = isSearchControlled ? searchValue : search;

  const normalizedColumns = useMemo(
    () =>
      columns.map((column) =>
        typeof column === "string" ? { key: column, label: column } : column
      ),
    [columns]
  );

  const filteredData = useMemo(() => {
    const query = activeSearch.trim().toLowerCase();

    if (!query) return data;

    return data.filter((row) =>
      normalizedColumns.some((col) => {
        if (col.searchable === false) return false;
        const value = row[col.searchKey ?? col.key];
        return String(value ?? "").toLowerCase().includes(query);
      })
    );
  }, [data, normalizedColumns, activeSearch]);

  const handleSearchChange = (value) => {
    if (isSearchControlled) {
      onSearchChange(value);
    } else {
      setSearch(value);
    }
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));

  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(start, start + rowsPerPage);
  const showingStart = filteredData.length === 0 ? 0 : start + 1;
  const showingEnd = Math.min(start + rowsPerPage, filteredData.length);
  const hasData = paginatedData.length > 0;
  const visibleRows = showPagination ? paginatedData : filteredData;

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>
      <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {title}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {subtitle ?? `Showing ${filteredData.length} record${filteredData.length === 1 ? "" : "s"}`}
            </p>
          </div>

          {showSearch && (
            <div className="relative w-full sm:max-w-sm">
              <FaSearch
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={14}
              />
              <input
                type="search"
                value={activeSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          )}
        </div>
      </div>

      <div className={`overflow-x-auto ${tableWrapperClassName}`}>
        <table className={`min-w-full border-separate border-spacing-0 ${tableClassName}`}>
          <thead className="sticky top-0 z-10 bg-slate-50">
            <tr>
              <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                S.N.
              </th>
              {normalizedColumns.map((col) => (
                <th
                  key={col.key}
                  className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {col.headerRender ? col.headerRender(col) : col.label ?? col.key}
                </th>
              ))}
              {actions && (
                <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {hasData ? (
              visibleRows.map((row, index) => (
                <tr key={row._id ?? row.id ?? index} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                    {showPagination ? start + index + 1 : index + 1}
                  </td>
                  {normalizedColumns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm text-slate-700">
                      {cellRenderers[col.key]
                        ? cellRenderers[col.key](row, index)
                        : col.render
                        ? col.render(row, index)
                        : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-4 py-14 text-center text-sm text-slate-500"
                  colSpan={normalizedColumns.length + 1 + (actions ? 1 : 0)}
                >
                  <div className="mx-auto max-w-sm">
                    <p className="font-medium text-slate-700">{emptyTitle}</p>
                    <p className="mt-1 text-sm text-slate-500">{emptyDescription}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPagination && (
      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-sm text-slate-500">
          {filteredData.length === 0
            ? "No rows to display"
            : `Showing ${showingStart} to ${showingEnd} of ${filteredData.length}`}
        </p>

        <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              type="button"
              key={i}
              className={`min-w-[2.5rem] rounded-xl px-3 py-2 text-sm font-medium transition ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            type="button"
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
          >
            Next
          </button>
        </div>
      </div>
      )}
    </div>
  );
}
