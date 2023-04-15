import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import headerLogo from '../image/Vector.svg';

function Header({ onSignOut, userData }) {

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
            element={<Link onClick={onSignOut} to="/sign-in" className="header__link">Выйти</Link>}>
          </Route>
        </Routes>
      </div>
    </header>
  );
}

export default Header;