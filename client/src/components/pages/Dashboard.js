// Imports
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import InjuryForm from '../layout/forms/InjuryForm';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { logout, validate } = authContext;

  useEffect(() => {
    validate();
    // eslint-disable-next-line
  }, []);

  const onLogout = async () => {
    await logout();
  };

  return (
    <div className='center'>
      <button
        onClick={onLogout}
        style={{
          borderRadius: '2em',
          marginTop: '2em',
          width: '10em',
        }}
      >
        Logout
      </button>
      <br />

      <InjuryForm />
    </div>
  );
};

export default Dashboard;
