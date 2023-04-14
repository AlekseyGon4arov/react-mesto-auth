import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser?.name);
  const [description, setDescription] = React.useState(currentUser?.about);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }
  
  React.useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  },[currentUser, isOpen])

  return (
  <PopupWithForm
      title="Редактировать профиль"
      name='edit'
      isOpened={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
        <label className="popup__label">
          <input id="name-input" value={name || ''} onChange={handleNameChange} className="popup__input popup__input_data_name" type="text" name="editname" required minLength="2" maxLength="40" />
          <span className="popup__input-error name-input-error" />
        </label>
        <label className="popup__label">
          <input id="job-input" value={description || ''} onChange={handleDescriptionChange} className="popup__input popup__input_data_job" type="text" name="editjob" required minLength="2" maxLength="200" />
          <span className="popup__input-error job-input-error" />
        </label>
    </PopupWithForm>
   )
}

export default EditProfilePopup;