// src/pages/CountryDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => res.json())
      .then((data) => setCountry(data[0]))
      .catch((err) => console.error("Error fetching country:", err));
  }, [code]);

  if (!country) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow">
        <Link to="/" className="text-blue-500 hover:underline block mb-4">← Back to Home</Link>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={country.flags.png}
            alt={country.name.common}
            className="w-full md:w-1/2 h-64 object-cover rounded"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{country.name.common}</h1>
            <p><strong>Official Name:</strong> {country.name.official}</p>
            <p><strong>Capital:</strong> {country.capital?.[0]}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Subregion:</strong> {country.subregion}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
