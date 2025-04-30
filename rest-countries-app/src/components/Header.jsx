// import { Link } from "react-router-dom";
// import { useTheme } from "../context/ThemeContext";
// import { Heart, Moon, Sun } from "lucide-react";

// function Header() {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <header className={`header ${theme} transition-colors duration-300`}>
//       <div className="container">
//         <div className="header-content">
//           <Link to="/" className="logo hover:scale-105 transition-transform duration-300">
//             <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Where in the world?
//             </h1>
//           </Link>
//           <div className="header-actions">
//             <Link 
//               to="/favorites" 
//               className="favorites-link group relative overflow-hidden"
//             >
//               <div className="flex items-center gap-2">
//                 <Heart 
//                   size={20} 
//                   className="text-red-500 group-hover:scale-110 transition-transform duration-300" 
//                 />
//                 <span className="font-semibold">Favorites</span>
//               </div>
//               <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//             </Link>
//             <button 
//               className="theme-toggle group relative overflow-hidden"
//               onClick={toggleTheme}
//             >
//               <div className="flex items-center gap-2">
//                 {theme === "dark" ? (
//                   <Sun size={20} className="text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
//                 ) : (
//                   <Moon size={20} className="text-gray-700 group-hover:rotate-180 transition-transform duration-500" />
//                 )}
//                 <span className="font-semibold">
//                   {theme === "dark" ? "Light Mode" : "Dark Mode"}
//                 </span>
//               </div>
//               <div className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header; 

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Heart, Moon, Sun, Globe, User, Menu, X } from "lucide-react";

function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  
  // Get username from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUsername(userData.username || "User");
      } catch (e) {
        setUsername("User");
      }
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Check if route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header 
      className={`sticky top-0 z-40 bg-white dark:bg-gray-800 transition-all duration-300
        ${scrolled ? "shadow-md py-2" : "py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            aria-label="Home"
          >
            <Globe 
              size={28} 
              className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" 
            />
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                World Explorer
              </h1>
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline-block">
                Discover our amazing planet
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" isActive={isActive("/")}>
              Home
            </NavLink>
            
            <NavLink to="/favorites" isActive={isActive("/favorites")}>
              <Heart 
                size={18} 
                className={`mr-1 ${isActive("/favorites") ? "text-red-500 fill-red-500" : "text-gray-500 dark:text-gray-400"}`} 
              />
              Favorites
            </NavLink>

            {/* Theme Toggle */}
            <button 
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400 hover:rotate-90 transition-transform duration-500" />
              ) : (
                <Moon size={20} className="text-gray-700 hover:rotate-90 transition-transform duration-500" />
              )}
              <span className="font-medium">
                {theme === "dark" ? "Light" : "Dark"}
              </span>
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-2 pl-4 border-l border-gray-200 dark:border-gray-700">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <User size={16} className="text-blue-700 dark:text-blue-300" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium hidden sm:inline-block">
                {username}
              </span>
              <button 
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink to="/" isActive={isActive("/")}>
                Home
              </MobileNavLink>
              
              <MobileNavLink to="/favorites" isActive={isActive("/favorites")}>
                <Heart 
                  size={18} 
                  className={`mr-2 ${isActive("/favorites") ? "text-red-500 fill-red-500" : ""}`} 
                />
                Favorites
              </MobileNavLink>

              <button 
                className="flex items-center w-full text-left px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-yellow-400 mr-2" />
                ) : (
                  <Moon size={20} className="text-gray-700 mr-2" />
                )}
                {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </button>
              
              <div className="flex justify-between items-center px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                    <User size={16} className="text-blue-700 dark:text-blue-300" />
                  </div>
                  <span className="font-medium">{username}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-sm px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </nav>
          </div>
        )}
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