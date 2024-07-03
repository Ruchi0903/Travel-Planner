import React, { useState } from "react";
import axios from "axios";
import "./FlightSearchForm.css"; // Import CSS file for styling

const FlightSearchForm = () => {
  const ONE_WAY_API = "https://sky-scanner3.p.rapidapi.com/flights/search-one-way";
  const AUTOCOMPLETE_API = "https://sky-scanner3.p.rapidapi.com/flights/auto-complete";
  const API_KEY = "e290022715msh0310313fbc08e89p10c790jsn055db4dc2bda";

  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [originId, setOriginId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [departureDate, setDepartureDate] = useState("");


  const handleSearch = async (e) => {
    e.preventDefault();

    const options = {
      method: "GET",
      url: ONE_WAY_API,
      params: {
        fromEntityId: originId,
        toEntityId: destinationId,
        date: departureDate,
        cabinClass: "economy",
      },
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "sky-scanner3.p.rapidapi.com",
      },
    };

    try {
      const res = await axios.request(options);
      console.log(res.data); // Log the entire response to understand its structure

      const flightsData = res.data.data.results || [];
      const formattedFlights = flightsData.map((flight) => ({
        origin: flight.location.name,
        destination: flight.content.location.name,
        direct: flight.direct,
        price: flight.cheapest.price,
        image: flight.image.url,
      }));
    

      setFlights(formattedFlights);
    } catch (error) {
      setError(error);
    }
  };

  const handleOriginChange = async (e) => {
    const query = e.target.value;
    await fetchAndSetEntityId(query, setOriginId);
  };

  const handleDestinationChange = async (e) => {
    const query = e.target.value;
    await fetchAndSetEntityId(query, setDestinationId);
  };

  const fetchAndSetEntityId = async (query, setter) => {
    const options = {
      method: "GET",
      url: AUTOCOMPLETE_API,
      params: { query: query },
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "sky-scanner3.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const suggestions = response.data.data || [];

      if (suggestions.length > 0) {
        const entityId = suggestions[0].presentation.id;
        setter(entityId);
      }
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    }
  };

  let imageLink = data.countrydestination.results[0].content.image.url;

  return (
    <div className="flight-search-container">
      <h1>Flight Search</h1>
      <form onSubmit={handleSearch}>
        <label>
          Origin:
          <input
            type="text"
            onChange={handleOriginChange}
            placeholder="Enter origin city or airport"
            required
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            onChange={handleDestinationChange}
            placeholder="Enter destination city or airport"
            required
          />
        </label>
        <label>
          Departure Date:
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Search Flights</button>
      </form>

      {error ? (
        <p className="error-message">Error: {error.message}</p>
      ) : flights.length > 0 ? (
        <div className="flight-cards">
          
          {flights.map((flight, index) => (
            <div key={index} className="flight-card">
              <img src={flight.image} alt="Flight" className="flight-image" />
              <div className="flight-details">
                <h2>{flight.origin} to {flight.destination}</h2>
                <p><strong>Direct Flight:</strong> {flight.direct ? "Yes" : "No"}</p>
                <p><strong>Price:</strong> {flight.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-flights-message">No flights found.</p>
      )}
      <div>
        <h2>Image</h2>
        <img src={imageLink} alt="" />
      </div>
    </div>
  );
};

export default FlightSearchForm;



































// WORKING!!!!!!!!!
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const FlightSearchForm = () => {
//   const ONE_WAY_API = "https://sky-scanner3.p.rapidapi.com/flights/search-one-way";
//   const API_KEY = "8124720ed9msh83ce956bc9ee16ap1d6892jsnd4ebe9418349";

//   const [flights, setFlights] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFlights = async () => {
//       const options = {
//         method: "GET",
//         url: ONE_WAY_API,
//         params: {
//           fromEntityId: "PARI",
//           cabinClass: "economy",
//         },
//         headers: {
//           "x-rapidapi-key": API_KEY,
//           "x-rapidapi-host": "sky-scanner3.p.rapidapi.com",
//         },
//       };
//       try {
//         const res = await axios.request(options);
//         console.log(res.data); // Log the entire response to understand its structure
        
//         // Assuming flight information is nested in res.data.results
//         const flightData = res.data.results || []; // Adjust the path based on actual structure
//         setFlights(flightData);
//       } catch (error) {
//         setError(error);
//       }
//     };
//     fetchFlights();
//   }, []);

//   return (
//     <div>
//       <h1>Flight Search Results</h1>
//       {error ? (
//         <p>Error: {error.message}</p>
//       ) : (
        
//         <ul>
//           {Array.isArray(flights) && flights.length > 0 ? (
//             flights.map((flight, index) => (
//               <li key={index}>{JSON.stringify(flight)}</li>
//             ))
//           ) : (
//             <p>No flights found.</p>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default FlightSearchForm;


// import React, { useState } from "react";
// import axios from "axios";

// const FlightSearchForm = () => {
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [date, setDate] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get(`/api/flights/search-one-way`, {
//         params: { origin, destination, date },
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching flights:", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Origin"
//           value={origin}
//           onChange={(e) => setOrigin(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//         <button type="submit">Search Flights</button>
//       </form>
//     </div>
//   );
// };

// export default FlightSearchForm;

// import React, { useState } from "react";
// import axios from "axios";

// const FlightSearch = () => {
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [date, setDate] = useState("");
//   const [flights, setFlights] = useState([]);
//   const [error, setError] = useState("");

//   const searchFlights = async () => {
//     try {
//       // Log the parameters
//       console.log("Searching flights with params:", {
//         origin,
//         destination,
//         date,
//       });

//       const response = await axios.get("/api/flights/search-one-way", {
//         params: { origin, destination, date },
//       });
//       setFlights(response.data.flights || []);
//       setError("");
//     } catch (error) {
//       console.error("Error fetching flights:", error);
//       setError("Error fetching flights. Please try again");
//     }
//   };

//   return (
//     <div>
//       <h2>Search One-Way Flights</h2>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           searchFlights();
//         }}
//       >
//         <div>
//           <label htmlFor="origin">Origin:</label>
//           <input
//             type="text"
//             id="origin"
//             value={origin}
//             onChange={(e) => setOrigin(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="destination">Destination:</label>
//           <input
//             type="text"
//             id="destination"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="date">Date:</label>
//           <input
//             type="date"
//             id="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Search</button>
//       </form>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <h3>Flight Results</h3>
//       <ul>
//         {flights.map((flight, index) => (
//           <li key={index}>
//             <p>{flight.name}</p>
//             <p>Cost: {flight.cost}</p>
//             <p>Departure: {flight.departure_time}</p>
//             <p>Arrival: {flight.arrival_time}</p>
//             <p>Seats Available: {flight.seats_available}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FlightSearch;
