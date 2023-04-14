import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
import Footer from './Footer';


function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onClickLike, onCardDelete, cards}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="content">

        <section className="profile">
          <div className="profile__item">
            <div className="profile__avatar" onClick={onEditAvatar}>
              <img className="profile__avatar-image" src={currentUser?.avatar} alt="Аватарка" />
            </div>
            <div className="profile__info">
              <div className="profile__title">{currentUser?.name}</div>
              <button className="profile__edit-button" type="button" aria-label="редактирование профиля" onClick={onEditProfile}></button>
              <p className="profile__subtitle">{currentUser?.about}</p>
            </div>
          </div>
          <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </section>

        <section className="cards">
          {cards.map((card) => {
              return <Card onClickLike={onClickLike} onCardDelete={onCardDelete} onCardClick={onCardClick} card={card} key={card._id} />
          })} 
        </section>
      </main>

      <Footer/>
    </>
  );
}

export default Main;