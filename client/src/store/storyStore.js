import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:4000/api/travel";

export const storyStore = create((set) => ({
  story: [],
  error: false,
  isCheckingAuth: false,
  isAuthenticated: false,
  message: null,
  isLoading: false,

  getStory: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get-all-stories`, {
        withCredentials: true,
      });

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
  favouriteStory: async (storyId) => {
    set({ isLoading: true, error: null });
    try {
      // Access state within the set callback
      set((state) => {
        const currentStory = state.story.find((s) => s._id === storyId);
        const currentIsFavourite = currentStory
          ? currentStory.isFavourite
          : false;
        const newIsFavourite = !currentIsFavourite;
        // Perform the API call
        axios
          .put(
            `${API_URL}/update-favorite/${storyId}`,
            { isFavourite: newIsFavourite },
            { withCredentials: true }
          )
          .then((response) => {
            console.log("Favorite toggle response:", response.data);
            set((state) => ({
              story: state.story.map((s) =>
                s._id === storyId
                  ? { ...s, isFavourite: response.data.travelStory.isFavourite }
                  : s
              ),
              isLoading: false,
              message: response.data.message,
            }));
          })
          .catch((error) => {
            console.error("Error toggling favorite:", error);
            set({
              error: true,
              isLoading: false,
              message:
                error.response?.data?.message ||
                "Failed to toggle favorite status",
            });
          });
        // Return current state to avoid unnecessary state update
        return state;
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      set({
        error: true,
        isLoading: false,
        message:
          error.response?.data?.message || "Failed to toggle favorite status",
      });
    }
  },
}));
