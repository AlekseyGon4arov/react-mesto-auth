import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';



function Register({ setError, setInfoTooltip }) {

  const navigate = useNavigate();

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    auth.register(formValue)
      .then((res) => {
        navigate('/sign-in', {replace: true});
        setInfoTooltip(true);
        setError(false);
      }).catch((err) => { 
        setInfoTooltip(true);
        setError(true);
        console.log(err);

      })
  }

  return (
    <>
      <div className="login">
        <div className="login__container">
          <h2 className="login__title">Регистрация</h2>
          <form className={`login__form`} onSubmit={handleSubmit}>
            <input className="login__input" name="email" value={formValue.email} type="email" onChange={handleChange} placeholder="Email" />
            <input className="login__input" name="password" value={formValue.password} type="password" onChange={handleChange} placeholder="Пароль" />
            <button className="login__button" onSubmit={handleSubmit} type="submit">Зарегистрироваться</button>
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