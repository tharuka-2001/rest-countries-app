// // src/pages/CountryDetail.jsx
// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useTheme } from "../context/ThemeContext";

// export default function CountryDetail() {
//   const { code } = useParams();
//   const [country, setCountry] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { isDark } = useTheme();

//   useEffect(() => {
//     setIsLoading(true);
//     setError(null);
    
//     fetch(`https://restcountries.com/v3.1/alpha/${code}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Country not found");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setCountry(data[0]);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching country:", err);
//         setError(err.message);
//         setIsLoading(false);
//       });
//   }, [code]);

//   if (isLoading) {
//     return (
//       <div className={`min-h-screen ${isDark ? 'bg-gray-800' : 'bg-gray-100'} p-6 flex justify-center items-center`}>
//         <div className="loading-spinner"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`min-h-screen ${isDark ? 'bg-gray-800' : 'bg-gray-100'} p-6`}>
//         <div className={`max-w-4xl mx-auto ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} p-6 rounded-md shadow text-center`}>
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//           </svg>
//           <h2 className="text-2xl font-bold mb-2">Error</h2>
//           <p className="mb-4">{error}</p>
//           <Link to="/" className="text-blue-500 hover:underline inline-flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//             </svg>
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen ${isDark ? 'bg-gray-800' : 'bg-gray-100'} p-6 animate-fade-in`}>
//       <div className={`max-w-4xl mx-auto ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} p-6 rounded-md shadow-lg`}>
//         <Link to="/" className="text-blue-500 hover:underline inline-flex items-center mb-6">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//           </svg>
//           Back to Home
//         </Link>
        
//         <div className="flex flex-col md:flex-row gap-8">
//           <div className="md:w-1/2">
//             <div className="rounded-lg overflow-hidden shadow-lg">
//               <img
//                 src={country.flags.png}
//                 alt={country.name.common}
//                 className="w-full h-auto flag-hover"
//               />
//             </div>
//             <div className="mt-4 flex flex-wrap gap-2">
//               {country.currencies && Object.entries(country.currencies).map(([code, currency]) => (
//                 <span key={code} className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-gray-600' : 'bg-blue-100 text-blue-800'}`}>
//                   {currency.name} ({code})
//                 </span>
//               ))}
//             </div>
//           </div>
          
//           <div className="md:w-1/2">
//             <h1 className="text-3xl font-bold mb-2 gradient-text">{country.name.common}</h1>
//             <p className="text-lg mb-4 italic">{country.name.official}</p>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//               <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Capital</p>
//                 <p className="font-medium">{country.capital?.[0] || "N/A"}</p>
//               </div>
//               <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Region</p>
//                 <p className="font-medium">{country.region}</p>
//               </div>
//               <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Subregion</p>
//                 <p className="font-medium">{country.subregion || "N/A"}</p>
//               </div>
//               <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Population</p>
//                 <p className="font-medium">{country.population.toLocaleString()}</p>
//               </div>
//             </div>
            
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-2">Languages</h3>
//               <div className="flex flex-wrap gap-2">
//                 {country.languages ? 
//                   Object.entries(country.languages).map(([code, name]) => (
//                     <span key={code} className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-gray-600' : 'bg-green-100 text-green-800'}`}>
//                       {name}
//                     </span>
//                   )) : 
//                   <span className="text-gray-500">No language data available</span>
//                 }
//               </div>
//             </div>
            
//             {country.borders && country.borders.length > 0 && (
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Border Countries</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {country.borders.map((border) => (
//                     <span key={border} className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-gray-600' : 'bg-purple-100 text-purple-800'}`}>
//                       {border}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
