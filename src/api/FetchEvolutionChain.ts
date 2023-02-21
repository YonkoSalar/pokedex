import { useEffect, useState } from "react";




// Fetch evolution chain based on ID and species
export function FetchEvolutionChain(pokemon: any, pokedex_entry: any){

    // Evolution chain
    const [evolutionChain, setEvolutionChain] = useState([]);

    const [PokemonStart, setStartPokemon] = useState([]);
    const [PokemonFirst, setFirstPokemon] = useState([]);
    const [PokemonSecond, setSecondPokemon] = useState([]);


  
  
  
 
    useEffect(() => {

     

      if (pokedex_entry && pokedex_entry.evolution_chain && pokedex_entry.evolution_chain.url) {
        // Fetch evolution chain
        fetch(pokedex_entry.evolution_chain.url)
          .then((res) => res.json())
          .then((data) => {
            setEvolutionChain({
              start: data.chain.species ? data.chain.species.name : "",
              first:
                data.chain.evolves_to[0] && data.chain.evolves_to[0].species
                  ? data.chain.evolves_to[0].species.name
                  : "",
              second:
                data.chain.evolves_to[0] &&
                data.chain.evolves_to[0].evolves_to[0] &&
                data.chain.evolves_to[0].evolves_to[0].species
                  ? data.chain.evolves_to[0].evolves_to[0].species.name
                  : "",
            });

          })
          .then(() => {
              // fetch data if evolution chain is not empty
              

              // Fetch all the necessary data
              Promise.all([
                fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.start}`),
                fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.first}`),
                fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.second}`),
              ])
                .then((responses) =>
                  Promise.all(responses.map((res) => res.json()))
                )
                .then((data) => {
                  setStartPokemon(data[0]);

                  if (data[1]) {
                    setFirstPokemon(data[1]);
                    // fetchMinLevel();

                  }

                  if (data[2]) {
                    setSecondPokemon(data[2]);
                  }
              
                })
                .catch((error) => console.error(error));
            }
          )

          .catch((error) => console.error(error));
        }
      }, [pokemon, pokedex_entry, PokemonStart, PokemonFirst, PokemonSecond, evolutionChain]);





  

  return [evolutionChain, PokemonStart, PokemonFirst, PokemonSecond];

}