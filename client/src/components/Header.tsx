
import { useNavigate } from "react-router-dom";

import { getUser, logout } from "../utils/authUtils";
import { apiSlice } from "../store/api/apiSlice";
import { useAppDispatch } from "../hooks/reduxHooks";


interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = getUser();

  const handleLogout = () => {
    // Remove token and user from localStorage
    logout();

    // Clear RTK Query cached data
    dispatch(apiSlice.util.resetApiState());

    // Navigate to login page
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="text-2xl text-gray-700 hover:text-gray-900 md:hidden"
          aria-label="Open sidebar"
        >
          ☰
        </button>

        {/* Page title */}
        <h2 className="text-base font-semibold text-gray-800 md:text-lg">
          Employee Management System
        </h2>
      </div>

      {/* User information + Logout */}
      <div className="flex items-center gap-3">
        {/* User details */}
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-gray-800">
            {user?.name}
          </p>

          <p className="text-xs text-gray-500">
            {user?.role}
          </p>
        </div>

        {/* Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
