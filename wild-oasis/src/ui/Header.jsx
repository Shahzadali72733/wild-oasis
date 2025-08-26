import styled from "styled-components";

const StyleHeader = styled.header`
background: var(--color-grey-500:);
padding: 2rem;
`;

function Header () {
    return(
        <StyleHeader>
            <p>Header</p>
        </StyleHeader>
    )
}
export default Header ;