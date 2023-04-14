function ImagePopup({card, onClose}) {
  
  return (
    <div className={`popup popup_viewer ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_image">
        <div className="popup__image-wrapper">
          <button className="popup__close" onClick={onClose} type="button" aria-label="закрытие попап"></button>
          <img className="popup__image popup__image_viewer" src={card?.link} alt={card?.name} />
        </div>
        <p className="popup__image-title popup__image-title_viewer">{card?.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;