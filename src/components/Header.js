import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import headerLogo from '../image/Vector.svg';

function Header({ setLoggedIn, userData }) {

  const navigate = useNavigate();

  function onSignOut() {
    localStorage.removeItem('jwt');
    navigate('./sign-up', { replace: true });
    setLoggedIn(false);
  };
  
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <div className="header__nav">
        <span className="header__email">{userData}</span>
        <Routes>
          <Route path="sign-up" 
            element={<Link to="/sign-in" className="header__link">Войти</Link>}>
          </Route>
          <Route path="sign-in" 
            element={<Link to="/sign-up" className="header__link">Регистрация</Link>}>
          </Route>
          <Route path="/" 
            element={<Link onClick={onSignOut} to="/sign-up" className="header__link">Выйти</Link>}>
          </Route>
        </Routes>
      </div>
    </header>
  );
}

export default Header;