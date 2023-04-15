function Login({ onLogin, formValue, handleChange }) {

  return (
    <>
      <div className="login">
        <div className="login__container">
          <h2 className="login__title">Вход</h2>
          <form className={`login__form`} onSubmit={onLogin}>
            <input className="login__input" name="email" value={formValue?.email} type="email" onChange={handleChange} placeholder="Email" />
            <input className="login__input" name="password" value={formValue?.password} type="password" onChange={handleChange} placeholder="Пароль" />
            <button className="login__button" onSubmit={onLogin} type="submit">Войти</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;