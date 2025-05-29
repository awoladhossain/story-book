import { Link } from "react-router-dom";

const Profile = ({ user, logout }) => {
  const initals = user?.name
    .split("")
    .map((n) => n[0])
    .join("")
    .slice(0, 1)
    .toUpperCase();
  // console.log(initals)

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-cyan-900 font-semibold bg-cyan-100 shadow-inner cursor-pointer">
        {initals}
      </div>
      <div className="text-white">
        <p className="text-sm font-medium mb-1">{user?.name || "User"}</p>
        {!user ? (
          <Link to="/login">
            <button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-xs px-4 py-1.5 rounded-md transition duration-300">
              Login
            </button>
          </Link>
        ) : (
          <button
            className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-xs px-4 py-1.5 rounded-md transition duration-300"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
