import { useState } from "react";
import type { FormEvent } from "react";
import { useGetEmployeesQuery } from "../features/employees/employeeApi";
import EmployeeTable from "../components/employees/EmployeeTable";
const Employees = () => {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [status, setStatus] = useState<"" | "ACTIVE" | "INACTIVE">("");
  const [department, setDepartment] = useState("");
  const [sortBy, setSortBy] = useState<
    "" | "firstName" | "joiningDate" | "salary"
  >("");

  const [sortOrder, setSortOrder] = useState<"" | "asc" | "desc">("");
  const { data, isLoading, isError } = useGetEmployeesQuery({
    page,
    limit,
    search,
    status: status || undefined,
    department: department || undefined,
    sortBy: sortBy || undefined,
    sortOrder: sortOrder || undefined,
  });
  const employees = data?.data ?? [];
  const pagination = data?.pagination;
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  };
  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setStatus("");
    setDepartment("");
    setSortBy("");
    setSortOrder("");
    setPage(1);
  };
  if (isLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        {" "}
        <p className="text-sm text-gray-500"> Loading employees... </p>{" "}
      </div>
    );
  }
  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5">
        {" "}
        <h2 className="font-semibold text-red-700">
          {" "}
          Failed to load employees{" "}
        </h2>{" "}
        <p className="mt-1 text-sm text-red-600">
          {" "}
          Unable to load employee information.{" "}
        </p>{" "}
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {" "}
      {/* Page heading */}{" "}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        {" "}
        <div>
          {" "}
          <h1 className="text-2xl font-bold text-gray-800"> Employees </h1>{" "}
          <p className="mt-1 text-sm text-gray-500">
            {" "}
            Manage your employees.{" "}
          </p>{" "}
        </div>{" "}
        <button
          type="button"
          disabled
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white opacity-50"
        >
          {" "}
          Add Employee{" "}
        </button>{" "}
      </div>{" "}
      {/* Search */}{" "}
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm sm:flex-row"
      >
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name, email or employee ID"
          className="flex-1 rounded border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as "" | "ACTIVE" | "INACTIVE");
            setPage(1);
          }}
          className="rounded border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
        <select
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            setPage(1);
          }}
          className="rounded border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => {
            const value = e.target.value as
              | ""
              | "firstName"
              | "joiningDate"
              | "salary";

            setSortBy(value);
            setPage(1);

            if (!value) {
              setSortOrder("");
            }
          }}
          className="rounded border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Sort By</option>
          <option value="firstName">Name</option>
          <option value="joiningDate">Joining Date</option>
          <option value="salary">Salary</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value as "" | "asc" | "desc");
            setPage(1);
          }}
          disabled={!sortBy}
          className="rounded border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
        >
          <option value="">Order</option>
          <option value="asc">
            {sortBy === "salary"
              ? "Low to High"
              : sortBy === "joiningDate"
                ? "Oldest First"
                : "A to Z"}
          </option>

          <option value="desc">
            {sortBy === "salary"
              ? "High to Low"
              : sortBy === "joiningDate"
                ? "Newest First"
                : "Z to A"}
          </option>
        </select>
        <button
          type="submit"
          className="rounded bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Search
        </button>

        {search && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="rounded border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Clear
          </button>
        )}
      </form>
      {/* Search result information */}{" "}
      {search && (
        <p className="text-sm text-gray-500">
          {" "}
          Search results for:{" "}
          <span className="font-medium text-gray-800"> "{search}" </span>{" "}
        </p>
      )}{" "}
      {/* Empty state */}{" "}
      {employees.length === 0 ? (
        <div className="rounded-lg border bg-white p-10 text-center shadow-sm">
          {" "}
          <h2 className="text-lg font-semibold text-gray-800">
            {" "}
            No employees found{" "}
          </h2>{" "}
          <p className="mt-1 text-sm text-gray-500">
            {" "}
            {search
              ? "Try a different search term."
              : "There are no employees to display."}{" "}
          </p>{" "}
        </div>
      ) : (
        <>
          <EmployeeTable employees={employees} />
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between rounded-lg border bg-white px-4 py-3 shadow-sm">
              <p className="text-sm text-gray-500">
                Page{" "}
                <span className="font-medium text-gray-800">
                  {pagination.page}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-800">
                  {pagination.totalPages}
                </span>
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={page === pagination.totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}{" "}
    </div>
  );
};
export default Employees;
