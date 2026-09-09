
import { Link } from "react-router-dom";

import StatCard from "../components/dashboard/StatCard";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Dashboard heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome to the Employee Management System.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Employees"
          value={25}
          description="All employees"
        />

        <StatCard
          title="Active Employees"
          value={22}
          description="Currently active"
        />

        <StatCard
          title="Inactive Employees"
          value={3}
          description="Currently inactive"
        />
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">
          Quick Actions
        </h2>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/employees"
            className="rounded bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
          >
            View Employees
          </Link>

          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded bg-gray-300 px-4 py-2 text-sm font-medium text-gray-600"
          >
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

