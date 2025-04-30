// src/components/CountryCard.jsx
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function CountryCard({ country }) {
  const code = country.cca3; // e.g., "LKA" for Sri Lanka
  const { isDark } = useTheme();

  return (
    <Link to={`/country/${code}`} className="block animate-slide-up">
      <div className={`card overflow-hidden hover:shadow-lg transition-all duration-300 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <div className="relative overflow-hidden h-40">
          <img 
            src={country.flags.png} 
            alt={country.name.common} 
            className="w-full h-full object-cover flag-hover" 
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
            {country.region}
          </div>
        </div>
        <div className="p-4">
          <h2 className="font-bold text-lg mb-2">{country.name.common}</h2>
          <div className="space-y-1 text-sm">
            <p className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</span>
            </p>
            <p className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              <span><strong>Population:</strong> {country.population.toLocaleString()}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
