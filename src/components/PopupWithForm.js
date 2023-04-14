function PopupWithForm({name, title, isOpened, onClose, children, onSubmit = () => {}}) {
  
  return (
    <div className={`popup popup_type_${name} ${isOpened ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" onClick={onClose} type="button" aria-label="закрытие попап"></button>
        <h2 className="popup__title">{title}</h2>
        <form onSubmit={onSubmit} className={`popup__form popup__form_${name}`} name={name} >
          {children}
          <button className="popup__button" type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;