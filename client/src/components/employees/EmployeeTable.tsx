import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Employee } from "../../features/employees/employeeApi";

import { useDeleteEmployeeMutation } from "../../features/employees/employeeApi";
import { getUser } from "../../utils/authUtils";
interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable = ({ employees }: EmployeeTableProps) => {
  const navigate = useNavigate();
  const user = getUser();
  const [deleteEmployee, { isLoading: isDeleting }] =
    useDeleteEmployeeMutation();

  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmed) {
      return;
    }

    setErrorMessage("");

    try {
      await deleteEmployee(id).unwrap();
    } catch (error: any) {
      const message =
        error?.data?.message || "Failed to delete employee. Please try again.";

      setErrorMessage(message);
    }
  };

  return (
    <div>
      {errorMessage && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">{errorMessage}</p>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Employee ID</th>

                <th className="px-4 py-3 font-semibold">Name</th>

                <th className="px-4 py-3 font-semibold">Email</th>

                <th className="px-4 py-3 font-semibold">Phone</th>

                <th className="px-4 py-3 font-semibold">Department</th>

                <th className="px-4 py-3 font-semibold">Designation</th>

                <th className="px-4 py-3 font-semibold">Joining Date</th>

                <th className="px-4 py-3 font-semibold">Salary</th>

                <th className="px-4 py-3 font-semibold">Status</th>

                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {employees.map((employee) => (
                <tr key={employee._id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-800">
                    {employee.employeeId}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {employee.firstName} {employee.lastName}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {employee.email}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {employee.phone}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {employee.department}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {employee.designation}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {new Date(employee.joiningDate).toLocaleDateString()}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    ₹{employee.salary.toLocaleString("en-IN")}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        employee.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex gap-2">
                      {(user?.role === "ADMIN" || user?.role === "HR") && (
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/employees/edit/${employee._id}`)
                          }
                          disabled={isDeleting}
                          className="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Edit
                        </button>
                      )}

                      {user?.role === "ADMIN" && (
                        <button
                          type="button"
                          onClick={() => handleDelete(employee._id)}
                          disabled={isDeleting}
                          className="rounded bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
