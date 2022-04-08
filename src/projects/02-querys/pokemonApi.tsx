import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Pokemon {
  id: string;
  name: string;
  weight: number;
  sprites: {
    front_shiny: string;
  };
}

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
      // A função tranformReponse é para transformar o retorno da requisição
      // Posso passar o parametro meta para pegar os metadados da requisição
      // transformResponse: (data: Pokemon, meta) => {
      transformResponse: (data: Pokemon) => {
        // console.log(meta);
        return {
          ...data,
          name: "Pokemon: " + data.name,
        } as Pokemon;
      },
      // keepUnusedDataFor é o tempo que guardara o cache do aplicação
      // keepUnusedDataFor: 5
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
