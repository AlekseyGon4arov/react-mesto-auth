import React from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

function Login({ onLogin, setError, setInfoTooltip }) {

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    auth.authorize(formValue)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          onLogin(formValue.email);
          navigate('/', {replace: false});
        }
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
          <h2 className="login__title">Вход</h2>
          <form className={`login__form`} onSubmit={handleSubmit}>
            <input className="login__input" name="email" value={formValue.email} type="email" onChange={handleChange} placeholder="Email" />
            <input className="login__input" name="password" value={formValue.password} type="password" onChange={handleChange} placeholder="Пароль" />
            <button className="login__button" onSubmit={handleSubmit} type="submit">Войти</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;