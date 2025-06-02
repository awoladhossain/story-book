import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdAddCircleOutline } from "react-icons/md";
import Modal from "react-modal";
import { storyStore } from "../../store/storyStore";
import AddMemory from "../Memory/AddMemory";
import MemoryCard from "../Memory/MemoryCard";

// Set app root for Modal accessibility
Modal.setAppElement("#root");

const Dashboard = () => {
  const { story, getStory, isCheckingAuth, favouriteStory, error, message } =
    storyStore();
  const [openEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  useEffect(() => {
    getStory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isCheckingAuth) return <p>Loading...</p>;
  if (error)
    return (
      <p className="text-red-500">
        Error: {message || "Something went wrong."}
      </p>
    );

  const handleEdit = (data) => {
    setOpenEditModal({ isShown: true, type: "edit", data });
  };
  const handleViewStory = (data) => {
    console.log("Viewing story:", data);
  };

  const handleIsFavourite = (data) => {
    const storyId = data._id;
    console.log("Initiating favorite toggle for story ID:", storyId);
    favouriteStory(storyId);
    toast.success("Toggle Successfull", {
      position: "bottom-right",
    });
  };

  // * storyauth functionality5612

  return (
    <>
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

      {/* Modal */}
      <Modal
        isOpen={openEditModal.isShown}
        onRequestClose={() =>
          setOpenEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
          },
          content: {
            maxWidth: "600px",
            margin: "auto",
            borderRadius: "1rem",
            padding: "2rem",
          },
        }}
      >
        <AddMemory
          type={openEditModal.type}
          storyInfo={openEditModal.data}
          onClose={() =>
            setOpenEditModal({ isShown: false, type: "add", data: null })
          }
          getAllTravelStories={getStory} // ❗ make sure this is a function
        />
      </Modal>

      {/* Floating Action Button */}
      <button
        className="fixed right-6 bottom-6 z-50 w-16 h-16 flex items-center justify-center rounded-full bg-cyan-500 text-white shadow-xl hover:bg-cyan-600 hover:scale-105 transition-all duration-300"
        title="Add New Memory"
        onClick={() =>
          setOpenEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAddCircleOutline className="text-4xl" />
      </button>
    </>
  );
};

export default Dashboard;
