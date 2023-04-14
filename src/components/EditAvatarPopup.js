import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarLink = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarLink.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name='update'
      isOpened={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
        <label className="popup__label">
          <input ref={avatarLink} id="avatar-input" className="popup__input popup__input_data_avatar" type="url" name="updateavatar" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error avatar-input-error" />
        </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;