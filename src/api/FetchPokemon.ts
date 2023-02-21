import { useEffect, useState } from "react";

// Fetch pokemon based on ID
export function FetchPokemon({PokemonId} : {PokemonId: number}): [boolean, any, any]
{
    const [isLoaded, setIsLoaded] = useState(false);
    const [pokemon, setPokemon] = useState();
    const [pokedex_entry, setPokedex_entry] = useState();

    /////////////
    useEffect(() => {
        if(PokemonId){
          const promises = [];
      
          promises.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonId}`).then((res) => res.json())
          );
      
          promises.push(
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${PokemonId}`).then((res) =>
              res.json()
            )
          );
          Promise.all(promises)
            .then((data) => {
              setPokemon(data[0]);
              setPokedex_entry(data[1]);
              setIsLoaded(true);
            })
            .catch((error) => console.log(error));
        }
        
      }, [PokemonId]);

    
    // Add base stats total
    if(isLoaded && pokemon !== undefined){

        if(pokemon.stats.length === 6){
            pokemon.stats.push({
                base_stat: pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0),
                stat: { name: "total" },
              });
        }

    }



    return [isLoaded, pokemon, pokedex_entry];

}