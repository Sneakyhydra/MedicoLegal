// Imports
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import styles from './LoginReg.module.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const Register = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { register, error, clearErrors, validate, token } = authContext;
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
    } else if (error === 'User already exists') {
      setAlert(error, 'danger');
    }

    setLoginProgress(false);
    clearErrors();
    // eslint-disable-next-line
  }, [error, token]);

  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    designation: '',
    posting_place: '',
  });

  const { email, password, name, designation, posting_place } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoginProgress(true);

    if (
      email === '' ||
      password === '' ||
      name === '' ||
      designation === '' ||
      posting_place === ''
    ) {
      setAlert('Please enter all fields', 'danger');
      setLoginProgress(false);
    } else if (password.length < 6) {
      setAlert('Password should be 6 characters long', 'danger');
      setLoginProgress(false);
    } else {
      await register({
        user_email: email,
        user_password: password,
        name,
        designation,
        posting_place,
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={'col s12 ' + styles.form} onSubmit={onSubmit}>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              name='name'
              id='name'
              type='text'
              className='validate'
              value={name}
              onChange={onChange}
              required
            />
            <label htmlFor='name'>Name</label>
          </div>
        </div>
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
              name='designation'
              id='designation'
              type='text'
              className='validate'
              value={designation}
              onChange={onChange}
              required
            />
            <label htmlFor='designation'>Designation</label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              name='posting_place'
              id='posting_place'
              type='text'
              className='validate'
              value={posting_place}
              onChange={onChange}
              required
            />
            <label htmlFor='posting_place'>Posting Place</label>
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
          value='Register'
          disabled={loginProgress}
        >
          Register
        </button>

        <br />
        <p>
          Already a user? <NavLink to='/'>Login</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
