import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";
import CountryCard from "../components/CountryCard";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  // Fetch all countries on initial load
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data); // set initial filtered list
      })
      .catch((err) => console.error("Failed to fetch countries:", err));
  }, []);

  // Update filtered countries when search or region changes
  useEffect(() => {
    let filtered = countries;

    if (search) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (region) {
      filtered = filtered.filter(
        (country) => country.region === region
      );
    }

    setFilteredCountries(filtered);
  }, [search, region, countries]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
          <SearchBar onSearch={setSearch} />
          <RegionFilter onFilter={setRegion} />
        </div>

        {filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCountries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No countries found.</p>
        )}
      </div>
    </div>
  );
}
