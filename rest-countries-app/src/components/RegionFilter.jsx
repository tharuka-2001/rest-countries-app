// src/components/RegionFilter.jsx
const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function RegionFilter({ onFilter }) {
  return (
    <select
      onChange={(e) => onFilter(e.target.value)}
      className="p-2 border rounded-md shadow-sm"
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
