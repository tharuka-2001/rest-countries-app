import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      setIsSubmitting(true);
      
      // Simulate a brief loading state
      setTimeout(() => {
        localStorage.setItem("user", username); // save session
        navigate("/"); // redirect to home
      }, 800);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'} animate-fade-in`}>
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text">Country Explorer</h1>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover the world's countries
          </p>
        </div>
        
        <form
          onSubmit={handleLogin}
          className={`${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} p-8 rounded-lg shadow-lg`}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome
          </h2>
          
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Enter your name to continue
            </label>
            <input
              id="username"
              type="text"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-3 rounded-md border ${isDark ? 'bg-gray-600 text-white border-gray-500' : 'bg-white text-gray-900 border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-all duration-300 flex items-center justify-center ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isSubmitting ? (
              <>
                <div className="loading-spinner mr-2"></div>
                <span>Logging in...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
          
          <div className="mt-6 text-center text-sm">
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              This is a demo app. No password required.
            </p>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
            Data provided by <a href="https://restcountries.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">REST Countries API</a>
          </p>
        </div>
      </div>
    </div>
  );
}
