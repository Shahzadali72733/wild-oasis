import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
const Divstyle = styled.div`
background: var(--color-brand-200);
`;

export default function App() {
  return (
    <>
    <GlobalStyles />
    <Divstyle>
      <Heading>Hello vite</Heading>
      <Button>Log In</Button>
      <Button>Sign Up</Button>
      <Input placeholder="please enter your name"></Input>
      <Input placeholder="Enter number of Guest" type="number"></Input>
    </Divstyle>
  </>
  );
}
