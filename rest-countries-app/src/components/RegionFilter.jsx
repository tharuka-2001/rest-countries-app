// src/components/RegionFilter.jsx
import { useTheme } from "../context/ThemeContext";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function RegionFilter({ onFilter }) {
  const { isDark } = useTheme();
  
  return (
    <select
      onChange={(e) => onFilter(e.target.value)}
      className={`p-2 border rounded-md shadow-sm ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
    >
      <option value="">All Regions</option>
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
}
