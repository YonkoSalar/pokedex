import { useState } from "react";
import SearchBar from "./components/SearchBar";
import PokemonCardList from "./components/PokemonCardList";
import PokemonCard from "./components/PokemonCard";
import pokeball from "./images/pokeball-icon.png"

function App() {
  // Set Search term for pokekom
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  // Check for selected pokemon
  const [selectedPokemonId, setSelectedPokemonId] = useState("");

  const handleSelectedPokemonChange = (newSelectedPokemonId: string) => {
    setSelectedPokemonId(newSelectedPokemonId);
  };



  return (
    <div className="flex flex-row">
      <div className="px-16 py-20 sm:w-full lg:pl-40 lg:w-2/3">

      <img 
              src={pokeball}
              className="w-34 h-34 bg-no-repeat absolute -z-10 -left-40 -top-20"

          />

        {/* Search Bar for rendering new pokemons */}
        <div>
          <SearchBar
            searchTerm={searchTerm}
            onSearchTermChange={handleSearchTermChange}
          />
        </div>

        {/* Render Pokemon List */}
        <div>
          <PokemonCardList
            searchTerm={searchTerm}
            onSelectedPokemonChange={handleSelectedPokemonChange}
          />
        </div>
      </div>

      {/* Render Pokemon Details */}
      <div className="">
        <PokemonCard
          PokemonId={selectedPokemonId}
          onSelectedPokemonChange={handleSelectedPokemonChange}
        />
      </div>
    </div>
  );
}

export default App;
