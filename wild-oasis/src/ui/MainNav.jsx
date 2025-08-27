import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { HiOutlineCog6Tooth , HiHomeModern } from "react-icons/hi2";





const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 3rem 0;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin: 1rem 0;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* active link styles */
  &:hover,
  &.active {
    color: var(--color-grey-800);
    background-color: var(--color-brand-200);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &.active svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard"><IoHomeOutline /><span>Home</span></StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/booking"><SlCalender /><span>Booking</span></StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins"><HiHomeModern /><span>Cabins</span></StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/user"><FaRegUser /><span>Users</span></StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings"><HiOutlineCog6Tooth /><span>Settings</span></StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
