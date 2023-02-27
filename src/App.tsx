import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import PokemonCardList from "./components/PokemonCardList";
import PokemonCard from "./components/PokemonCard";
import pokemon_ball from "./images/pokeball-icon.png";
import { useSpring, useTransition, animated } from "react-spring";
import PokemonCardMobile from "./components/PokemonCardMobile";
import { motion, AnimatePresence } from "framer-motion";

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
    }, 5000);
  }, []);

  return (
    <div className="flex flex-row">
      <AnimatePresence>
        {loading && (
          <div
            style={{ position: "fixed", top: 0, left: 0, bottom: 0, right: 0 }}
            className="z-10"
          >
            <motion.div
              initial={{ opacity: 1, y: "0" }}
              //</div>animate={{ opacity: 1, y: "0" }}
              exit={{ opacity: 1, y: "-100%", transition: { duration: 1, yoyo: Infinity } }}
              transition={{ duration: 1.0 }}
              className="flex justify-center items-center w-full h-full bg-white z-50"
            >
              <div>
                <div>
                  <div className="flex flex-col">
                    <img
                      src={pokemon_ball}
                      alt="pokeball"
                      className="h-32 w-32 animate-spin"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {!loading && (
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
