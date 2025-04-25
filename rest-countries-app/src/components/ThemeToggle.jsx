import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // optional: for icons (install: npm i lucide-react)

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition flex items-center gap-2"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
