import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import NotFound from './components/pages/NotFound';

import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from './context/auth/AuthState';

import './App.css';

const App = () => {
  return (
    <AuthState>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
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
    </AuthState>
  );
};

export default App;
