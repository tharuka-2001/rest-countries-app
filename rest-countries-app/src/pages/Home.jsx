import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";
import LanguageFilter from "../components/LanguageFilter";
import CountryCard from "../components/CountryCard";
import { useTheme } from "../context/ThemeContext";
import { ArrowUp } from "lucide-react";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");
  const [allLanguages, setAllLanguages] = useState([]);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isDark } = useTheme();

  // Fetch all countries on initial load
  useEffect(() => {
    setIsLoading(true);
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);

        // Extract unique languages
        const langs = new Set();
        data.forEach((country) => {
          if (country.languages) {
            Object.values(country.languages).forEach((lang) => langs.add(lang));
          }
        });
        setAllLanguages(Array.from(langs).sort());
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch countries:", err);
        setIsLoading(false);
      });
  }, []);

  // Update filtered countries when search, region, or language changes
  useEffect(() => {
    let filtered = countries;

    if (search) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (region) {
      filtered = filtered.filter((country) => country.region === region);
    }

    if (language) {
      filtered = filtered.filter(
        (country) =>
          country.languages &&
          Object.values(country.languages).includes(language)
      );
    }

    setFilteredCountries(filtered);
  }, [search, region, language, countries]);

  // Show or hide "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 sm:mb-12 animate-fade-in">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>World Explorer</h1>
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>Explore Countries</h2>
          <p className={`text-base sm:text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Discover information about countries from around the world</p>
        </div>
        
        <div className={`p-4 sm:p-6 rounded-2xl shadow-lg mb-8 sm:mb-12 transition-colors duration-300 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-grow">
              <SearchBar onSearch={setSearch} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <RegionFilter onFilter={setRegion} />
              <LanguageFilter languages={allLanguages} onFilter={setLanguage} />
            </div>
          </div>
          
          {(search || region || language) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {search && (
                <span className={`px-3 py-1 rounded-full text-sm flex items-center ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-blue-100 text-blue-800'}`}>
                  Search: {search}
                  <button 
                    onClick={() => setSearch("")} 
                    className="ml-2 font-bold hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {region && (
                <span className={`px-3 py-1 rounded-full text-sm flex items-center ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-green-100 text-green-800'}`}>
                  Region: {region}
                  <button 
                    onClick={() => setRegion("")} 
                    className="ml-2 font-bold hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {language && (
                <span className={`px-3 py-1 rounded-full text-sm flex items-center ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-purple-100 text-purple-800'}`}>
                  Language: {language}
                  <button 
                    onClick={() => setLanguage("")} 
                    className="ml-2 font-bold hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div
              data-testid="loading-spinner"
              className="loading-spinner border-gray-200 border-t-blue-600"
            />
          </div>
        ) : filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredCountries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </div>
        ) : (
          <div className={`text-center p-8 rounded-lg transition-colors duration-300 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-md`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className={`text-xl font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>No countries found</p>
            <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out opacity-80 hover:opacity-100 animate-fade-in ${
            isDark 
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/30' 
              : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/30'
          }`}
          title="Back to Top"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
