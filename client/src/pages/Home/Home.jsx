import { Link } from "react-router-dom";
import { authStore } from "../../store/authStore";


const Home = () => {
  const { isAuthenticated } = authStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
      <p className="text-lg text-gray-300 mb-6">
        Explore our features or access your dashboard.
      </p>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="py-2 px-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
