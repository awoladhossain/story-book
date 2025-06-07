import express from "express";
import {
  addTravelStory,
  deleteOneTravelStory,
  deleteTravelImage,
  editTravelStory,
  filterTravelStory,
  getAllTravelStories,
  searchTravelStory,
  updateFavoriteTravelStory,
  uploadTravelImage,
} from "../controller/travel.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../utils/multer.js";
const router = express.Router();

// *Add travel stroy
router.post("/add-travel-story", verifyToken, addTravelStory);
router.get("/get-all-stories", verifyToken, getAllTravelStories);
router.post(
  "/image-upload",
  verifyToken,
  upload.single("image"),
  uploadTravelImage
);
router.delete("/delete-image", verifyToken, deleteTravelImage);
router.put("/edit-story/:id", verifyToken, editTravelStory);
router.delete("/delete-story/:id", verifyToken, deleteOneTravelStory);
router.put("/update-favorite/:id", verifyToken, updateFavoriteTravelStory);
router.get("/search-story", verifyToken, searchTravelStory);
router.get("/travel-story/filter", verifyToken, filterTravelStory);

export default router;
