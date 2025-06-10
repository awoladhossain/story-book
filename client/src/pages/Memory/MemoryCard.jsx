/* eslint-disable no-unused-vars */
import moment from "moment";
import { BsFillPinMapFill } from "react-icons/bs";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const MemoryCard = ({
  imageUrl,
  title,
  story,
  isFavourite,
  visitedLocation,
  visitedDate,
  onClickStory,
  onFavouriteStory,
}) => {
  return (
    <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
        onClick={onClickStory}
      />
      <button
        onClick={onFavouriteStory}
        className="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full absolute top-4 right-4 transition-all duration-200"
        title="Add to Favourites"
      >
        {isFavourite ? (
          <FaHeart className="text-[22px] text-red-500" />
        ) : (
          <FaRegHeart className="text-[22px] text-white" />
        )}
      </button>
      <div className="p-4 space-y-2" onClick={onClickStory}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-white text-base font-semibold">{title}</h6>
            <span className="text-sm text-gray-300">
              {visitedDate ? moment(visitedDate).format("Do MMM YYYY") : "-"}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-200 line-clamp-2">
          {story?.slice(0, 100) || "No story available."}
        </p>

        {visitedLocation?.length > 0 && (
          <div className="inline-flex items-center gap-2 text-sm text-cyan-200 bg-cyan-500/10 border border-cyan-300/20 rounded-full px-3 py-1 shadow-sm">
            <BsFillPinMapFill className="text-cyan-300 text-base" />
            <span>
              {visitedLocation.map((item, index) =>
                index === visitedLocation.length - 1 ? `${item}` : `${item}, `
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryCard;
