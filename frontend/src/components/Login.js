import { Link } from 'react-router-dom';

function Login(props) {
  const {
    email,
    password,
    handleLogin,
    handleEmail,
    handlePassword,
  } = props;

  return (
    <section className={`auth`}>
      <h2 className={`auth__title`}>Log in</h2>
      <form className={`auth__form`} onSubmit={handleLogin}>
        <input className={`auth__input`} placeholder={`Email`} type="email" onChange={handleEmail} value={email}></input>
        <input className={`auth__input`} placeholder={`Password`} type="password" onChange={handlePassword} value={password}></input>
        <button className={`auth__submit`} type="submit" >Log in</button>
      </form>
      <Link to='/signup' className={`auth__link`}>Not a member yet? Sign up here!</Link>
    </section>
  );
}

export default Login;