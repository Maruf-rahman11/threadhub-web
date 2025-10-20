import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // 🌞 & 🌙 icons

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <label className="swap swap-rotate cursor-pointer">
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />

      {/* ☀️ Light mode (sun icon) */}
      <FaSun className="swap-off text-yellow-400 w-6 h-6" />

      {/* 🌙 Dark mode (crescent icon) */}
      <FaMoon className="swap-on text-blue-400 w-6 h-6" />
    </label>
  );
};

export default ThemeToggle;
