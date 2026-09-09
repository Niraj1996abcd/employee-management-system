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

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;