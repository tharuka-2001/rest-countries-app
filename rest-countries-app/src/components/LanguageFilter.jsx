export default function LanguageFilter({ languages, onFilter }) {
    return (
      <select
        onChange={(e) => onFilter(e.target.value)}
        className="p-2 border rounded-md shadow-sm"
      >
        <option value="">All Languages</option>
        {languages.map((lang, index) => (
          <option key={index} value={lang}>{lang}</option>
        ))}
      </select>
    );
  }
  