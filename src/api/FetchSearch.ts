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
export function FetchPokemonSearch({ searchTerm }: FetchPokemonSearchProps): [boolean, boolean, PokemonResult[]] {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pokemons, setPokemons] = useState<PokemonResult[]>([]);
  const [page, setPage] = useState(1);

  // Reset list and page when search term changes
  useEffect(() => {
    setPokemons([]);
    setPage(1);
    setIsLoaded(false);
  }, [searchTerm]);

  useEffect(() => {
    const promises: Promise<PokemonResult>[] = [];
    const itemsPerPage = 20;
    const startIndex = (page - 1) * itemsPerPage + 1;
    const endIndex = page * itemsPerPage;

    if (searchTerm.length > 0) {
      setIsLoaded(false);
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=898`)
        .then((res) => res.json())
        .then((data) => {
          const filteredData = data.results.filter((pokemon: PokemonData) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          filteredData.forEach((pokemon: PokemonData) => {
            promises.push(fetch(pokemon.url).then((res) => res.json()));
          });
          Promise.all(promises)
            .then((data) => { setPokemons(data); setIsLoaded(true); })
            .catch((error) => console.log(error));
        });
    } else {
      const isFirstPage = page === 1;
      if (isFirstPage) {
        setIsLoaded(false);
      } else {
        setIsLoadingMore(true);
      }
      for (let i = startIndex; i <= endIndex; i++) {
        promises.push(
          fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json())
        );
      }
      Promise.all(promises)
        .then((newData) => {
          setPokemons((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const unique = newData.filter((p) => !existingIds.has(p.id));
            return [...prev, ...unique];
          });
          setIsLoaded(true);
          setIsLoadingMore(false);
        })
        .catch((error) => { console.log(error); setIsLoadingMore(false); });
    }
  }, [searchTerm, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (isLoadingMore || searchTerm.length > 0) return;
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoadingMore, searchTerm]);

  return [isLoaded, isLoadingMore, pokemons];
}
