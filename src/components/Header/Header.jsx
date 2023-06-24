import { Suspense } from 'react';
import { HeaderNavigation, HeaderStyled } from './Header.styled';

const { Outlet } = require('react-router-dom');

const Header = () => {
  return (
    <div>
      <HeaderStyled>
        <HeaderNavigation to="/">Home</HeaderNavigation>
        <HeaderNavigation to="/movies">Movies</HeaderNavigation>
      </HeaderStyled>
      <Suspense fallback={<div>Loading ...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Header;
