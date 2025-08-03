import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { LogOut, User, Plus } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
              </div>
            </div>
            <span className="text-xl font-bold text-gray-900">
              SerenoSphere
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <nav className="hidden md:flex items-center space-x-6">
                  <Link
                    to="/dashboard"
                    className={`text-sm font-medium transition-colors duration-200 ${
                      location.pathname === "/dashboard"
                        ? "text-primary-600"
                        : "text-gray-700 hover:text-primary-600"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/my-sessions"
                    className={`text-sm font-medium transition-colors duration-200 ${
                      location.pathname === "/my-sessions"
                        ? "text-primary-600"
                        : "text-gray-700 hover:text-primary-600"
                    }`}
                  >
                    My Sessions
                  </Link>
                  <Link
                    to="/create-session"
                    className="inline-flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Session</span>
                  </Link>
                </nav>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-700">{user?.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center space-x-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:block">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
                >
                  Log In
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
