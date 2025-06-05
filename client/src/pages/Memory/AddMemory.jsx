/* eslint-disable no-unused-vars */
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdAddCircleOutline, MdUpdate } from "react-icons/md";
import DateSelection from "./DateSelection";
import ImageSelect from "./ImageSelect";
import TagInput from "./TagInput";


const AddMemory = ({ storyInfo, type, onClose, getAllTravelStories }) => {
  const [visitedDate, setVisitedDate] = useState(null);

  const [title, setTitle] = useState(null);
  const [storyImage, setStoryImage] = useState(null);
  const [story, setStory] = useState("");
  const [visitedLocation, setVisitedDateLocation] = useState([]);

  console.log("coming form ", title);

  const handleAddOrUpdateClick = () => {
    if (type === "add") {
      console.log("Adding story:", storyInfo);
      // TODO: Call API or handle add logic here
    } else if (type === "edit") {
      console.log("Updating story:", storyInfo);
      // TODO: Call API or handle update logic here
    }
  };

  const handleDeleteStoryImage = async () => {};
  return (
    <div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-800">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>
        <div>
          <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-lg rounded-lg shadow-md border border-white/20">
            {type === "add" ? (
              <button
                className="flex items-center gap-2 px-4 py-2 text-white bg-cyan-500 hover:bg-cyan-600 rounded-full transition-all duration-300 shadow-sm"
                onClick={handleAddOrUpdateClick}
              >
                <MdAddCircleOutline className="text-xl" />
                <span className="text-sm font-medium">Add Story</span>
              </button>
            ) : (
              <>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-white bg-cyan-500 hover:bg-cyan-600 rounded-full transition-all duration-300 shadow-sm"
                  onClick={handleAddOrUpdateClick}
                >
                  <MdUpdate className="text-xl" />
                  <span className="text-sm font-medium">Update Story</span>
                </button>
              </>
            )}
            <button
              className="flex items-center justify-center w-10 h-10 text-white bg-red-500 hover:bg-red-600 rounded-full transition-all duration-300 shadow-sm"
              onClick={onClose}
              title="Close"
            >
              <IoMdCloseCircleOutline className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex-1 flex flex-col gap-2 pt-4">
          <label className="text-xs text-slate-500">TITLE</label>
          <input
            className="text-2xl text-slate-800 outline-none"
            placeholder="A Day in the Sea Beatch"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="my-3">
            <DateSelection date={visitedDate} setDate={setVisitedDate} />
          </div>
          <ImageSelect
            image={storyImage}
            setImage={setStoryImage}
            handleDeleteImage={handleDeleteStoryImage}
          />
          <div className="flex flex-col gap-2 mt-4">
            <label className="">STORY</label>
            <textarea
              type="text"
              className="text-sm text-slate-900 outline-none bg-slate-50 p-2 rounded"
              placeholder="Your Story"
              rows={10}
              value={story}
              onChange={(e) => setStory(e.target.value)}
            />
          </div>
          <div className="pt-3">
            <label className="text-xs text-slate-500">VISITED LOCATION</label>
            <TagInput tag={visitedLocation} setTag={setVisitedDateLocation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemory;
