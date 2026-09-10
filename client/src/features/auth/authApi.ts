import { apiSlice } from "../../store/api/apiSlice";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "HR" | "EMPLOYEE";
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: LoginUser;
  };
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "HR" | "EMPLOYEE";
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "HR" | "EMPLOYEE";
  };
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation<
      RegisterResponse,
      RegisterRequest
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = authApi;