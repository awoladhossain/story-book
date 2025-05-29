import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = "http://localhost:4000/api/auth";

export const authStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,
      isCheckingAuth: false,
      message: null,

      signup: async (email, password, name) => {
        set({ isLoading: true, error: false });
        try {
          const response = await axios.post(`${API_URL}/signup`, {
            email,
            password,
            name,
          });
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Error signing up",
            isLoading: false,
          });
          return false;
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            `${API_URL}/login`,
            { email, password },
            { withCredentials: true }
          );
          console.log("Login response:", response.data);
          set({
            isAuthenticated: true,
            user: response.data.user,
            isLoading: false,
            error: null,
          });
          return true;
        } catch (error) {
          console.error("Login error:", error.response?.data || error.message);
          set({
            error: error.response?.data?.message || "Error logging in",
            isLoading: false,
            isAuthenticated: false,
            user: null,
          });
          return false;
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
          set({
            user: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,
          });
          return true;
        } catch (error) {
          console.log(error);
          set({
            error: "Error logging out",
            isLoading: false,
          });
          return false;
        }
      },

      verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/verify-email`, {
            verificationCode: code,
          });
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Error verifying email",
            isLoading: false,
          });
          throw error;
        }
      },

      checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
          console.log("Checking authentication status...");
          const response = await axios.get(`${API_URL}/check-auth`, {
            withCredentials: true,
          });
          console.log("Auth check response:", response.data);
          set({
            user: response.data.user,
            isAuthenticated: true,
            isCheckingAuth: false,
          });
          return true;
        } catch (error) {
          console.error("Auth check error:", {
            status: error.response?.status,
            message: error.response?.data?.message,
            error: error.message,
          });
          if (error.response?.status === 401) {
            set({
              isAuthenticated: false,
              user: null,
              isCheckingAuth: false,
              error: null,
            });
          } else {
            set({
              isCheckingAuth: false,
              error:
                error.response?.data?.message || "Authentication check failed",
              isAuthenticated: false,
              user: null,
            });
          }
          return false;
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/forgot-password`, {
            email,
          });
          set({ message: response.data.message, isLoading: false });
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error:
              error.response?.data?.message ||
              "Error sending reset password email",
          });
          return false;
        }
      },

      resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            `${API_URL}/reset-password/${token}`,
            {
              password,
            }
          );
          set({ message: response.data.message, isLoading: false });
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Error resetting password",
          });
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
