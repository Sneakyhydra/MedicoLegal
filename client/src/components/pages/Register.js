// Imports
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { register, error, clearErrors, validate, token } = authContext;
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

  const onSubmit = async () => {
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
    <div className='row'>
      <form className='col s12'>
        <div className='input-field col s12'>
          <label htmlFor='name'>Name</label>
          <br />
          <input
            id='name'
            name='name'
            type='text'
            className='validate'
            value={name}
            onChange={onChange}
            required
          />
        </div>

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
          <label htmlFor='designation'>Designation</label>
          <br />
          <input
            id='designation'
            name='designation'
            type='text'
            className='validate'
            value={designation}
            onChange={onChange}
            required
          />
        </div>

        <div className='input-field col s12'>
          <label htmlFor='posting_place'>Posting Place</label>
          <br />
          <input
            id='posting_place'
            name='posting_place'
            type='text'
            className='validate'
            value={posting_place}
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
            minLength='6'
            required
          />
        </div>

        <button
          type='submit'
          value='register'
          onClick={onSubmit}
          style={{
            borderRadius: '2em',
            marginTop: '2em',
            width: '10em',
          }}
          disabled={loginProgress}
        >
          Register
        </button>

        <br />
        <p>
          Already a user?<NavLink to='/'>Login</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
