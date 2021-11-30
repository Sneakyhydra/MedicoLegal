// Imports
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth/authContext';
import InjuryForm from '../layout/forms/InjuryForm';
import Patients from '../layout/patients/Patients';

import './Dashboard.css';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { logout, validate, user, loadUser } = authContext;

  const [showInjury, setShowInjury] = useState(false);
  const [showReports, setShowReports] = useState(false);

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

      {!showInjury && !showReports && (
        <div>
          <button onClick={() => setShowInjury(true)}>Injury Form</button>
        </div>
      )}
      {showInjury && <InjuryForm setShowInjury={setShowInjury} />}

      {!showReports && !showInjury && (
        <div>
          <button onClick={() => setShowReports(true)}>Reports</button>
        </div>
      )}
      {showReports && (
        <Patients setShowReports={setShowReports} showReports={showReports} />
      )}

      {!showReports && !showInjury && (
        <div>
          <button
            onClick={() =>
              window.open('http://localhost:5000/api/reports/injurytemplate')
            }
          >
            Download Template
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
