import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  width: 100%;
`;

export const TopBar = styled.div`
  background-color: black;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end;
`;

export const EnterpriseText = styled.span`
  font-size: 14px;
`;

export const BottomBar = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

export const Logo = styled.img`
  height: 40px;
  margin-right: 20px;
`;

export const Navigation = styled.nav`
  flex-grow: 1;
`;

export const NavLink = styled(Link)`
  margin: 0 15px;
  text-decoration: none;
  color: black;
  font-size: 16px;
`;

export const UserIcon = styled.span`
  font-size: 24px;
`;
