import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../context/FavoritesContext";
import { ArrowLeft, Heart, MapPin, Users, Globe, Building2, Languages, Landmark, Share2, Download, Info } from "lucide-react";

export default function CountryDetails() {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const { isDark } = useTheme();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(countryCode);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        if (!response.ok) {
          throw new Error("Country not found");
        }
        const data = await response.json();
        setCountry(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryCode]);

  const handleFavoriteClick = () => {
    if (isFav) {
      removeFavorite(countryCode);
    } else {
      addFavorite(country);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${country.name.common} - Country Details`,
        text: `Check out ${country.name.common}'s details!`,
        url: window.location.href,
      });
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleDownloadFlag = () => {
    const link = document.createElement('a');
    link.href = country.flags.png;
    link.download = `${country.name.common.toLowerCase().replace(/\s+/g, '-')}-flag.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"} flex items-center justify-center p-4`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className={`text-base sm:text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Loading country details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"} flex items-center justify-center p-4`}>
        <div className={`max-w-md w-full p-6 sm:p-8 rounded-2xl shadow-xl text-center ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            Error
          </h2>
          <p className={`mb-6 text-sm sm:text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {error}
          </p>
          <Link
            to="/"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm sm:text-base ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!country) return null;

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"} p-4 sm:p-6 lg:p-8 animate-fade-in`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 text-sm sm:text-base ${
              isDark ? "text-white" : "text-gray-900"
            } hover:text-blue-500 transition-colors duration-300`}
          >
            <ArrowLeft size={20} />
            Back
          </Link>
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={handleShare}
              className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
              aria-label="Share country details"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={handleDownloadFlag}
              className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
              aria-label="Download flag"
            >
              <Download size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative group">
            <div className="rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]">
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleFavoriteClick}
                className={`p-2 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isFav
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-white/50 text-gray-800 hover:bg-white/75"
                }`}
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart 
                  size={20} 
                  fill={isFav ? "currentColor" : "none"}
                  className={isFav ? "animate-pulse" : ""}
                />
              </button>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className={`p-2 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isDark
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
                aria-label="Show flag information"
              >
                <Info size={20} />
              </button>
            </div>
            {showInfo && (
              <div className={`absolute bottom-0 left-0 right-0 p-4 ${
                isDark ? "bg-gray-800/90" : "bg-white/90"
              } backdrop-blur-sm`}>
                <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {country.flags.alt || "No description available for this flag"}
                </p>
              </div>
            )}
          </div>

          <div className={`${isDark ? "text-white" : "text-gray-900"}`}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 gradient-text">
              {country.name.common}
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 italic text-gray-500">
              {country.name.official}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className={`p-4 rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin size={20} className="text-blue-500 flex-shrink-0" />
                  <h3 className="font-semibold text-sm sm:text-base">Capital</h3>
                </div>
                <p className="text-sm sm:text-base">{country.capital?.[0] || "N/A"}</p>
              </div>

              <div className={`p-4 rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <div className="flex items-center gap-3 mb-2">
                  <Users size={20} className="text-green-500 flex-shrink-0" />
                  <h3 className="font-semibold text-sm sm:text-base">Population</h3>
                </div>
                <p className="text-sm sm:text-base">{country.population.toLocaleString()}</p>
              </div>

              <div className={`p-4 rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <div className="flex items-center gap-3 mb-2">
                  <Globe size={20} className="text-purple-500 flex-shrink-0" />
                  <h3 className="font-semibold text-sm sm:text-base">Region</h3>
                </div>
                <p className="text-sm sm:text-base">{country.region}</p>
              </div>

              <div className={`p-4 rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <div className="flex items-center gap-3 mb-2">
                  <Building2 size={20} className="text-yellow-500 flex-shrink-0" />
                  <h3 className="font-semibold text-sm sm:text-base">Subregion</h3>
                </div>
                <p className="text-sm sm:text-base">{country.subregion || "N/A"}</p>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Languages size={24} className="text-indigo-500 flex-shrink-0" />
                <h2 className="text-lg sm:text-xl font-semibold">Languages</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {country.languages ? 
                  Object.entries(country.languages).map(([code, name]) => (
                    <span 
                      key={code} 
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDark 
                          ? "bg-gray-800 text-gray-300" 
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {name}
                    </span>
                  ))
                  : <span className="text-gray-500">No languages data available</span>
                }
              </div>
            </div>

            {country.currencies && (
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Landmark size={24} className="text-yellow-500 flex-shrink-0" />
                  <h2 className="text-lg sm:text-xl font-semibold">Currencies</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(country.currencies).map(([code, currency]) => (
                    <span 
                      key={code} 
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDark 
                          ? "bg-gray-800 text-gray-300" 
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {currency.name} ({code})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 