import { apiSlice } from "../../store/api/apiSlice";

export interface Employee {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  salary: number;
  status: "ACTIVE" | "INACTIVE";
}

export interface EmployeeQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "ACTIVE" | "INACTIVE";
}

interface EmployeeResponse {
  success: boolean;
  message: string;
  data: Employee[];
  pagination: {
    page: number;
    limit: number;
    totalEmployees: number;
    totalPages: number;
  };
}

export const employeeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeeResponse, EmployeeQueryParams | void>({
      query: (params) => ({
        url: "/employees",
        params: {
          page: params?.page,
          limit: params?.limit,
          search: params?.search || undefined,
          status: params?.status || undefined,
        },
      }),
    }),
  }),
});

export const { useGetEmployeesQuery } = employeeApi;
