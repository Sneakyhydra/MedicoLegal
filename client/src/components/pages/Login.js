// Imports
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import styles from './LoginReg.module.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const Login = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { login, error, clearErrors, validate, token } = authContext;
  const { setAlert } = alertContext;
  const [loginProgress, setLoginProgress] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    validate();
    M.AutoInit();
    M.updateTextFields();
    return () => {
      setLoginProgress(false);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
    }

    setLoginProgress(false);
    clearErrors();
    // eslint-disable-next-line
  }, [error, token]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoginProgress(true);

    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
      setLoginProgress(false);
    } else {
      await login({
        user_email: email,
        user_password: password,
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={'col s12 ' + styles.form} onSubmit={onSubmit}>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              placeholder='example@gmail.com'
              name='email'
              id='email'
              type='text'
              className='validate'
              value={email}
              onChange={onChange}
              required
            />
            <label htmlFor='email'>Email</label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              name='password'
              id='password'
              type='password'
              className='validate'
              value={password}
              onChange={onChange}
              required
            />
            <label htmlFor='password'>Password</label>
          </div>
        </div>

        <button
          type='submit'
          className={'waves-effect waves-light btn ' + styles.button}
          value='Login'
          disabled={loginProgress}
        >
          Login
        </button>

        <br />
        <p>
          New user? <NavLink to='/register'>Register</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
