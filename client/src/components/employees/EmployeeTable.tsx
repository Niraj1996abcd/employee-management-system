import type { Employee } from "../../features/employees/employeeApi";
import { useNavigate } from "react-router-dom";
interface EmployeeTableProps {
  employees: Employee[];
}
const EmployeeTable = ({ employees }: EmployeeTableProps) => {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      {" "}
      <div className="overflow-x-auto">
        {" "}
        <table className="min-w-full text-left text-sm">
          {" "}
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            {" "}
            <tr>
              {" "}
              <th className="px-4 py-3 font-semibold"> Employee ID </th>{" "}
              <th className="px-4 py-3 font-semibold"> Name </th>{" "}
              <th className="px-4 py-3 font-semibold"> Email </th>{" "}
              <th className="px-4 py-3 font-semibold"> Phone </th>{" "}
              <th className="px-4 py-3 font-semibold"> Department </th>{" "}
              <th className="px-4 py-3 font-semibold"> Designation </th>{" "}
              <th className="px-4 py-3 font-semibold"> Joining Date </th>{" "}
              <th className="px-4 py-3 font-semibold"> Salary </th>{" "}
              <th className="px-4 py-3 font-semibold"> Status </th>{" "}
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>{" "}
          </thead>{" "}
          <tbody className="divide-y">
            {" "}
            {employees.map((employee) => (
              <tr key={employee._id} className="hover:bg-gray-50">
                {" "}
                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-800">
                  {" "}
                  {employee.employeeId}{" "}
                </td>{" "}
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {" "}
                  {employee.firstName} {employee.lastName}{" "}
                </td>{" "}
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {" "}
                  {employee.email}{" "}
                </td>{" "}
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {" "}
                  {employee.phone}{" "}
                </td>{" "}
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {" "}
                  {employee.department}{" "}
                </td>{" "}
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {" "}
                  {employee.designation}{" "}
                </td>{" "}
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {" "}
                  {new Date(employee.joiningDate).toLocaleDateString()}{" "}
                </td>{" "}
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {" "}
                  ₹{employee.salary.toLocaleString("en-IN")}{" "}
                </td>{" "}
                <td className="whitespace-nowrap px-4 py-3">
                  {" "}
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${employee.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {" "}
                    {employee.status}{" "}
                  </span>{" "}
                </td>{" "}
                <td className="whitespace-nowrap px-4 py-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/employees/edit/${employee._id}`)}
                    className="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
    </div>
  );
};
export default EmployeeTable;
