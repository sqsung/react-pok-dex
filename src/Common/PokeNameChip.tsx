import styled from "@emotion/styled"

interface PokeNameChipProps {
    name: string;
    id: number;
    color: string;
}
export const PokeNameChip = (props: PokeNameChipProps) => {
    const renderNumber = (id: number) => {
        const digits = 3;
        const numToStr = id.toString();

        if (numToStr.length >= digits) return numToStr;

        let result = '';
        for (let i = 0; i < digits - numToStr.length; i++) {
            result += '0';
        }
        return `${result}${numToStr}`;
    }

    return (
        <Chip>
            <NumberChip color={props.color}>
                <Number>{renderNumber(props.id)}</Number>
            </NumberChip>
            <Name>{props.name}</Name>
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
`

const NumberChip = styled.div<{ color: string }>`
    padding: 4px 6px;
    background-color: ${props => props.color};
    border-radius: 16px;
`

const Number = styled.label`
`

const Name = styled.label`
    margin: 0 8px 0 5px;
`