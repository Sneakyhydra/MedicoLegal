import { useState, useEffect, useContext } from 'react';
import AlertContext from '../../../context/alert/alertContext';

const InjuryForm = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // useEffect(() => {
  //   if (error === 'Invalid Credentials') {
  //     setAlert(error, 'danger');
  //   } else if (error === 'User already exists') {
  //     setAlert(error, 'danger');
  //   }

  //   clearErrors();
  //   // eslint-disable-next-line
  // }, [error, token]);

  const [report, setReport] = useState({
    p_name: '',
    swo: '',
    p_age: '',
    p_address: '',
    brought_by: '',
    id_mark: '',
    history: '',
    opinion: '',
    place: '',
    rep_date: '',
    rep_time: '',
    rep_type: 'injury',
  });

  const {
    p_name,
    swo,
    p_age,
    p_address,
    brought_by,
    id_mark,
    history,
    opinion,
    place,
    rep_date,
    rep_time,
    rep_type,
  } = report;

  const [injuries, setInjuries] = useState([]);
  const [injury, setInjury] = useState({
    type: '',
    size: '',
    location: '',
    object: '',
    nature: '',
    duration: '',
  });

  const onChange = (e) => {
    // setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // setLoginProgress(true);

    // if (email === '' || password === '') {
    //   setAlert('Please enter all fields', 'danger');
    //   setLoginProgress(false);
    // } else {
    //   await login({
    //     user_email: email,
    //     user_password: password,
    //   });
    // }
  };

  return (
    <form className='col s12 center' onSubmit={onSubmit}>
      <div className='form-container'>
        <h3>Patient details</h3>
        <br />
        <div className='input-field col s12'>
          <label htmlFor='p_name'>Patient Name</label>
          <br />
          <input
            id='p_name'
            name='p_name'
            type='text'
            className='validate'
            value={p_name}
            onChange={onChange}
            required
          />
        </div>

        <div className='input-field col s12'>
          <label htmlFor='swo'>S/W/O</label>
          <br />
          <input
            id='swo'
            name='swo'
            type='text'
            className='validate'
            value={swo}
            onChange={onChange}
            required
          />
        </div>

        <div className='input-field col s12'>
          <label htmlFor='p_age'>Age</label>
          <br />
          <input
            id='p_age'
            name='p_age'
            type='number'
            className='validate'
            value={p_age}
            onChange={onChange}
            required
          />
        </div>

        <div className='input-field col s12'>
          <label htmlFor='p_address'>Address</label>
          <br />
          <input
            id='p_address'
            name='p_address'
            type='text'
            className='validate'
            value={p_address}
            onChange={onChange}
            required
          />
        </div>

        <div className='input-field col s12'>
          <label htmlFor='brought_by'>Brought By</label>
          <br />
          <input
            id='brought_by'
            name='brought_by'
            type='text'
            className='validate'
            value={brought_by}
            onChange={onChange}
            required
          />
        </div>

        <div className='input-field col s12'>
          <label htmlFor='id_mark'>Identification Mark</label>
          <br />
          <input
            id='id_mark'
            name='id_mark'
            type='text'
            className='validate'
            value={id_mark}
            onChange={onChange}
            required
          />
        </div>

        <div className='input-field col s12'>
          <label htmlFor='history'>History</label>
          <br />
          <input
            id='history'
            name='history'
            type='text'
            className='validate'
            value={history}
            onChange={onChange}
            required
          />
        </div>

        <br />
        <h3>Report Details</h3>

        <div className='input-field col s12'>
          <label htmlFor='opinion'>Opinion</label>
          <br />
          <input
            id='opinion'
            name='opinion'
            type='text'
            className='validate'
            value={opinion}
            onChange={onChange}
            required
          />
        </div>

        <div className='input-field col s12'>
          <label htmlFor='place'>Place</label>
          <br />
          <input
            id='place'
            name='place'
            type='text'
            className='validate'
            value={place}
            onChange={onChange}
            required
          />
        </div>

        <div className='input-field col s12'>
          <label htmlFor='rep_date'>Date</label>
          <br />
          <input
            id='rep_date'
            name='rep_date'
            type='date'
            className='validate'
            value={rep_date}
            onChange={onChange}
            required
          />
        </div>

        <div className='input-field col s12'>
          <label htmlFor='rep_time'>Time</label>
          <br />
          <input
            id='rep_time'
            name='rep_time'
            type='text'
            className='validate'
            value={rep_time}
            onChange={onChange}
            required
          />
        </div>

        <button
          type='submit'
          value='submit'
          style={{
            borderRadius: '2em',
            marginTop: '2em',
            width: '10em',
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default InjuryForm;
