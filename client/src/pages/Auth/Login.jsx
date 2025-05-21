import { useState } from "react";
import Input from "../../components/Input";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { authStore } from "../../store/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = authStore();
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    await login(email, password);
    toast.success("Logged in successfully", {
      position: "bottom-right",
    });
    navigate("/");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen "
    >
      <div className="w-full max-w-md p-8 bg-[rgba(31,41,55,0.6)] backdrop-blur-xl rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            rightIcon={showPassword ? EyeOff : Eye}
            onChange={(e) => setPassword(e.target.value)}
            onRightIconClick={() => setShowPassword((prev) => !prev)}
          />
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white
          font-bold rounded-lg shadow-lg hover:from-green-600
          hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
           focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin  mx-auto" />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
        <div className="px-8 py-4 bg-gray-900 mt-5 bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-green-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
