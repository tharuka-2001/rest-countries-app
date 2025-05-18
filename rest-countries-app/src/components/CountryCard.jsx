// src/components/CountryCard.jsx
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../context/FavoritesContext";
import { Heart, MapPin, Users, Globe } from "lucide-react";

export default function CountryCard({ country }) {
  const code = country.cca3;
  const { isDark } = useTheme();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(code);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isFav) {
      removeFavorite(code);
    } else {
      addFavorite(country);
    }
  };

  return (
    <Link 
      to={`/country/${code}`} 
      className="block group h-full"
    >
      <div 
        className={`h-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl ${
          isDark 
            ? 'bg-gray-800 text-white' 
            : 'bg-white text-gray-900'
        }`}
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <img 
            src={country.flags.png} 
            alt={country.name.common} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {country.region}
          </div>
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 left-2 p-2 rounded-full transition-all duration-300 ${
              isFav 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white/50 text-gray-800 hover:bg-white/75'
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
        <div className="p-4 sm:p-6">
          <h2 className="font-bold text-lg sm:text-xl mb-3 group-hover:text-blue-500 transition-colors duration-300 line-clamp-1">
            {country.name.common}
          </h2>
          <div className="space-y-2 sm:space-y-3">
            <p className="flex items-center gap-2 text-sm sm:text-base">
              <MapPin size={16} className="text-blue-500 flex-shrink-0" />
              <span className="truncate">
                <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
              </span>
            </p>
            <p className="flex items-center gap-2 text-sm sm:text-base">
              <Users size={16} className="text-green-500 flex-shrink-0" />
              <span className="truncate">
                <strong>Population:</strong> {country.population.toLocaleString()}
              </span>
            </p>
            <p className="flex items-center gap-2 text-sm sm:text-base">
              <Globe size={16} className="text-purple-500 flex-shrink-0" />
              <span className="truncate">
                <strong>Region:</strong> {country.region}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
