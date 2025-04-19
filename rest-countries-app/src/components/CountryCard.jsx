// src/components/CountryCard.jsx
import { Link } from "react-router-dom";

export default function CountryCard({ country }) {
  const code = country.cca3; // e.g., "LKA" for Sri Lanka

  return (
    <Link to={`/country/${code}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
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