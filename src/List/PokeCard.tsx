import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MarkChip } from "../Common/MarkChip";
import { PokeNameChip } from "../Common/PokeNameChip";
import { fetchPokemonDetail, PokemonDetailOutputType } from "../Service/pokemonService";
import { RootState } from "../Store";

interface PokeCardProps {
    name: string;
}

export const PokeCard = (props: PokeCardProps) => {
    const navi = useNavigate();
    const imageType = useSelector((state: RootState) => state.imageType.type);
    const [pokemon, setPokemon] = useState<PokemonDetailOutputType | null>(null)

    const handleClick = () => {
        navi(`/pokemon/${props.name}`);
    }

    useEffect(() => {
        (async () => {
            const detail = await fetchPokemonDetail(props.name);
            setPokemon(detail);
        })();
    }, [props.name])

    if (!pokemon) {
        return null;
    }

    return (
        <Item onClick={handleClick} color={pokemon.color}>
            <Header>
                <PokeNameChip name={pokemon.krName} color={pokemon.color} id={pokemon.id}></PokeNameChip>
            </Header>
            <Body>
                <Image src={pokemon.image[imageType]} alt={pokemon.name}></Image>
            </Body>
            <Footer>
                <MarkChip />
            </Footer>
        </Item>
    )
}

const Item = styled.li<{ color: string }>`
    display: flex;
    flex-direction: column;
    padding: 8px;
    border: 1px solid #c0c0c0;
    width: 250px;
    height: 300px;
    box-shadow: 1px 1px 3px 1px #c0c0c0; 
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
    
    &:hover {
        transform: scale(1.03);
    }

    &:active {
        background-color: ${props => props.color};
        opacity: 0.7;
        transition: background-color 0s;
    }
`

const Header = styled.section`
    display: flex;
    flex-direction: row;
    margin: 8px 0;
`

const Body = styled.section`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin: 8px 0;
`

const Image = styled.img`
    width: 180px;
    height: 180px;
`

const Footer = styled.section`
    display: flex;
    flex-direction: row;
`

function useSeletor(arg0: (state: RootState) => any) {
    throw new Error("Function not implemented.");
}
