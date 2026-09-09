import { useGetEmployeesQuery } from "../features/employees/employeeApi";

const Employees = () => {
  const { data, isLoading, isError } = useGetEmployeesQuery();

  if (isLoading) {
    return <div>Loading employees...</div>;
  }

  if (isError) {
    return <div>Failed to load employees</div>;
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        Employees
      </h1>

      <pre className="rounded bg-gray-900 p-4 text-sm text-white">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default Employees;