import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      localStorage.setItem("user", username); // save session
      navigate("/"); // redirect to home
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <form
        onSubmit={handleLogin}
        className={`${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} p-6 rounded-md shadow-md w-full max-w-sm`}
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Login
        </h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full mb-4 p-2 rounded border ${isDark ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
