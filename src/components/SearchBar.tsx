import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";


type SearchBarProps = {
    searchTerm: string;
    onSearchTermChange: (newSearchTerm: string) => void;
  };


function SearchBar(props: SearchBarProps) {
  const [inputValue, setInputValue] = useState(props.searchTerm);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      props.onSearchTermChange(value);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  return (
      <div className="flex justify-start bg-white rounded-2xl h-18 shadow-lg p-4 ">
        <input
          className="w-full h-8 rounded-2xl outline-none"
          placeholder="Search for a Pokemon"
          value={inputValue}
          onChange={handleChange}
        />

        <div className="bg-red-500 p-2.5 rounded-xl shadow-lg shadow-red-500/50">
          <FaSearch className="text-white" />
        </div>

      </div>
  );
}

export default SearchBar;
