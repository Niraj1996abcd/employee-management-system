
import { getUser } from "../utils/authUtils";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const user = getUser();

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

      {/* User information */}
      <div className="flex items-center gap-2 md:gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">
            {user?.name}
          </p>

          <p className="text-xs text-gray-500">
            {user?.role}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Header;
