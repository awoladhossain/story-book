import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
const DateSelection = ({ date, setDate }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const pickerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setOpenDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpenDatePicker(true)}
        className="flex items-center gap-2 text-sm font-semibold text-sky-700 bg-sky-100 hover:bg-sky-200 transition px-4 py-2 rounded-full shadow-sm hover:shadow-md duration-200 backdrop-blur-sm"
      >
        <MdDateRange className="text-lg" />
        {date ? moment(date).format("Do MMM YYYY") : "Pick a date"}
      </button>

      {openDatePicker && (
        <div
          ref={pickerRef}
          className="absolute z-50 mt-3 w-[300px] sm:w-[340px] p-5 bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl animate-fade-in-up"
        >
          <button
            onClick={() => setOpenDatePicker(false)}
            className="absolute top-2 right-2 text-sky-700 hover:text-red-500 transition text-xl"
            title="Close"
          >
            <IoMdCloseCircle />
          </button>
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            captionLayout="dropdown-buttons"
            pagedNavigation
            className="pt-6"
          />
        </div>
      )}
    </div>
  );
};

export default DateSelection;
