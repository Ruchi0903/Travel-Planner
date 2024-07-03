import React, { useState } from "react";

const FlightSearchResults = () => {
  const [flights, setFlights] = useState([]);

  const displayFlights = () => {
    return flights.map((flight) => (
      <div key={flight.id}>
        <p>
          FLight form {flight.origin} to {flight.destination} on {flight.date}{" "}
          for {flight.price}{" "}
        </p>
      </div>
    ));
  };

  return (
    <div>
      <h2>Flight Search Results</h2>
      {flights.length > 0 ? displayFlights() : <p>No flights found.</p>}
    </div>
  );
};

export default FlightSearchResults;
