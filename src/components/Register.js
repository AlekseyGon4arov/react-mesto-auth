import { Link } from 'react-router-dom';

function Register({ onRegister, formValue, handleChange }) {

  return (
    <>
      <div className="login">
        <div className="login__container">
          <h2 className="login__title">Регистрация</h2>
          <form className={`login__form`} onSubmit={onRegister}>
            <input className="login__input" name="email" value={formValue?.email} type="email" onChange={handleChange} placeholder="Email" />
            <input className="login__input" name="password" value={formValue?.password} type="password" onChange={handleChange} placeholder="Пароль" />
            <button className="login__button" onSubmit={onRegister} type="submit">Зарегистрироваться</button>
            <div className="login__question">
              <span>Уже зарегистрированы? </span>
              <Link to="/sign-in" className="login__link">
                Войти
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;