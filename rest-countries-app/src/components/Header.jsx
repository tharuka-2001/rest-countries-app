import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Heart, Moon, Sun, Globe, User, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  
  useEffect(() => {
    if (user) {
      setUsername(user.username || "User");
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Globe size={24} className="text-blue-500 mr-2" />
            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              World Explorer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span>Home</span>
            </Link>
            <Link 
              to="/favorites" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Heart size={20} />
              <span>Favorites</span>
            </Link>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
              <span>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>

            {/* Profile Section */}
            {user ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => navigate('/profile')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <User size={16} className="text-blue-700 dark:text-blue-300" />
                  </div>
                  <span className="hidden sm:inline-block">{username}</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className={`text-sm px-3 py-2 rounded-md transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'text-red-400 hover:text-red-300 hover:bg-gray-800' 
                      : 'text-red-600 hover:text-red-700 hover:bg-gray-100'
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login"
                  className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-md transition-colors duration-200 ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        } ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span>Home</span>
            </div>
          </Link>
          <Link 
            to="/favorites" 
            className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Heart size={20} />
              <span>Favorites</span>
            </div>
          </Link>
          <button 
            onClick={toggleTheme}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </div>
          </button>
          {user ? (
            <>
              <button
                onClick={() => navigate('/profile')}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <User size={16} className="text-blue-700 dark:text-blue-300" />
                  </div>
                  <span>{username}</span>
                </div>
              </button>
              <button 
                onClick={handleLogout}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'text-red-400 hover:text-red-300 hover:bg-gray-800' 
                    : 'text-red-600 hover:text-red-700 hover:bg-gray-100'
                }`}
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-1">
              <Link 
                to="/login"
                className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="block px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// Desktop Navigation Link component
function NavLink({ children, to, isActive }) {
  return (
    <Link
      to={to}
      className={`relative group flex items-center font-medium transition-colors duration-300
        ${isActive 
          ? "text-blue-600 dark:text-blue-400" 
          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        }`}
    >
      <div className="flex items-center">
        {children}
      </div>
      <div 
        className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform origin-left transition-transform duration-300
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
      />
    </Link>
  );
}

// Mobile Navigation Link component
function MobileNavLink({ children, to, isActive }) {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors
        ${isActive 
          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" 
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
    >
      {children}
    </Link>
  );
}

export default Header;