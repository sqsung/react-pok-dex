import styled from "@emotion/styled"
import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { POKEMON_IMAGE_TYPE } from "../Constants";
import { RootState, useAppDispatch } from "../Store";
import { changeImageType, PokemonImageKeyType } from "../Store/imageTypeSlice";

export const PageHeader = () => {
    const type = useSelector((state: RootState) => state.imageType.type);
    const dispatch = useAppDispatch();
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeImageType({
            type: e.target.value as PokemonImageKeyType
        }))
    }

    return (
        <Header>
            <Title>
                <Link to='/'>Pokémon</Link>
            </Title>
            <SelectBox value={type} onChange={handleChange}>
                <option value={POKEMON_IMAGE_TYPE.OFFICIAL_ARTWORK}>Official</option>
                <option value={POKEMON_IMAGE_TYPE.DREAM_WORLD}>Dreamworld</option>
                <option value={POKEMON_IMAGE_TYPE.FRONT_DEFAULT}>FrontDefault</option>
            </SelectBox>
        </Header>
    )
}

const Header = styled.nav`
    display: flex;
    padding: 16px 32px;
    margin-bottom: 16px;
    border-bottom: 1px solid #c0c0c0;
`

const Title = styled.h1`
    margin: 0;
    font-size: 32px;
    color: #ffca09;
    text-shadow: -1px 0 #0047AB, 0 2px #0047AB, 1px 0 #0047AB, 0 -1px #0047AB;
`

const SelectBox = styled.select`
    display: flex;
    margin-left: auto;
    padding: 8px 12px;
    border-radius: 5px;
    border: 0.5px solid lightgray;
`