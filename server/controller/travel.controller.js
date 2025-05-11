import fs from "fs";
import path from "path";
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

export const deleteTravelImage = async (req, res) => {
  const { imageUrl } = req.query;
  try {
    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "No image url provided",
      });
    }
    const fileName = path.basename(imageUrl);
    const filePath = path.join(path.resolve(), "uploads", fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.status(200).json({
        success: true,
        message: "Image deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const editTravelStory = async (req, res) => {
  const { id } = req.params;

  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
  const userId = req.userId;

  if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const parseVisitedDate = new Date(parseInt(visitedDate));
  try {
    const travelStory = await TravelStory.findOne({
      _id: id,
      userId,
    });
    if (!travelStory) {
      return res.status(404).json({
        success: false,
        message: "Travel story not found",
      });
    }
    const placeHolderImageUrl = `http://localhost:4000/assets/placeholder.png`;
    travelStory.title = title;
    travelStory.story = story;
    travelStory.visitedLocation = visitedLocation;
    travelStory.imageUrl = imageUrl || placeHolderImageUrl;
    travelStory.visitedDate = parseVisitedDate;
    await travelStory.save();

    return res.status(200).json({
      success: true,
      message: "Travel story updated successfully",
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

export const deleteOneTravelStory = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "No travel story id provided",
      });
    }
    const travelStory = await TravelStory.findOne({
      _id: id,
      userId,
    });
    if (!travelStory) {
      return res.status(404).json({
        success: false,
        message: "Travel story not found",
      });
    }
    await travelStory.deleteOne();
    // * extracting image name from imageUrl
    const imageUrl = travelStory.imageUrl;
    const fileName = path.basename(imageUrl);
    const filePath = path.join(path.resolve(), "uploads", fileName);
    // *delete the image file from uploads folder
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
    return res.status(200).json({
      success: true,
      message: "Travel story and associated image deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateFavoriteTravelStory = async (req, res) => {
  const { id } = req.params;
  const { isFavourite } = req.body;
  const userId = req.userId;
  try {
    const travelStory = await TravelStory.findOne({
      _id: id,
      userId,
    });
    if (!travelStory) {
      return res.status(404).json({
        success: false,
        message: "Travel story not found",
      });
    }
    travelStory.isFavourite = isFavourite;
    await travelStory.save();
    return res.status(200).json({
      success: true,
      message: "Travel story updated successfully",
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

export const searchTravelStory = async (req, res) => {
  const { query } = req.query;
  const userId = req.userId;
  if (!query) {
    return res.status(400).json({
      success: false,
      message: "No query provided",
    });
  }
  try {
    const travelStories = await TravelStory.find({
      userId,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { story: { $regex: query, $options: "i" } },
        { visitedLocation: { $regex: query, $options: "i" } },
      ],
    }).sort({ isFavourite: -1 });
    if (!travelStories || travelStories.length === 0) {
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

export const filterTravelStory = async (req, res) => {
  const { startDate, endDate } = req.query;
  const userId = req.userId;
  try {
    const start = new Date(parseInt(startDate));
    const end = new Date(parseInt(endDate));

    const filteredTravelStories = await TravelStory.find({
      userId,
      visitedDate: { $gte: start, $lte: end },
    }).sort({ isFavourite: -1 });
    if (!filteredTravelStories || filteredTravelStories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No travel stories found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Travel stories fetched successfully",
      stories: filteredTravelStories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
