import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      localStorage.setItem("user", username); // save session
      navigate("/"); // redirect to home
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-700 p-6 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Login
        </h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 rounded border dark:bg-gray-600 dark:text-white"
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
