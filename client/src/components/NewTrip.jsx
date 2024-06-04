import React from 'react';
import './styles/TripCreate.css';


const NewTrip = () => {
  return (
    <div className='mt-5 ml-5'>
       <h1>Plan Your Next Adventure</h1>

       <p>Where do you want to go?</p>
       <input type="text" placeholder='Enter a city' />

       <p>Select the activites you want to do</p>
       
    </div>
  )
}

export default NewTrip









{/* <div>
<div>
  <button className="close-button" >&times;</button>
  <h2 className="H2">Create Trip</h2>
  <br />
  <form>
  <div className="form-group">
      <label htmlFor="tripName">Trip Name</label>
      <input
        type="text"
        id="tripName"
        name="tripName"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="startDate">Start Date</label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="endDate">End Date</label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="destination">Destination</label>
      <input
        type="text"
        id="destination"
        name="destination"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="travelers">Number of Travelers</label>
      <input
        type="number"
        id="travelers"
        name="travelers"
        min="1"
        required
      />
    </div>

    <button type="submit" className="submit-button">Create Trip</button>
  </form>

</div>
</div> */}