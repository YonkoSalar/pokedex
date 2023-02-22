import React, { useEffect, useState } from "react";
import { FetchPokemon } from "../api/FetchPokemon";
import { FetchPokemonSpecies } from "../api/FetchPokemonSpecies";
import pikachu from "../images/no-pokemon-selected-image.png";
import { FetchEvolutionChain } from "../api/FetchEvolutionChain";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import * as constants from "../data/constants";
import { useSpring, useTransition, animated } from "react-spring";

function PokemonCard(props: any) {
  // Fetch information from pokemon ID
  const [isPokemonLoaded, Pokemon, Pokedex_entry] = FetchPokemon({
    PokemonId: props.PokemonId,
  });
  const [isPokemonSpecies, pokemonSpecies] = FetchPokemonSpecies({
    PokemonId: props.PokemonId,
  });

  // Fetch evolution chain
  const [evolutionChain, PokemonStart, PokemonFirst, PokemonSecond] =
    FetchEvolutionChain(props.PokemonId, Pokedex_entry);

  // Check animation for enter and leave
  const [isAnimation, setIsAnimation] = useState(false);

  useEffect(() => {
    if (typeof props.PokemonId === "number") {
      console.log("Animation");
      setIsAnimation(true);

      // Set timeout to remove animation
      setTimeout(() => {
        setIsAnimation(false);

        console.log("Animation removed");
      }, 500);
    } else {
      setIsAnimation(false);
    }
  }, [props.PokemonId]);

  const transition = useTransition(isAnimation, {
    from: { transform: "translateX(200%)", opacity: 0 },
    enter: { transform: "translateX(0%)", opacity: 1 },
    leave: { transform: "translateX(200%)", opacity: 0 },
  reverse: !isAnimation
  });

  // If not loaded show loading screen
  if (!props.PokemonId) {
    return (
      <div>
        <div className="fixed bottom-0 right-30 ">
          {transition((style, item) => (
            <animated.div style={style}>
              <div className="p-12 flex-col bg-white rounded-xl w-[350px] h-[750px] ">
                <div className=" relative -mt-40">
                  <img src={pikachu} className=" w-36 h-40 mx-auto " />
                </div>
                <div className="my-auto">
                  <h2 className="text-gray-400 text-center py-60 px-10">
                    Select a Pokemon to display here
                  </h2>
                </div>
              </div>
            </animated.div>
          ))}
        </div>
      </div>
    );
  } else if (Pokemon && Pokemon.name && isPokemonLoaded) {
    return (
      <div>
        <div className=" fixed bottom-0 right-30 gap-2 rounded-xl items-center w-[350px] h-[750px]">
          {transition((style, item) => (
            <animated.div style={style}>
              <div className="bg-white">
                <div className="relative flex justify-center ">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${props.PokemonId}.gif`}
                    className=" w-36 h-36 -mt-20"
                  />
                </div>
                <div className="rounded-lg shadow-lg p-4 ">
                  <p className="text-gray-400 text-center">
                    #{props.PokemonId}
                  </p>
                  <h1 className="text-center font-bold text-2xl">
                    {Pokemon.name.charAt(0).toUpperCase() +
                      Pokemon.name.slice(1)}
                  </h1>
                  <div className="flex flex-row justify-center">
                    {Pokemon.types.map((type, idx) => (
                      <p
                        className={`block text-sm px-5 py-2 m-2 font-bold rounded-xl ${
                          constants.default[type.type.name]
                        }`}
                      >
                        {type.type.name.toUpperCase()}
                      </p>
                    ))}
                  </div>

                  <div className="text-center pt-6">
                    <h2 className="font-bold text-md">POKEDEX ENTRY</h2>
                    <span className="text-sm text-gray-400">
                      {Pokedex_entry.flavor_text_entries[0].flavor_text}
                    </span>
                  </div>

                  <div className="pt-4">
                    <h2 className="font-bold text-center pb-2">ABILITIES</h2>
                    <div className="flex justify-center  gap-2">
                      {Pokemon.abilities.map((ability, idx) => (
                        <div
                          className={` w-40 flex justify-center py-1 border rounded-2xl bg-slate-100 p-2 ${
                            ability.is_hidden
                              ? "border-red-700"
                              : "border-blue-300"
                          } `}
                        >
                          <p className="m-auto text-sm">
                            {ability.ability.name.charAt(0).toUpperCase() +
                              ability.ability.name.slice(1)}
                          </p>

                          <span className="m-auto flex justify-end">
                            {" "}
                            {ability.is_hidden ? (
                              <AiOutlineEyeInvisible />
                            ) : (
                              ""
                            )}{" "}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center text-center gap-2 ">
                    <div className="w-40">
                      <h2 className="pb-2 font-bold">HEIGHT</h2>
                      <div className="py-1 border rounded-2xl bg-slate-100 ">
                        <p className="mx-auto text-sm">{Pokemon.height}m</p>
                      </div>
                    </div>

                    <div className="w-40">
                      <h2 className="pb-2 font-bold">WEIGHT</h2>
                      <div className="  flex justify-between py-1 border rounded-2xl bg-slate-100">
                        <p className="mx-auto text-sm">{Pokemon.weight}kg</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`pt-4 flex flex-col justify-around text-center`}
                  >
                    <h2 className="pb-2 font-bold text-center">STATS</h2>
                    <div className="flex justify-center gap-2 w-90 ">
                      {Pokemon.stats.map((stat, idx) =>
                        // If the stat is total, we want to display it differently
                        stat.stat.name === "total" ? (
                          <div className="w-10 flex flex-col justify-between py-1 rounded-3xl bg-blue-400 ">
                            <p
                              className={`flex justify-center text-white text-xs font-bold m-auto p-2 rounded-full h-8 w-8 ${
                                constants.statsColor[stat.stat.name]
                              }`}
                            >
                              {constants.statsName[stat.stat.name]}
                            </p>
                            <p className=" p-1 font-bold">{stat.base_stat}</p>
                          </div>
                        ) : (
                          <div className="w-10 flex flex-col justify-between py-1 rounded-3xl bg-slate-100">
                            <p
                              className={`flex justify-center text-white text-xs font-bold m-auto p-2 rounded-full h-8 w-8 ${
                                constants.statsColor[stat.stat.name]
                              }`}
                            >
                              {constants.statsName[stat.stat.name]}
                            </p>
                            <p className=" p-1 font-bold">{stat.base_stat}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* If evolution is not included add pb-20 */}

                  <div className="flex flex-col justify-center py-4 pt-4 pb-40">
                    {PokemonFirst &&
                      PokemonStart.sprites &&
                      PokemonStart.sprites.front_default &&
                      PokemonFirst.name !== undefined && (
                        <div className="flex flex-col justify-center">
                          <h2 className="pt-2 font-bold mx-auto">EVOLUTION</h2>
                          <div className="flex flex-row justify-center items-center p-2">
                            <div className="flex justify-center">
                              <div className="flex justify-center px-2 w-16 h-16">
                                <a
                                  // onClick={getPokemonButton(PokemonStart.id)}
                                  className="hover:bg-slate-200 rounded-xl"
                                  href="#"
                                >
                                  {PokemonStart.sprites &&
                                    PokemonStart.sprites.front_default && (
                                      <img
                                        src={PokemonStart.sprites.front_default}
                                        className="h-16 w-16 mx-auto"
                                      />
                                    )}
                                </a>
                              </div>
                            </div>

                            <div className="flex justify-center items-center ">
                              {pokemonSpecies.first.min_level === 0 ? (
                                <p className="px-4 py-1 bg-slate-300 rounded-full text-xs">
                                  ?
                                </p>
                              ) : (
                                <p className="px-4 py-1 bg-slate-300  rounded-full text-xs">
                                  Lv.{pokemonSpecies.first.min_level}
                                </p>
                              )}
                            </div>

                            <div className="flex justify-center h-16 w-16">
                              <a
                                className="hover:bg-slate-200 rounded-xl"
                                href="#"
                              >
                                {PokemonFirst.sprites &&
                                  PokemonFirst.sprites.front_default && (
                                    <img
                                      src={PokemonFirst.sprites.front_default}
                                      className="h-16 w-16 mx-auto"
                                    />
                                  )}
                              </a>
                            </div>

                            {PokemonSecond &&
                              PokemonSecond.name !== undefined && (
                                <div className="flex justify-center items-center ">
                                  {pokemonSpecies.second.min_level === 0 ? (
                                    <p className="px-4 py-1 bg-slate-300 rounded-full text-xs">
                                      ?
                                    </p>
                                  ) : (
                                    <p className="px-4 py-1 bg-slate-300 rounded-full text-xs">
                                      Lv.{pokemonSpecies.second.min_level}
                                    </p>
                                  )}
                                </div>
                              )}

                            {PokemonSecond &&
                              PokemonSecond.name !== undefined && (
                                <div className="flex justify-center h-16 w-16">
                                  <a
                                    className="hover:bg-slate-200 rounded-xl"
                                    href="#"
                                  >
                                    {PokemonSecond.sprites &&
                                      PokemonSecond.sprites.front_default && (
                                        <img
                                          src={
                                            PokemonSecond.sprites.front_default
                                          }
                                          className="h-16 w-16 mx-auto"
                                        />
                                      )}
                                  </a>
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </animated.div>
          ))}
        </div>
      </div>
    );
  }
}

export default PokemonCard;
