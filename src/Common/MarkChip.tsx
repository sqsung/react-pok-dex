import styled from "@emotion/styled"

export const MarkChip = () => {
    return (
        <Chip>
            <Text>Pokémon</Text>
        </Chip>
    )
}

const Chip = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #c0c0c0;
    border-radius: 16px;
    font-weight: bold;
    box-shadow: 1px 1px 0 0 #c0c0c0;
    margin-left: auto;
    margin-right: 14px;
    margin-bottom: 12px;
`

const Text = styled.label`
    padding: 0 8px;
    font-size: 14px;
`