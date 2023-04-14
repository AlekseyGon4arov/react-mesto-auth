import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const valueName = React.useRef();
  const valueLink = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: valueName.current.value,
      link: valueLink.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name='card'
      isOpened={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
        <label className="popup__label">
          <input id="mesto-input" ref={valueName} className="popup__input popup__input_data_name" type="text" name="editname" placeholder="Название" required minLength="2" maxLength="30" />
          <span className="popup__input-error mesto-input-error" />
        </label>
        <label className="popup__label">
          <input id="url-input" ref={valueLink} className="popup__input popup__input_data_image" type="url" name="editimage" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error url-input-error" />
        </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;