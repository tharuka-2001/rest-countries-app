import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import Login from "./pages/Login";

const isLoggedIn = () => !!localStorage.getItem("user");

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn() ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/country/:code"
        element={isLoggedIn() ? <CountryDetail /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
