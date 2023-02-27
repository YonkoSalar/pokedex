import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import PokemonCardList from "./components/PokemonCardList";
import PokemonCard from "./components/PokemonCard";
import pokemon_ball from "./images/pokeball-icon.png";
import { useSpring, useTransition, animated } from "react-spring";
import PokemonCardMobile from "./components/PokemonCardMobile";
import {motion} from 'framer-motion'

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

  // Check screen size for mobile
  const [isMobile, setIsMobile] = useState(false);
 
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 1200) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);



  // Loading screen
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Transition translate Y
  const transition = useTransition(loading, {
    to: { opacity: 1, transform: "translateY(100%)" },
    from: { opacity: 1, transform: "translateY(0%)" },
  });

  // Framer motion animation for open and close
  const variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2, // adjust duration as needed
        ease: "linear", // use a linear easing function
      },
    },
    closed: {
      opacity: 0,
      y: "100%",
      transition: {
        duration: 0.2, // adjust duration as needed
        ease: "linear", // use a linear easing function
      },
    },
  };

  

  return (
    <div className="flex flex-row">
      {loading ? (
        <div >
          {transition((style, item) => (
            <div className="fixed top-1isModalOpen/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
              <animated.div style={style}>
                <div className="flex flex-col">
                  <img
                    src={pokemon_ball}
                    alt="pokeball"
                    className="h-32 w-32 animate-spin"
                  />
                </div>
              </animated.div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="px-16 py-20 sm:w-full lg:pl-40 lg:w-2/3">
            <img
              src={pokemon_ball}
              className="w-34 h-34 bg-no-repeat absolute -z-10 -left-40 -top-20"
            />
            <div>
              <SearchBar
                searchTerm={searchTerm}
                onSearchTermChange={handleSearchTermChange}
              />
            </div>
            <div>
              <PokemonCardList
                searchTerm={searchTerm}
                onSelectedPokemonChange={handleSelectedPokemonChange}
              />
            </div>
          </div>
          <div>

            {/* If mobile, hide pokemon card */}
            {isMobile ? (
              <PokemonCardMobile 
              PokemonId={selectedPokemonId}
              onSelectedPokemonChange={handleSelectedPokemonChange}
              
              />
            ) : (
            <PokemonCard
              PokemonId={selectedPokemonId}
              onSelectedPokemonChange={handleSelectedPokemonChange}
            />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
