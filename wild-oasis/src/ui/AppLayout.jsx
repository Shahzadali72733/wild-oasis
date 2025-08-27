import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Main = styled.main`
  background: var(--color-brand-200);
  padding: 2rem;
`;

const StyleAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;  /* Sidebar | Content */
  grid-template-rows: auto 1fr;      /* Header | Main */
  height: 100vh;
`;

const SidebarContainer = styled.aside`
  grid-row: 1 / -1; /* Sidebar takes full height (both rows) */
  background: var(--color-grey-50);
`;

const HeaderContainer = styled.header`
  grid-column: 2;  /* Only in the right column */
  grid-row: 1;     /* Top row */
`;

const MainContainer = styled.div`
  grid-column: 2; /* Only in the right column */
  grid-row: 2;    /* Second row (below header) */
  overflow-y: auto;
`;

function AppLayout() {
  return (
    <StyleAppLayout>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>

      <HeaderContainer>
        <Header />
      </HeaderContainer>

      <MainContainer>
        <Main>
          <Outlet />
        </Main>
      </MainContainer>
    </StyleAppLayout>
  );
}

export default AppLayout;
