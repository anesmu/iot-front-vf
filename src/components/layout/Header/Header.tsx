import React from 'react';
import {
  HeaderContainer,
  TopBar,
  EnterpriseText,
  BottomBar,
  Logo,
  Navigation,
  NavLink,
} from './Header.styles';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <TopBar>
        <EnterpriseText>Vodafone</EnterpriseText>
      </TopBar>
      <BottomBar>
        <Logo src={'/vodafone.svg'} alt="Logo" />
        <Navigation>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Home
          </NavLink>
          <NavLink
            to="/devices"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Devices
          </NavLink>
        </Navigation>
      </BottomBar>
    </HeaderContainer>
  );
};

export default Header;
