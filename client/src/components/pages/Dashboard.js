// Imports
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import InjuryForm from '../layout/forms/InjuryForm';

import './Dashboard.css';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { logout, validate, user, loadUser } = authContext;

  useEffect(() => {
    validate();
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = async () => {
    await logout();
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='center'>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className='user-details'>
          <p>Name: {user.name}</p>
          <p>Designation: {user.designation}</p>
          <p>Posting Place: {user.posting_place}</p>
        </div>
        <div style={{ width: '50%' }}>
          <button
            onClick={onLogout}
            style={{
              borderRadius: '2em',
              width: '10em',
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <br />

      <InjuryForm />
    </div>
  );
};

export default Dashboard;
