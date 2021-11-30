import { useState, useContext } from 'react';
import AlertContext from '../../../context/alert/alertContext';
import Injury from './Injury';
import axios from 'axios';

axios.defaults.withCredentials = true;

const InjuryForm = ({ setShowInjury }) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const [add, setAdd] = useState(false);

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
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const { type, size, location, object, nature, duration } = injury;

  const addInjury = () => {
    if (
      type === '' ||
      size === '' ||
      location === '' ||
      object === '' ||
      nature === '' ||
      duration === ''
    ) {
      setAlert('Please enter all fields', 'danger');
    } else {
      setInjuries([...injuries, { ...injury }]);
      setInjury({
        type: '',
        size: '',
        location: '',
        object: '',
        nature: '',
        duration: '',
      });
      setAdd(false);
    }
  };

  const onChangeInjury = (e) => {
    setInjury({ ...injury, [e.target.name]: e.target.value });
  };

  const deleteInjury = (idx) => {
    setInjuries([...injuries.slice(0, idx), ...injuries.slice(idx + 1)]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      p_name === '' ||
      swo === '' ||
      p_age === '' ||
      p_address === '' ||
      brought_by === '' ||
      id_mark === '' ||
      history === '' ||
      opinion === '' ||
      place === '' ||
      rep_type === '' ||
      injuries.length === 0
    ) {
      setAlert('Please enter all fields', 'danger');
    } else if (rep_date !== '' && rep_time === '') {
      setAlert('Both date and time should be entered or left empty', 'danger');
    } else if (rep_date === '' && rep_time !== '') {
      setAlert('Both date and time should be entered or left empty', 'danger');
    } else {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (rep_date === '' && rep_time === '') {
        let date;
        date = new Date();
        let time = date.toLocaleTimeString();
        date = date.toLocaleDateString();
        date =
          date.slice(6, 10) + '-' + date.slice(0, 2) + '-' + date.slice(3, 5);

        const formData = {
          p_name,
          swo,
          p_age,
          p_address,
          brought_by,
          id_mark,
          history,
          opinion,
          place,
          rep_date: date,
          rep_time: time,
          rep_type,
          injuries,
        };

        try {
          // Make a post request at localhost:5000/api/user/register
          await axios.post('api/forms/injury', formData, config);

          setShowInjury(false);
        } catch (err) {
          console.log(err);
        }
      } else {
        const formData = {
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
          injuries,
        };

        try {
          // Make a post request at localhost:5000/api/user/register
          await axios.post('api/forms/injury', formData, config);

          setShowInjury(false);
        } catch (err) {
          console.log(err);
        }
      }
    }
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
        <h3>Injuries</h3>
        <table>
          <thead>
            <tr>
              <th>Type of Injury</th>
              <th>Size</th>
              <th>Location</th>
              <th>Object</th>
              <th>Nature</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {injuries.map((injury, idx) => {
              return (
                <Injury
                  injury={injury}
                  key={idx}
                  idx={idx}
                  deleteInjury={deleteInjury}
                />
              );
            })}
          </tbody>
        </table>
        <button type='button' onClick={() => setAdd(true)} disabled={add}>
          Add
        </button>
        {add ? (
          <div>
            <div className='input-field col s12'>
              <label htmlFor='type'>Type of Injury</label>
              <br />
              <input
                id='type'
                name='type'
                type='text'
                className='validate'
                value={type}
                onChange={onChangeInjury}
                required
              />
            </div>

            <div className='input-field col s12'>
              <label htmlFor='size'>Size</label>
              <br />
              <input
                id='size'
                name='size'
                type='text'
                className='validate'
                value={size}
                onChange={onChangeInjury}
                required
              />
            </div>

            <div className='input-field col s12'>
              <label htmlFor='location'>Location</label>
              <br />
              <input
                id='location'
                name='location'
                type='text'
                className='validate'
                value={location}
                onChange={onChangeInjury}
                required
              />
            </div>

            <div className='input-field col s12'>
              <label htmlFor='object'>Object</label>
              <br />
              <input
                id='object'
                name='object'
                type='text'
                className='validate'
                value={object}
                onChange={onChangeInjury}
                required
              />
            </div>

            <div className='input-field col s12'>
              <label htmlFor='nature'>Nature</label>
              <br />
              <input
                id='nature'
                name='nature'
                type='text'
                className='validate'
                value={nature}
                onChange={onChangeInjury}
                required
              />
            </div>

            <div className='input-field col s12'>
              <label htmlFor='duration'>Duration</label>
              <br />
              <input
                id='duration'
                name='duration'
                type='text'
                className='validate'
                value={duration}
                onChange={onChangeInjury}
                required
              />
            </div>
            <button type='button' onClick={addInjury}>
              Save
            </button>
            <button
              type='button'
              onClick={() => {
                setAdd(false);
                setInjury({
                  type: '',
                  size: '',
                  location: '',
                  object: '',
                  nature: '',
                  duration: '',
                });
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          ''
        )}

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
        <button type='button' onClick={() => setShowInjury(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default InjuryForm;
