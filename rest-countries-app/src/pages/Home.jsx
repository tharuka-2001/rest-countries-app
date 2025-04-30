import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";
import LanguageFilter from "../components/LanguageFilter";
import CountryCard from "../components/CountryCard";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");
  const [allLanguages, setAllLanguages] = useState([]);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { isDark } = useTheme();

  // Fetch all countries on initial load
  useEffect(() => {
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
      })
      .catch((err) => console.error("Failed to fetch countries:", err));
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
    <div className={`min-h-screen ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
          <SearchBar onSearch={setSearch} />
          <RegionFilter onFilter={setRegion} />
          <LanguageFilter languages={allLanguages} onFilter={setLanguage} />
        </div>

        {filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCountries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">No countries found.</p>
        )}
      </div>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-opacity duration-300 ease-in-out opacity-80 hover:opacity-100"
          title="Back to Top"
        >
          ⬆
        </button>
      )}
    </div>
  );
}
