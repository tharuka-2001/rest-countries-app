// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import CountryDetails from "./pages/CountryDetails";
// import Favorites from "./pages/Favorites";
// import Login from "./pages/Login";
// import { ThemeProvider } from "./context/ThemeContext";
// import { FavoritesProvider } from "./context/FavoritesContext";
// import Header from "./components/Header";

// const isLoggedIn = () => !!localStorage.getItem("user");

// function App() {
//   return (
//     <ThemeProvider>
//       <FavoritesProvider>
//         <Header />
//         <Routes>
//           <Route
//             path="/"
//             element={isLoggedIn() ? <Home /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/country/:countryCode"
//             element={isLoggedIn() ? <CountryDetails /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/favorites"
//             element={isLoggedIn() ? <Favorites /> : <Navigate to="/login" />}
//           />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </FavoritesProvider>
//     </ThemeProvider>
//   );
// }

// export default App;


import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Header from "./components/Header";
import { Globe, MapPin, AlertTriangle } from "lucide-react";

// Check if user is logged in
const isLoggedIn = () => !!localStorage.getItem("user");

function App() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const [pageTransition, setPageTransition] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Splash screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Page transition effect
  useEffect(() => {
    setPageTransition(true);
    const timer = setTimeout(() => {
      setPageTransition(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Initial auth check
  useEffect(() => {
    // Simulate auth check
    setTimeout(() => {
      setLoadingAuth(false);
    }, 500);
  }, []);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (loadingAuth) {
      return (
        <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    return isLoggedIn() ? children : <Navigate to="/login" state={{ from: location }} replace />;
  };

  // Splash screen
  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col justify-center items-center text-white z-50">
        <Globe size={80} className="animate-pulse text-white mb-6" />
        <h1 className="text-4xl font-bold mb-2">World Explorer</h1>
        <p className="text-blue-100">Discover our amazing planet</p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          {/* Network Status Banner */}
          {!networkStatus && (
            <div className="bg-yellow-500 text-yellow-900 py-2 px-4 flex items-center justify-center">
              <AlertTriangle size={18} className="mr-2" />
              <span>You're offline. Some features may be limited.</span>
            </div>
          )}
          
          <Header />
          
          <main className={`flex-grow py-4 ${pageTransition ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <div className="page-transition">
                      <Home />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/country/:countryCode"
                element={
                  <ProtectedRoute>
                    <div className="page-transition">
                      <CountryDetails />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <div className="page-transition">
                      <Favorites />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/login" 
                element={
                  <div className="page-transition">
                    <Login />
                  </div>
                } 
              />
              <Route 
                path="*" 
                element={
                  <div className="flex flex-col items-center justify-center h-96 text-center px-4">
                    <MapPin size={64} className="text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Page Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">The page you're looking for doesn't exist or has been moved.</p>
                    <a 
                      href="/"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Go Home
                    </a>
                  </div>
                } 
              />
            </Routes>
          </main>
          
          <footer className="py-6 px-4 bg-white dark:bg-gray-800 shadow-inner mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <Globe size={20} className="text-blue-500 mr-2" />
                <span className="font-medium text-gray-700 dark:text-gray-300">World Explorer</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} World Explorer. All rights reserved.
              </div>
              <nav className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">Privacy</a>
                <a href="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">Terms</a>
                <a href="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">Help</a>
              </nav>
            </div>
          </footer>
        </div>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;