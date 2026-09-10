import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetEmployeeByIdQuery } from "../features/employees/employeeApi";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data,
    isLoading,
    isError,
  } = useGetEmployeeByIdQuery(id!, {
    skip: !id,
  });

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

  useEffect(() => {
    if (data?.data) {
      const employee = data.data;

      setFormData({
        employeeId: employee.employeeId,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        designation: employee.designation,
        joiningDate: employee.joiningDate
          ? employee.joiningDate.split("T")[0]
          : "",
        salary: String(employee.salary),
        status: employee.status,
      });
    }
  }, [data]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Edit employee data:", formData);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading employee...
        </p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5">
        <h2 className="font-semibold text-red-700">
          Failed to load employee
        </h2>

        <p className="mt-1 text-sm text-red-600">
          Employee information could not be loaded.
        </p>

        <button
          type="button"
          onClick={() => navigate("/employees")}
          className="mt-4 rounded bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Edit Employee
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Update employee information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg border bg-white p-6 shadow-sm"
      >
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
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500"
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
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500"
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
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500"
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
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500"
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
              className="w-full rounded border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
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
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500"
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
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500"
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
              required
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500"
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
              className="w-full rounded border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 border-t pt-5">
          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;