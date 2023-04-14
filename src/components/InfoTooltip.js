import successIcon from '../image/Success-Icon.svg';
import failIcon from '../image/Fail-icon.svg';

function InfoTooltip({isOpened, onClose, error }) {

  return (
    <div className={`popup ${isOpened ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" onClick={onClose} type="button" aria-label="закрытие попап"></button>
          <div className="infotooltip">
          <img
            className="infotooltip_icon"
            src={error ? failIcon : successIcon}
            alt="Вы успешно зарегистрировались"
          />
          <p 
            className="infotooltip_title">
            {error
              ? "Что-то пошло не так! Попробуйте ещё раз."
              : "Вы успешно зарегистрировались!"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;