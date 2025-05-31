import { useEffect } from "react";
import { storyStore } from "../../store/storyStore";
import MemoryCard from "../Memory/MemoryCard";

const Dashboard = () => {
  const { story, getStory, isCheckingAuth } = storyStore();
  useEffect(() => {
    getStory();
  }, []);
  if (isCheckingAuth) return <p>Loading...</p>;
  console.log(story);

  const handleEdit = (data) => {};
  const handleViewStory = (data) => {};

  const handleIsFavourite = (data) => {};

  // * storyauth functionality2713


  return (
    <>
      <h1>this is the dasboard </h1>
      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1">
            {story.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {story.map((item) => (
                  <MemoryCard
                    key={item._id}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    story={item.story}
                    isFavourite={item.isFavourite}
                    visitedLocation={item.visitedLocation}
                    visitedDate={item.visitedDate}
                    onEdit={() => handleEdit(item)}
                    onClickStory={() => handleViewStory(item)}
                    onFavouriteStory={() => handleIsFavourite(item)}
                  />
                ))}
              </div>
            ) : (
              <p>No story</p>
            )}
          </div>
          <div className="w-[320px]"></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
