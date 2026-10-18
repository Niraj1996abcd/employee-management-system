import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useCreateEmployeeMutation } from "../features/employees/employeeApi";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
    salary: "",
    status: "ACTIVE",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    try {
      await createEmployee({
        ...formData,
        salary: Number(formData.salary),
        status: formData.status as "ACTIVE" | "INACTIVE",
      }).unwrap();

      setSuccessMessage("Employee added successfully.");

      setTimeout(() => {
        navigate("/employees");
      }, 1000);
    } catch (error: any) {
      const message =
        error?.data?.message || "Failed to add employee. Please try again.";

      setErrorMessage(message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Add Employee</h1>

        <p className="mt-1 text-sm text-gray-500">
          Add a new employee to the system.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border bg-white p-5 shadow-sm"
      >
        {errorMessage && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-sm font-medium text-red-700">{errorMessage}</p>
          </div>
        )}
        {successMessage && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 p-3">
            <p className="text-sm font-medium text-green-700">
              {successMessage}
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Employee ID */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Employee ID
            </label>

            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="EMP001"
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="employee@example.com"
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Department */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Department
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Designation
            </label>

            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Software Engineer"
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Joining Date */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Joining Date
            </label>

            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Salary
            </label>

            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="60000"
              min="0"
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="rounded border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="rounded bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
