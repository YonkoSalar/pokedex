import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";


// SearchBar Props types 
type SearchBarProps = {
    searchTerm: string;
    onSearchTermChange: (newSearchTerm: string) => void;
  };


function SearchBar(props: SearchBarProps) {
  
  // If the search term changes, render PokemonCardList again
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onSearchTermChange(e.target.value);
  };

  return (
      <div className="flex justify-start bg-white rounded-2xl h-18 shadow-lg p-4 ">
        <input
          className="w-full h-8 rounded-2xl outline-none"
          placeholder="Search for a Pokemon"
          value={props.searchTerm}
          onChange={handleChange}
        />

        <div className="bg-red-500 p-2.5 rounded-xl shadow-lg shadow-red-500/50">
          <FaSearch className="text-white" />
        </div>

      </div>
  );
}

export default SearchBar;
