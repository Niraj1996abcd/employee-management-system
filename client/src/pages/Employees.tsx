import { useGetEmployeesQuery } from "../features/employees/employeeApi";
import EmployeeTable from "../components/employees/EmployeeTable";

const Employees = () => {
  const { data, isLoading, isError } = useGetEmployeesQuery();

  const employees = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-gray-500">Loading employees...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5">
        <h2 className="font-semibold text-red-700">Failed to load employees</h2>

        <p className="mt-1 text-sm text-red-600">
          Unable to load employee information.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Employees</h1>

          <p className="mt-1 text-sm text-gray-500">Manage your employees.</p>
        </div>

        <button
          type="button"
          disabled
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white opacity-50"
        >
          Add Employee
        </button>
      </div>

      {/* Empty state */}
      {employees.length === 0 ? (
        <div className="rounded-lg border bg-white p-10 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">
            No employees found
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            There are no employees to display.
          </p>
        </div>
      ) : (
        <EmployeeTable employees={employees} />
      )}
    </div>
  );
};

export default Employees;
