import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface LocationAutocompleteProps {
  value: string;
  onChange: (location: string) => void;
  onSelect?: () => void;
  placeholder?: string; // Adding optional placeholder prop
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({ value, onChange, onSelect,placeholder }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSuggestions = async (query: string) => {
      if (!query) return;

      try {
        const response = await axios.get(
          `https://us1.locationiq.com/v1/autocomplete.php?key=pk.3a4532d6b886f48c68609bf33b5a21dd&q=${query}&limit=5&countrycodes=IN`
        );
        const results = response.data.map((place: any) => place.display_name);
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching autocomplete results:', error);
      }
    };

    if (value) fetchSuggestions(value);
  }, [value]);

  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    setSuggestions([]);
    if (onSelect) onSelect(); // Call onSelect callback if provided
  };

  const handleBlur = () => {
    setTimeout(() => setSuggestions([]), 200); // Add slight delay for click to register
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)} // Keep value updated in the parent
        onBlur={handleBlur}
        className="w-full mt-1 p-3 border rounded-lg"
        placeholder={placeholder} // Use the placeholder prop
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white shadow-md w-full mt-1">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)} // Call handleSelect with suggestion
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
