import { useTheme } from "../context/ThemeContext";

export default function LanguageFilter({ languages, onFilter }) {
  const { isDark } = useTheme();
  
  return (
    <select
      onChange={(e) => onFilter(e.target.value)}
      className={`p-2 border rounded-md shadow-sm ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
    >
      <option value="">All Languages</option>
      {languages.map((lang, index) => (
        <option key={index} value={lang}>{lang}</option>
      ))}
    </select>
  );
}
  