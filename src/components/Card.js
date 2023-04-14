import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onClickLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  return (
    <article className="card">
      <div className="card__item">
        {isOwn && <button onClick={() => {
            onCardDelete(card);
          }} className="card__delete-icon" type="button" aria-label="удаление карточки"></button>}
        <img className="card__image" src={card.link} alt={card.name} onClick={() => {
          onCardClick(card)}}
        />
      </div>
      <div className="card__group">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button onClick={() => {
            onClickLike(card);
          }} className={`card__like_button ${isLiked && 'card__like_button_active'}`} type="button" aria-label="лайк"></button>
          <span className="card__like_count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;