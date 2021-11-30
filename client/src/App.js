import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import NotFound from './components/pages/NotFound';
import Alerts from './components/layout/alert/Alerts';

import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import './App.css';
import 'materialize-css/dist/css/materialize.min.css';

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Alerts />
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route
              exact
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;
