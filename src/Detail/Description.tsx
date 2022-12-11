import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MarkChip } from "../Common/MarkChip";
import { fetchPokemonDetail, PokemonDetailOutputType } from "../Service/pokemonService";
import { RootState } from "../Store";

export const Description = () => {
    const { name } = useParams();
    const imageType = useSelector((state: RootState) => state.imageType.type);
    const [pokemon, setPokemon] = useState<PokemonDetailOutputType | null>(null)

    useEffect(() => {
        if (!name) return;

        (async () => {
            const detail = await fetchPokemonDetail(name);
            setPokemon(detail);
        })();
    }, [name])

    if (!name || !pokemon) return null;

    return (
        <Container>
            <ImgContainer>
                <Image src={pokemon.image[imageType]} alt={pokemon.krName} />
            </ImgContainer>
            <Divider />
            <Body >
                <h2>기본정보</h2>
                <Table>
                    <tbody>
                        <TableRow>
                            <Th>번호</Th>
                            <td>{pokemon.id}</td>
                        </TableRow>
                        <TableRow>
                            <Th>이름</Th>
                            <td>{`${pokemon.krName} (${pokemon.name})`}</td>
                        </TableRow>
                        <TableRow>
                            <Th>타입</Th>
                            <td>{pokemon.types.toString()}</td>
                        </TableRow>
                        <TableRow>
                            <Th>키</Th>
                            <td>{`${pokemon.height}m`}</td>
                        </TableRow>
                        <TableRow>
                            <Th>몸무게</Th>
                            <td>{`${pokemon.weight}kg`}</td>
                        </TableRow>
                    </tbody>
                </Table>

                <h2>능력치</h2>
                <Table>
                    <tbody>
                        {
                            pokemon.baseStats.map(stat => {
                                return (
                                    <TableRow key={stat.name}>
                                        <Th>{stat.name}</Th>
                                        <td>{stat.value}</td>
                                    </TableRow>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Body>
            <Footer>
                <MarkChip />
            </Footer>
        </Container >
    );
}

const Container = styled.section`
    border: 1px solid #c0c0c0;
    border-radius: 16px;
    box-shadow: 1px 1px 3px 1px #c0c0c0;
    margin: 16px 32px;
`

const ImgContainer = styled.section`
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
    margin: 8px 0;
`

const Image = styled.img`
    width: 350px;
    height: 350px;
`

const Divider = styled.hr`
    margin: 32px;
    border-style: none;
    border-top: 0.5px solid #d3d3d3;
`

const Body = styled.section`
    margin: 0 32px;
`

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 0 auto 16px;

    th, td {
        padding: 7px 12px;
    }

    td {
        font-weight: bold;
    }
`

const TableRow = styled.tr`
    border-width: 1px 0;
    border-style: solid;
    border-color: #f0f0f0;
`

const Th = styled.th`
    width: 1px;
    white-space: nowrap;
    text-align: left;
    font-weight: bold;
    color: #a0a0a0;
    font-size: 14px;
`

const Footer = styled.section`
    display: flex;
    margin: 16px;
`