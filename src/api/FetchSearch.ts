import { useEffect, useState } from "react";

interface FetchPokemonSearchProps {
  searchTerm: string;
}

interface PokemonData {
  name: string;
  url: string;
}

interface PokemonResult {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
}

// Fetch pokemon data
export function FetchPokemonSearch({ searchTerm }: FetchPokemonSearchProps): [boolean, PokemonResult[]] {
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemons, setPokemons] = useState<PokemonResult[]>([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const promises: Promise<PokemonResult>[] = [];
    const itemsPerPage = 20;
    const startIndex = (page - 1) * itemsPerPage + 1;
    const endIndex = page * itemsPerPage;

    function updatePokemons(data: PokemonResult[]) {
      if (searchTerm.length === 0 && page === 1) {
        setPokemons([]);
      }
      setPokemons(data);
      setIsLoaded(true);
    }

    // if search term is not empty, fetch pokemon based on search term
    if (searchTerm.length > 0) {
      // Filter name and fetch pokemon using included search term
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=898`)
        .then((res) => res.json())
        .then((data) => {
          const filteredData = data.results.filter((pokemon: PokemonData) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          filteredData.forEach((pokemon: PokemonData) => {
            promises.push(
              fetch(pokemon.url).then((res) => res.json())
            );
          });

          Promise.all(promises)
            .then((data) => updatePokemons((data)))
            .catch((error) => console.log(error));
        });
    } else {
      for (let i = 1; i <= endIndex; i++) {
        promises.push(
          fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) =>
            res.json()
          )
        );
      }
      Promise.all(promises)
        .then((data) => {
          if (!pokemons.includes(pokemons as any)) {
            updatePokemons((data));
          }
        })
        .catch((error) => console.log(error));
    }
  }, [searchTerm, page, pokemons]);

  // Event handler for when the user scrolls to the bottom of the page
  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return [isLoaded, pokemons];
}
