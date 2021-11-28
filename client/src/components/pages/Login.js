// Imports
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { login, error, clearErrors, validate, token } = authContext;
  const { setAlert } = alertContext;
  const [loginProgress, setLoginProgress] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    validate();
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

  const onSubmit = async () => {
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
    <form className='col s12'>
      <div className='form-container'>
        <div className='input-field col s12'>
          <label htmlFor='email'>Email</label>
          <br />
          <input
            id='email'
            name='email'
            type='text'
            className='validate'
            value={email}
            onChange={onChange}
            required
          />
        </div>

        <div className='input-field col s12'>
          <label htmlFor='password'>Password</label>
          <br />
          <input
            id='password'
            name='password'
            type='password'
            className='validate'
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <button
          type='submit'
          value='Login'
          onClick={onSubmit}
          style={{
            borderRadius: '2em',
            marginTop: '2em',
            width: '10em',
          }}
          disabled={loginProgress}
        >
          Login
        </button>

        <br />
        <p>
          New user?<NavLink to='/register'>Register</NavLink>
        </p>
      </div>
    </form>
  );
};

export default Login;
