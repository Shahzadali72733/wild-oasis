import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const Styleaside = styled.aside`
background: var(--color-grey-500:);
padding: 2rem;
`;
function Sidebar () {
    return(
        <Styleaside>
            <Logo />
            <MainNav />
        </Styleaside>
    )
}
export default Sidebar ;