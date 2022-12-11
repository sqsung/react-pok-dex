import axios from 'axios';

const remote = axios.create();

export interface PokemonListResponseType {
    count: number,
    next: string,
    results: {
        name: string,
        url: string
    }[]
}

export const fetchPokemons = async (nextUrl?: string) => {
    const url = nextUrl ? nextUrl : 'https://pokeapi.co/api/v2/pokemon';
    const response = await remote.get<PokemonListResponseType>(url);
    return response.data;
}

interface PokemonDetailType {
    id: number;
    weight: number;
    height: number;
    name: string;
    types: {
        type: {
            name: string;
        }
    }[];
    sprites: {
        front_default: string;
        other: {
            dream_world: {
                front_default: string
            }
            'official-artwork': {
                front_default: string;
            }
        }
    }
    stats: {
        map(arg0: (el: any) => { name: any; value: any; }): { name: string; value: number; }[];
        base_stat: number;
        stat: {
            name: string;
        }
    }
}

export interface PokemonDetailOutputType {
    id: number;
    weight: number;
    height: number;
    name: string;
    krName: string;
    color: string;
    types: string[];
    image: {
        frontDefault: string;
        dreamWorldFront: string;
        officialArtworkFront: string;
    }
    baseStats: {
        name: string;
        value: number;
    }[]
}

export interface PokemonSpeciesResponseType {
    color: {
        name: string;
    },
    names: {
        name: string;
        language: {
            name: string;
        }
    }[]
}

export const fetchPokemonDetail = async (name: string): Promise<PokemonDetailOutputType> => {
    const detailUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`;

    const response = await remote.get<PokemonDetailType>(detailUrl);
    const speciesResponse = await remote.get<PokemonSpeciesResponseType>(speciesUrl);

    const detail = response.data;
    const species = speciesResponse.data;

    const korName = species.names.find(item => item.language.name === 'ko')?.name ?? detail.name;

    return {
        id: detail.id,
        name: detail.name,
        height: detail.height / 10,
        weight: detail.weight / 10,
        krName: korName,
        color: species.color.name,
        types: detail.types.map(el => el.type.name),
        image: {
            frontDefault: detail.sprites.front_default,
            dreamWorldFront: detail.sprites.other.dream_world.front_default,
            officialArtworkFront: detail.sprites.other['official-artwork'].front_default,
        },
        baseStats: detail.stats.map(el => {
            return {
                name: el.stat.name,
                value: el.base_stat,
            }
        })
    }
}