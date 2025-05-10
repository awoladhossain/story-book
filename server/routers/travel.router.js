import express from "express";
import {
  addTravelStory,
  deleteTravelImage,
  editTravelStory,
  getAllTravelStories,
  uploadTravelImage,
} from "../controller/travel.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../utils/multer.js";
const router = express.Router();

// *Add travel stroy
router.post("/add-travel-story", verifyToken, addTravelStory);
router.get("/get-all-stories", verifyToken, getAllTravelStories);
router.post("/image-upload", upload.single("image"), uploadTravelImage);
router.delete("/delete-image",verifyToken,deleteTravelImage);
router.post("/edit-story/:id", editTravelStory);

export default router;
