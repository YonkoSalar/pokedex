import { useState, useEffect } from "react";




export function FetchPokemonSpecies({ PokemonId }: { PokemonId: number }): [boolean, any] {
  const [species, setSpecies] = useState({
    first: {
      name: "",
      min_level: 0,
    },
    second: {
      name: "",
      min_level: 0,
    },
  });


  const [PokemonStart, setPokemonStart] = useState([]);
  const [PokemonFirst, setPokemonFirst] = useState([]);
  const [PokemonSecond, setPokemonSecond] = useState([]);


  const [isLoaded, setIsLoaded] = useState(false);



  useEffect(() => {
    // Reset species
    setSpecies(prevSpecies => ({
      ...prevSpecies,
      first: {
        name: "",
        min_level: 0,
      },
      second: {
        name: "",
        min_level: 0,
      },
    }));

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${PokemonId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.evolution_chain.url) {
          fetch(`${data.evolution_chain.url}`)
            .then((res) => res.json())
            .then((data) => {
              // Fetch first evolution min level
              if (data.chain.evolves_to[0].evolution_details) {
                setSpecies((prevSpecies) => ({
                  ...prevSpecies,
                  first: {
                    ...prevSpecies.first,
                    name: data.chain.evolves_to[0].species.name,
                    min_level: data.chain.evolves_to[0].evolution_details[0].min_level || 0,
                  },
                }));
              }
             

              // Fetch second evolution min level
              if (data.chain.evolves_to[0].evolves_to[0].evolution_details) {
                setSpecies((prevSpecies) => ({
                  ...prevSpecies,
                  second: {
                    ...prevSpecies.second,
                    name: data.chain.evolves_to[0].evolves_to[0].species.name,
                    min_level: data.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level || 0,
                  },
                }));
              }
             
              
            });
        }
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [PokemonId, PokemonStart, PokemonFirst, PokemonSecond]);

  
      

    


  return [isLoaded, species];
}