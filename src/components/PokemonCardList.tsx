import React from "react";
import { FetchPokemonSearch } from "../api/FetchSearch";
import pokemon_ball from "../images/pokeball-icon.png";
import types from "../data/constants";
import { motion, AnimatePresence } from "framer-motion";

function PokemonCardList(props: any) {
  const [isLoaded, isLoadingMore, pokemons] = FetchPokemonSearch({
    searchTerm: props.searchTerm,
  });

  const handleChange = (pokemonId: Number) => {
    props.onSelectedPokemonChange(pokemonId);
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center p-40">
            <img
              src={pokemon_ball}
              alt="pokeball"
              className="h-32 w-32 animate-spin"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center items-center flex-wrap pt-16">
        <AnimatePresence mode="popLayout">
          {pokemons
            .sort((a, b) => a.id - b.id)
            .map((pokemon, index) => (
              <motion.div
                key={pokemon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
                className="mx-2 mb-10 w-60 h-36 border-gray-200 rounded-3xl cursor-pointer shadow bg-white text-center hover:scale-105 hover:border-2"
              >
                <a
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
                      {pokemon["types"].map((type: any, i: any) => (
                        <span
                          key={i}
                          className={`px-2 py-1 text-xs m-1 font-semibold leading-tight text-gray-700 ${
                            types[type.type.name]
                          } rounded-md`}
                        >
                          {type.type.name.charAt(0).toUpperCase() +
                            type.type.name.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
      {isLoadingMore && (
        <div className="w-full flex justify-center py-8">
          <img src={pokemon_ball} alt="loading" className="h-12 w-12 animate-spin" />
        </div>
      )}
    </div>
  );
}

export default PokemonCardList;
