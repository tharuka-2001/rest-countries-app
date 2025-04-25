import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white p-4 shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">🌍 Country Explorer</h1>
        <ThemeToggle />
      </div>
    </nav>
  );
}
