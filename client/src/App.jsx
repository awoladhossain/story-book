import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import LoadingSpinner from "./components/LoadingSpinner";
import EmailVerification from "./pages/Auth/EmailVerification";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import ResetPassword from "./pages/Auth/ResetPassword";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import { authStore } from "./store/authStore";

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = authStore();
  const location = useLocation();

  // Redirect authenticated users from auth routes (except /login) to dashboard
  if (isAuthenticated && user?.isVerified && location.pathname !== "/login") {
    if (
      ["/signup", "/verify-email", "/forgot-password", "/reset-password"].some(
        (path) => location.pathname.startsWith(path)
      )
    ) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated, isCheckingAuth } = authStore();
  const location = useLocation();

  console.log("Protected Route Check:", {
    isAuthenticated,
    user,
    isVerified: user?.isVerified,
    isCheckingAuth,
  });

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && !user.isVerified) {
    console.log("User not verified, redirecting to verify-email");
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth } = authStore();

  useEffect(() => {
    console.log("App mounted, checking auth");
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    console.log("Checking authentication...");
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <Login />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUp />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/verify-email"
            element={
              <RedirectAuthenticatedUser>
                <EmailVerification />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPassword />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPassword />
              </RedirectAuthenticatedUser>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
