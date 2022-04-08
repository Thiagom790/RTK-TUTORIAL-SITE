import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { useState } from "react";
import { pokemonApi, useGetPokemonByNameQuery } from "./pokemonApi";

const pokemons = ["bulbasaur", "pikachu", "ditto", "bulbasaur"];

interface PokemonInfoProps {
  name: string;
  pollingInterval: number;
}

function PokemonInfo({ name, pollingInterval }: PokemonInfoProps) {
  const queryParams = {
    // o tempo para fazer outra sondagem na api
    pollingInterval,
    // o skip serve para pular uma requisição
    // Dessa forma ele não fara a requisição se for pikachu
    skip: name === "pikachu",
  };

  const { data, isLoading, error, isFetching } = useGetPokemonByNameQuery(
    name,
    queryParams
  );

  return (
    <>
      {error ? (
        <>Something is wrong</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>
            {data.name} {isFetching ? "..." : ""}
          </h3>
          <img src={data.sprites.front_shiny} alt="pokemon" />
        </>
      ) : null}
    </>
  );
}

function PokemonList() {
  const [pollingInterval, setPollingInterval] = useState(0);

  return (
    <div>
      <select
        name="pooling"
        id="polling"
        onChange={(e) => setPollingInterval(Number(e.target.value))}
      >
        <option value={0}>Off</option>
        <option value={1000}>1s</option>
        <option value={5000}>5s</option>
      </select>
      <div>
        {pokemons.map((pokemon, index) => (
          <PokemonInfo
            name={pokemon}
            key={index}
            pollingInterval={pollingInterval}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ApiProvider api={pokemonApi}>
      <PokemonList />
    </ApiProvider>
  );
}
