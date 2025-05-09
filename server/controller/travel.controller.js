import TravelStory from "../models/travelStory.model.js";

export const addTravelStory = async (req, res) => {
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
  const userId = req.userId;
  if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  // * converting visitedDate to date
  const parseVisitedDate = new Date(parseInt(visitedDate));
  try {
    const travelStory = await TravelStory({
      title,
      story,
      visitedLocation,
      imageUrl,
      visitedDate: parseVisitedDate,
      userId,
    });
    await travelStory.save();
    return res.status(201).json({
      success: true,
      message: "Travel story added successfully",
      travelStory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllTravelStories = async (req, res) => {
  const userId = req.userId;
  try {
    const travelStories = await TravelStory.find({ userId }).sort({
      isFavorite: -1,
    });
    if (!travelStories) {
      return res.status(404).json({
        success: false,
        message: "No travel stories found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Travel stories fetched successfully",
      stories: travelStories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const uploadTravelImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    const imageUrl = `http://localhost:4000/uploads/${file.filename}`;
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
