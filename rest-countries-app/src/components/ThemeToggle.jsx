import { Sun, Moon } from "lucide-react"; // optional: for icons (install: npm i lucide-react)
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-700 hover:bg-blue-800'} text-white px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={18} className="animate-pulse" /> : <Moon size={18} className="animate-pulse" />}
      <span className="hidden sm:inline">{isDark ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}
