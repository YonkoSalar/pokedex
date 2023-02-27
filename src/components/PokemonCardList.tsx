import React, { useState } from "react";
import { FetchPokemonSearch } from "../api/FetchSearch";
import pokemon_ball from "../images/pokeball-icon.png";
import types from "../data/constants";





// Pokemon Types colorset set dicionary

function PokemonCardList(props: any) {
  // Fetch Pokemon Search
  const [isLoaded, pokemons] = FetchPokemonSearch({
    searchTerm: props.searchTerm,
  });


 

  // If the search term changes, render PokemonCardList again
  const handleChange = (pokemonId : Number) => {
    props.onSelectedPokemonChange(pokemonId);
  };


  

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center p-40">
            {/* Animte spin from image */}
            <img
              src={pokemon_ball}
              alt="pokeball"
              className="h-32 w-32 animate-spin"
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center flex-wrap pt-16">
        {pokemons
          .sort((a, b) => a.id - b.id)
          .map((pokemon, index) => (
            <div className="mx-2 mb-10 w-60 h-36 bg-white border-gray-200 rounded-3xl cursor-pointer shadow dark:bg-gray-800 dark:border-gray-700 text-center hover:scale-105 hover:border-2">
              <a
                key={index}
                // On click get pokemon ID
                onClick={() => handleChange(pokemon.id)}
                className=""
              >
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-18 h-18 mx-auto relative -top-12"
                />

                <div className="py-4 relative -top-14 -mb-12">
                  <p className="text-gray-400 text-center text-xs font-semibold -p-20">
                    N°{pokemon.id}
                  </p>

                  <p className="text-l font-bold">
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </p>
                  <div className="flex justify-center">
                    {pokemon.types.map((type:any, index:any) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-xs m-1 font-semibold leading-tight text-gray-700 ${
                          types[type.type.name]
                        } rounded-md dark:bg-gray-700 dark:text-gray-200`}
                      >
                        {type.type.name.charAt(0).toUpperCase() +
                          type.type.name.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </div>
          ))}
      </div>
    );
  }
}

export default PokemonCardList;
