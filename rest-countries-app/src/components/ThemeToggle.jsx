import { Sun, Moon } from "lucide-react"; // optional: for icons (install: npm i lucide-react)
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition flex items-center gap-2"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
