import styled from "@emotion/styled";
import { PokeCard } from "./PokeCard";
import { useEffect, useState } from 'react';
import { fetchPokemons } from "../Service/pokemonService";
import { PokemonListResponseType } from "../Service/pokemonService";
import useInfiniteScroll from "react-infinite-scroll-hook";

export const PokeCardList = () => {
    const [pokemons, setPokemons] = useState<PokemonListResponseType>({
        count: 0,
        next: '',
        results: []
    })

    const [infiniteRef] = useInfiniteScroll({
        loading: false,
        hasNextPage: pokemons.next !== '',
        onLoadMore: async () => {
            const morePokemons = await fetchPokemons(pokemons.next);
            setPokemons({
                ...morePokemons,
                results: [...pokemons.results, ...morePokemons.results]
            })
        },
        // When there is an error, we stop infinite loading.
        // It can be reactivated by setting "error" state as undefined.
        disabled: false,
        // `rootMargin` is passed to `IntersectionObserver`.
        // We can use it to trigger 'onLoadMore' when the sentry comes near to become
        // visible, instead of becoming fully visible on the screen.
        rootMargin: '0px 0px 400px 0px',
    });

    useEffect(() => {
        (async () => {
            const pokemons = await fetchPokemons();
            setPokemons(pokemons);
        })();
    }, [])


    return (
        <>
            <List>
                {
                    pokemons.results.map((mon, idx) => {
                        return (
                            <PokeCard key={`${mon.name}_${idx}`} name={mon.name} />
                        )
                    })
                }
            </List>
            <Loading ref={infiniteRef}>
                Loading
            </Loading>
        </>
    )
}

const Loading = styled.div`
    display: flex;
    justify-content: center;
`

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