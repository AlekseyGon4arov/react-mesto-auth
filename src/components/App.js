import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

import api from '../utils/api';
import auth from '../utils/auth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  
  const [infoTooltip, setInfoTooltip] = React.useState(false);
  const [error, setError] = React.useState(false);



  const [userData, setUserData] = React.useState('');

  function hendleLogin() {
    setLoggedIn(true);
  }

  const navigate = useNavigate();
  
  React.useEffect(() => {
    api.getProfileData()
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(err);
    });

    api.getInitialCards() 
    .then((res) => {
      setCards(res);
    })
    .catch((err) => {
      console.log(err);
    });
  },[]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserData(res.data.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },[navigate]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const action = isLiked ? api.deleteLike : api.addLike;

    action(card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateUser(data) {
    api.setProfileData(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data) 
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(data) {
    api.createCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setInfoTooltip(false)
    setSelectedCard(null)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }


  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>

        <Header userData={userData} />
        
        <Routes>
 
          <Route path="/" 
            element={ 
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onClickLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          /> 
          <Route path="/sign-in" 
            element={
              <Login 
                onLogin={hendleLogin}
                setInfoTooltip={setInfoTooltip} 
                setError={setError} 
              />
            } 
          />

          <Route path="/sign-up" 
            element={
              <Register 
                setInfoTooltip={setInfoTooltip} 
                setError={setError} 
              />
            } 
          />

          <Route path="*" 
            element={
              loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-up" replace />} />            

        </Routes> 

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpened={infoTooltip} 
          error={error}
          onClose={closeAllPopups}
        />

      </CurrentUserContext.Provider>
      
    </div>
  );
}

export default App;
