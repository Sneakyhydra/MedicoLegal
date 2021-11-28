// Imports
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router';

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, validate, token } = authContext;
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
      alert(error);
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
      alert('Please enter all fields');
      setLoginProgress(false);
    } else {
      await login({
        user_email: email,
        user_password: password,
      });
    }
  };

  return (
    <div className='row'>
      <form className='col s12'>
        <div className='row' style={{ margin: 'auto' }}>
          <div className='input-field col s12'>
            <label htmlFor='email'>Email</label>
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
        </div>

        <div className='row' style={{ margin: 'auto' }}>
          <div className='input-field col s12'>
            <label htmlFor='password'>Password</label>
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
        </div>

        <div className='row'>
          <button
            className='btn waves-effect waves-light'
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
        </div>
      </form>
    </div>
  );
};

export default Login;
