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
  department?: string;
  sortBy?: "firstName" | "joiningDate" | "salary";
  sortOrder?: "asc" | "desc";
}
export interface CreateEmployeeRequest {
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
export interface UpdateEmployeeRequest {
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
          department: params?.department || undefined,
          sortBy: params?.sortBy || undefined,
          sortOrder: params?.sortOrder || undefined,
        },
      }),
    }),
    updateEmployee: builder.mutation<
      {
        success: boolean;
        message: string;
        data: Employee;
      },
      {
        id: string;
        body: UpdateEmployeeRequest;
      }
    >({
      query: ({ id, body }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body,
      }),
    }),
    getEmployeeById: builder.query<
      {
        success: boolean;
        message: string;
        data: Employee;
      },
      string
    >({
      query: (id) => `/employees/${id}`,
    }),
    // ----------------------
    createEmployee: builder.mutation<
      {
        success: boolean;
        message: string;
        data: Employee;
      },
      CreateEmployeeRequest
    >({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} = employeeApi;
