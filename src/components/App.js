import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import api from '../utils/api';
import auth from '../utils/auth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState('');
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    loggedIn && Promise.all([api.getProfileData(), api.getInitialCards()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((err) => {
      console.log(err);
    });
  },[loggedIn]);

  useEffect(() => {
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

  function handleChange(e) {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleLogin(e) {
    e.preventDefault();

    auth.authorize(formValue)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setFormValue(formValue.email);
          navigate('/', {replace: false});
        }
      }).catch((err) => {
        setInfoTooltip(true);
        setError(true);
        console.log(err);
      })
  }

  function handleRegister(e) {
    e.preventDefault();

    auth.register(formValue)
      .then(() => {
        navigate('/sign-in', {replace: true});
        setInfoTooltip(true);
        setError(false);
      }).catch((err) => { 
        setInfoTooltip(true);
        setError(true);
        console.log(err);
      })
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    navigate('./sign-up', { replace: true });
    setLoggedIn(false);
    setUserData('');
  };

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

        <Header 
          userData={userData} 
          onSignOut={onSignOut}
        />
        
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
                onLogin={handleLogin}
                handleChange={handleChange}
                setInfoTooltip={setInfoTooltip} 
                setError={setError} 
              />
            } 
          />

          <Route path="/sign-up" 
            element={
              <Register 
                onRegister={handleRegister}
                handleChange={handleChange}
                setInfoTooltip={setInfoTooltip} 
                setError={setError} 
              />
            } 
          />

          <Route path="*" 
            element={
              loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-up" replace />} 
          />            

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
