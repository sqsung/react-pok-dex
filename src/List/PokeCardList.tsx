import styled from "@emotion/styled";
import { PokeCard } from "./PokeCard";
import { useEffect, useState } from 'react';
import { fetchPokemons } from "../Service/pokemonService";
import { PokemonListResponseType } from "../Service/pokemonService";

export const PokeCardList = () => {
    const [pokemons, setPokemons] = useState<PokemonListResponseType>({
        count: 0,
        next: '',
        results: []
    })

    useEffect(() => {
        (async () => {
            const pokemons = await fetchPokemons();
            setPokemons(pokemons);
        })();
    }, [])


    return (
        <List>
            {
                pokemons.results.map((mon, idx) => {
                    return (
                        <PokeCard key={`${mon.name}_${idx}`} name={mon.name} />
                    )
                })
            }
        </List>
    )
}

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 32px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`