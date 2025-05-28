import { useNavigate } from "react-router-dom";
import { authStore } from "../../store/authStore";

const Dashboard = () => {
  const { user, logout } = authStore();
  console.log(user);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <h1>this Dashboard</h1>
      <button
        onClick={handleLogout}
        className="rounded-md bg-amber-300 text-white p-3 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
