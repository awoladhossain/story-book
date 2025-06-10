import moment from "moment";
import { FaMapPin } from "react-icons/fa";
import { MdClose, MdDelete, MdUpdate } from "react-icons/md";
const ViewStory = ({ onClose, onEditClick, onDeleteClick, storyInfo }) => {
  return (
    <div className="relative p-6 max-w-3xl mx-auto">
      {/* Action Buttons */}
      <div className="flex flex-wrap justify-end gap-3 mb-4">
        <button
          onClick={onEditClick}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 border border-blue-300 text-blue-800 rounded-full transition duration-200"
        >
          <MdUpdate className="text-lg" />
          Update Story
        </button>

        <button
          onClick={onDeleteClick}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-red-100 hover:bg-red-200 border border-red-300 text-red-700 rounded-full transition duration-200"
        >
          <MdDelete className="text-lg" />
          Delete Story
        </button>

        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-full transition duration-200"
        >
          <MdClose className="text-lg" />
          Close
        </button>
      </div>

      {/* Story Content */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <img
          src={storyInfo?.imageUrl}
          alt="Story Visual"
          className="w-full h-64 object-cover"
        />

        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {storyInfo?.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-500">
            <span>{moment(storyInfo?.visitedDate).format("Do MMM YYYY")}</span>
            <div className="inline-flex items-center gap-1">
              <FaMapPin className="text-base text-red-500" />
              <span>{storyInfo?.visitedLocation?.join(", ")}</span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{storyInfo?.story}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewStory;
