import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetails";
import AdminPage from "./pages/AdminPage";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (localStorage.getItem("theme") === "dark") return true;
    if (
      !localStorage.getItem("theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      return true;
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-200">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;