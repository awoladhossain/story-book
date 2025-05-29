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
import Navbar from "./components/Navbar";

// Layout with conditional Navbar
const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideNavbarOn = [
    "/login",
    "/signup",
    "/verify-email",
    "/forgot-password",
  ];

  const isResetRoute = location.pathname.startsWith("/reset-password");

  const shouldHideNavbar =
    hideNavbarOn.includes(location.pathname) || isResetRoute;

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = authStore();
  const location = useLocation();

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

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
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
  );
};

const App = () => {
  const { isCheckingAuth, checkAuth } = authStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-700">
      <FloatingShape
        color="bg-cyan-400"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-cyan-400"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
