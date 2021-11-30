// Imports
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/auth/authContext';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Patients = ({ setShowReports, showReports }) => {
  const authContext = useContext(AuthContext);
  const { injuryReports, loadInjuryReports } = authContext;
  const [pDetails, setPDetails] = useState(false);
  const [pDetailsId, setPDetailsId] = useState(0);

  useEffect(() => {
    if (showReports) {
      loadInjuryReports();
    }
    // eslint-disable-next-line
  }, [showReports]);

  if (!injuryReports) {
    return 'loading...';
  }

  const download = async (rep_id) => {
    window.open(`http://localhost:5000/api/reports/downloadinjury/${rep_id}`);
  };

  return (
    <div>
      <h1>Patients</h1>
      <br />
      <button onClick={() => setShowReports(false)}>Back</button>
      <br />
      <br />
      <hr />
      <br />
      {!pDetails && (
        <table>
          <thead>
            <tr>
              <th>S.no.</th>
              <th>Patient Name</th>
              <th>S/W/O</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {injuryReports.map((injury, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{injury.p_name}</td>
                <td>{injury.swo}</td>
                <td>{injury.rep_date}</td>
                <td>{injury.rep_time}</td>
                <td>
                  <button
                    onClick={() => {
                      setPDetails(true);
                      setPDetailsId(idx);
                    }}
                  >
                    More Details
                  </button>
                </td>
                <td>
                  <button type='button' onClick={() => download(injury.rep_id)}>
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {pDetails && (
        <div>
          <button
            onClick={() => {
              setPDetails(false);
              setPDetailsId(0);
            }}
          >
            Back
          </button>
          <h1>Patient Details</h1>
          <br />
          <p>Name: {injuryReports[pDetailsId].p_name}</p>
          <p>S/W/O: {injuryReports[pDetailsId].swo}</p>
          <p>Age: {injuryReports[pDetailsId].p_age}</p>
          <p>Address: {injuryReports[pDetailsId].p_address}</p>
          <br />
          <hr />
          <br />
          <p>Brought by: {injuryReports[pDetailsId].brought_by}</p>
          <p>Identification mark: {injuryReports[pDetailsId].id_mark}</p>
          <p>History: {injuryReports[pDetailsId].history}</p>
          <p>Opinion: {injuryReports[pDetailsId].opinion}</p>
          <p>Place: {injuryReports[pDetailsId].place}</p>
          <p>Date: {injuryReports[pDetailsId].rep_date}</p>
          <p>Time: {injuryReports[pDetailsId].rep_time}</p>
          <p>
            Report Creation Date:{' '}
            {injuryReports[pDetailsId].createDateTime.slice(0, 10)}
          </p>
          <p>
            Report Creation Time:{' '}
            {injuryReports[pDetailsId].createDateTime.slice(11, 19)}
          </p>

          <br />
          <hr />
          <br />
          <h1>Injury Details</h1>
          <br />
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Type</th>
                <th>Size</th>
                <th>Location</th>
                <th>Object</th>
                <th>Nature</th>
                <th>Duration</th>
              </tr>
            </thead>

            <tbody>
              {injuryReports[pDetailsId].injuries.map((injury, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{injury.type}</td>
                  <td>{injury.size}</td>
                  <td>{injury.location}</td>
                  <td>{injury.object}</td>
                  <td>{injury.nature}</td>
                  <td>{injury.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
          <hr />
        </div>
      )}
    </div>
  );
};

export default Patients;
