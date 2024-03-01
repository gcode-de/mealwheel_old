import Link from "next/link";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import Pizza from "../public/icons/pizza-svgrepo-com.svg";
import Calendar from "../public/icons/calendar-1-svgrepo-com.svg";
import Heart from "../public/icons/heart-svgrepo-com.svg";
import List from "../public/icons/list-check-svgrepo-com.svg";
import Gear from "../public/icons/settings-svgrepo-com.svg";
export default function NavBar() {
  const router = useRouter();
  function isActive(path) {
    return router.pathname === path;
  }
  const menuItems = [
    { href: "/", label: "Discover", Icon: Pizza },
    { href: "/plan", label: "Plan", Icon: Calendar },
    { href: "/favorites", label: "Favorites", Icon: Heart },
    { href: "/shoppinglist", label: "Shopping", Icon: List },
    { href: "/settings", label: "Settings", Icon: Gear },
  ];

  return (
    <StyledNav>
      {menuItems.map(({ href, label, Icon }) => (
        // <Link href={href} key={href} passHref>
        <StyledNavElement href={href} key={href} $active={isActive(href)}>
          <StyledIconContainer>
            <Icon width="100%" height="100%" />
          </StyledIconContainer>
          <span>{label}</span>
        </StyledNavElement>
        // </Link>
      ))}
    </StyledNav>
  );
}

const StyledNav = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 10px;
  background-color: #f5f5f5;
  border-top: 2px solid #4d4a4a;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const StyledNavElement = styled(Link)`
  color: ${({ $active }) => ($active ? "#DF3F3F" : "#928F8F")};
  fill: ${({ $active }) => ($active ? "#DF3F3F" : "#928F8F")};
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: medium;
  cursor: pointer;

  &:hover {
    color: black;
    fill: black;
  }

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  flex: 1;
`;

const StyledIconContainer = styled.div`
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
`;
