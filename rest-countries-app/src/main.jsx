// import React from "react";
// import ReactDOM from "react-dom/client";
// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from "react-router-dom";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Application styles
import './index.css';

// Root component
import App from './App.jsx';

/**
 * Main application entry point
 * - Wraps the App component with React.StrictMode for development checks
 * - Provides BrowserRouter for routing functionality
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);