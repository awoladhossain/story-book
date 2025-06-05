import { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

const TagInput = ({ tag, setTag }) => {
  const [inputValue, setInputValue] = useState([]);
  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTag([...tag, inputValue.trim()]);
      setInputValue("");
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };
  return (
    <div className="w-full">
      {tag.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tag.map((item, index) => (
            <span
              key={index}
              className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {item}
              <button
                onClick={() => setTag(tag.filter((_, i) => i !== index))}
                className="text-cyan-500 hover:text-red-500 focus:outline-none"
                aria-label={`Remove ${item}`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 w-full">
        <input
          type="text"
          value={inputValue}
          placeholder="Enter location"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm border border-cyan-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-cyan-300"
        />
        <button
          onClick={addNewTag}
          className="p-2 rounded-full border border-cyan-300 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
          aria-label="Add tag"
        >
          <MdAddCircleOutline className="text-xl text-cyan-500 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
