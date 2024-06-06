import React, { useState } from 'react';
import './styles/NewTripForm.css';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const NewTrip = () => {
  const [destinations, setDestinations] = useState([{ city: '', dates: { start: '', end: '' } }]);
  const [activities, setActivities] = useState([]);
  const [people, setPeople] = useState(1);

  const handleActivityToggle = (activity) => {
    if (activities.includes(activity)) {
      setActivities(activities.filter(a => a !== activity));
    } else {
      setActivities([...activities, activity]);
    }
  };

  const handleCityChange = (index, value) => {
    const newDestinations = [...destinations];
    newDestinations[index].city = value;
    setDestinations(newDestinations);
  };

  const handleDateChange = (index, dateType, value) => {
    const newDestinations = [...destinations];
    newDestinations[index].dates[dateType] = value;
    setDestinations(newDestinations);
  };

  const addDestination = () => {
    setDestinations([...destinations, { city: '', dates: { start: '', end: '' } }]);
  };

  const removeDestination = (index) => {
    const newDestinations = destinations.filter((_, i) => i !== index);
    setDestinations(newDestinations);
  };

  return (
    <>
    <Navbar/>
    <br />
    <br />
    <div className="form-container">
      <h1 className='H3'>Plan your next adventure</h1>
      
      
      {destinations.map((destination, index) => (
        <div key={index} className="destination">
          {destinations.length > 1 && index > 0 && <h2>Going Next to</h2>}
          {index == 0 && <label htmlFor={`city-${index}`}>Where do you want to go?</label>}
          {/* <label htmlFor={`city-${index}`}>Where do you want to go?</label> */}
          <input 
            type="text" 
            id={`city-${index}`} 
            placeholder="Select a city"
            value={destination.city}
            onChange={(e) => handleCityChange(index, e.target.value)}
          />
          <div className="dates">
            <label>Start Date: </label>
            <input 
              type="date" 
              value={destination.dates.start}
              onChange={(e) => handleDateChange(index, 'start', e.target.value)}
            />
            <label>End Date: </label>
            <input 
              type="date" 
              value={destination.dates.end}
              onChange={(e) => handleDateChange(index, 'end', e.target.value)}
            />
          </div>
          {index > 0 && <button className="remove-destination" onClick={() => removeDestination(index)}>Remove</button>}
        </div>
      ))}
      <button className="add-destination" onClick={addDestination}>+ Add destination</button>

      <div className="activities">
        <label>Select the kind of activities you want to do</label>
        <div className="activity-options">
          {['Kid Friendly', 'Museums', 'Shopping', 'Historical', 'Outdoor Adventures', 'Art & Cultural', 'Amusement Parks'].map(activity => (
            <button 
              key={activity} 
              className={activities.includes(activity) ? 'active' : ''}
              onClick={() => handleActivityToggle(activity)}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>

      <div className="people">
        <label>How many people are going?</label>
        <div className="people-selector">
          <button onClick={() => setPeople(Math.max(1, people - 1))}>-</button>
          <span>{people} Person{people > 1 ? 's' : ''}</span>
          <button onClick={() => setPeople(people + 1)}>+</button>
        </div>
      </div>
      
      <button className="create-trip-button">Create New Trip</button>
      <p className="terms-conditions">
        By clicking Create New Trip, you agree to our <a href="/terms">Terms and Conditions</a> and <a href="/privacy">Privacy Policy</a>.
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default NewTrip;
