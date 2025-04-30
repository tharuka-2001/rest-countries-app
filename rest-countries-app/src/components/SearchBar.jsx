// src/components/SearchBar.jsx
import { useTheme } from "../context/ThemeContext";

export default function SearchBar({ onSearch }) {
  const { isDark } = useTheme();
  
  return (
    <input
      type="text"
      placeholder="Search for a country..."
      onChange={(e) => onSearch(e.target.value)}
      className={`w-full p-2 border rounded-md shadow-sm ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
    />
  );
}
  