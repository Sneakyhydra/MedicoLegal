// Imports
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

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
  );
};

export default Dashboard;
