// src/components/CountryCard.jsx
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function CountryCard({ country }) {
  const code = country.cca3; // e.g., "LKA" for Sri Lanka
  const { isDark } = useTheme();

  return (
    <Link to={`/country/${code}`}>
      <div className={`card overflow-hidden hover:shadow-lg transition ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <img src={country.flags.png} alt={country.name.common} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h2 className="font-bold text-lg">{country.name.common}</h2>
          <p><strong>Capital:</strong> {country.capital?.[0]}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
}
