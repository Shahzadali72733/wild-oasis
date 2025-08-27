import styled from "styled-components";

const StyledLogo = styled.div`
  padding-top:3rem ;
  text-align:center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="https://xllthasqbpwnbmqkxrnr.supabase.co/storage/v1/object/public/avatar/logo-light.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
