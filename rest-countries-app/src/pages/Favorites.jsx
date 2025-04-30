import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";
import CountryCard from "../components/CountryCard";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Favorites() {
  const { favorites } = useFavorites();
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 mb-8 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          <ArrowLeft size={20} />
          Back
        </Link>

        <h1 className={`text-3xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"}`}>
          Favorite Countries
        </h1>

        {favorites.length === 0 ? (
          <div className={`text-center py-12 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            <p className="text-lg">You haven't added any countries to your favorites yet.</p>
            <p className="mt-2">Click the heart icon on any country card to add it to your favorites.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favorites.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 