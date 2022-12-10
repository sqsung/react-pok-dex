import styled from "@emotion/styled"
import { Link } from "react-router-dom";

export const PageHeader = () => {
    return (
        <Header>
            <Title>
                <Link to='/'>Pokémon</Link>
            </Title>
            <SelectBox>
                <option value='Official'>Official</option>
                <option value='A'>Theme A</option>
                <option value='B'>Theme B</option>
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