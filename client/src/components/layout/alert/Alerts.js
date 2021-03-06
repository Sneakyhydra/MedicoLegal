// Imports
import { useContext } from 'react';
import AlertContext from '../../../context/alert/alertContext';
import './Alerts.css';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div
        key={alert.id}
        className={`alert alert-${alert.type}`}
        style={{
          margin: '0',
          zIndex: '10000',
          position: 'fixed',
          width: '100%',
        }}
      >
        {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
