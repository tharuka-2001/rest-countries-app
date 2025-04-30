// src/components/CountryCard.jsx
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../context/FavoritesContext";
import { Heart, MapPin, Users, Globe } from "lucide-react";

export default function CountryCard({ country }) {
  const code = country.cca3; // e.g., "LKA" for Sri Lanka
  const { isDark } = useTheme();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(code);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the favorite button
    if (isFav) {
      removeFavorite(code);
    } else {
      addFavorite(country);
    }
  };

  return (
    <Link 
      to={`/country/${code}`} 
      className="block group"
    >
      <div 
        className={`card overflow-hidden rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
          isDark 
            ? 'bg-gray-800 text-white' 
            : 'bg-white text-gray-900'
        }`}
      >
        <div className="relative overflow-hidden h-48">
          <img 
            src={country.flags.png} 
            alt={country.name.common} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {country.region}
          </div>
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 left-2 p-2 rounded-full transition-all duration-300 ${
              isFav 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white bg-opacity-50 text-gray-800 hover:bg-opacity-75'
            }`}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={18} 
              fill={isFav ? "currentColor" : "none"}
              className={isFav ? "animate-pulse" : ""}
            />
          </button>
        </div>
        <div className="p-6">
          <h2 className="font-bold text-xl mb-4 group-hover:text-blue-500 transition-colors duration-300">
            {country.name.common}
          </h2>
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-blue-500" />
              <span><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</span>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <Users size={16} className="text-green-500" />
              <span><strong>Population:</strong> {country.population.toLocaleString()}</span>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <Globe size={16} className="text-purple-500" />
              <span><strong>Region:</strong> {country.region}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
