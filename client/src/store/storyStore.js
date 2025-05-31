import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:4000/api/travel";

export const storyStore = create((set) => ({
  story: [],
  isLoading: false,
  error: false,
  isCheckingAuth: false,
  isAuthenticated: false,
  message: null,

  getStory: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      console.log("Checking  the get all story....");
      const response = await axios.get(`${API_URL}/get-all-stories`, {
        withCredentials: true,
      });
      console.log("get all story data: ", response.data);
      set({
        story: response.data.stories,
        isAuthenticated: true,
        isCheckingAuth: false,
        message: response.data.message,
      });
    } catch (error) {
      console.log("error from getAll story", error);
      set({ error: true, isCheckingAuth: false });
    }
  },
}));
