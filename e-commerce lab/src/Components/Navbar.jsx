import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Moon, Sun, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              <ShoppingBag className="h-8 w-8" />
              <span>Lumière</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${isActive("/") ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"}`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${isActive("/products") ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"}`}
            >
              Shop
            </Link>
            <Link
              to="/admin"
              className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 ${isActive("/admin") ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"}`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
