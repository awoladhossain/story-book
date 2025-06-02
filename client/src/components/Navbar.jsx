import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { authStore } from "../store/authStore";
import Profile from "./profile/Profile";
const Navbar = () => {
  const { user, logout } = authStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // console.log("navbar user", user);
  return (
    <div className=" bg-white/10 backdrop-blur-3xl border-b border-white/20 flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10 shadow-md rounded-md">
      <Link to="/">
        <img
          src={logo}
          alt="travel_memory"
          className="h-16 cursor-pointer bg-[#13f283]  rounded-md text-black"
        />
      </Link>
      <Link to="/dashboard">Dashboard</Link>
      <Profile user={user} logout={handleLogout} />
    </div>
  );
};

export default Navbar;
