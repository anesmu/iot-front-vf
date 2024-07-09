import React from 'react';
import {
  NavLink,
  HeaderContainer,
  TopBar,
  EnterpriseText,
  BottomBar,
  Logo,
  Navigation,
  UserIcon,
} from './Header.styles';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <TopBar>
        <EnterpriseText>Enterprise</EnterpriseText>
      </TopBar>
      <BottomBar>
        <Logo src={''} alt="Logo" />
        <Navigation>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/devices">Devices</NavLink>
        </Navigation>
        <UserIcon>👤</UserIcon>
      </BottomBar>
    </HeaderContainer>
  );
};

export default Header;
