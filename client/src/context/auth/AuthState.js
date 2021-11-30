// Imports
import { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import * as actions from '../types';
import axios from 'axios';

axios.defaults.withCredentials = true;

const AuthState = (props) => {
  // Set initial state
  const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
    token: false,
    injuryReports: null,
  };

  // Init Reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    try {
      // Make a get request at localhost:5000/api/auth
      const res = await axios.get('/api/auth');

      // Dispatch the action to reducer for USER_LOADED
      dispatch({ type: actions.USER_LOADED, payload: res.data });
    } catch (err) {
      if (err.response.status === 401) {
        console.log('This is the desired behaviour');
      }
      // Dispatch the action to reducer for AUTH_ERROR
      dispatch({ type: actions.AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    // Set header of the input data
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      // Make a post request at localhost:5000/api/user/register
      const res = await axios.post('api/user/register', formData, config);

      // Dispatch the action to reducer for REGISTER_SUCCESS
      dispatch({
        type: actions.REGISTER_SUCCESS,
        payload: res.data,
      });

      // Load the user after successful registration
      loadUser();
    } catch (err) {
      // Dispatch the action to reducer for REGISTER_FAIL
      dispatch({
        type: actions.REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    // Set header of the input data
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      // Make a post request at localhost:5000/api/auth
      const res = await axios.post('api/auth', formData, config);

      // Dispatch the action to reducer for LOGIN_SUCCESS
      dispatch({
        type: actions.LOGIN_SUCCESS,
        payload: res.data,
      });

      // Load the user after successful login
      loadUser();
    } catch (err) {
      // Dispatch the action to reducer for LOGIN_FAIL
      dispatch({
        type: actions.LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.delete('/api/auth');

      // Dispatch the action to reducer for LOGOUT
      dispatch({ type: actions.LOGOUT });
    } catch (err) {
      console.log(err);
    }
  };

  // Validate user
  const validate = async () => {
    try {
      const res = await axios.get('/api/auth/check');
      if (res.data === 'Valid') {
        dispatch({
          type: actions.VALID_SUCCESS,
        });
      }
    } catch (err) {
      dispatch({
        type: actions.VALID_FAIL,
      });
    }
  };

  // Clear Errors
  const clearErrors = () => {
    // Dispatch the action to reducer for CLEAR_ERRORS
    dispatch({
      type: actions.CLEAR_ERRORS,
    });
  };

  const loadInjuryReports = async () => {
    try {
      const res = await axios.get('/api/forms/injury');
      dispatch({
        type: actions.LOAD_INJURY_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: actions.LOAD_INJURY_FAIL,
      });
    }
  };

  return (
    <AuthContext.Provider
      // Provide these values to all components wrapped in AuthContext in App.js
      value={{
        user: state.user,
        error: state.error,
        token: state.token,
        injuryReports: state.injuryReports,
        login,
        loadUser,
        logout,
        clearErrors,
        register,
        validate,
        loadInjuryReports,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
