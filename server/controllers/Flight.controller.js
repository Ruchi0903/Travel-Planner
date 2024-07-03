const flights = [
    { id: 1, origin: 'Chicago', destination: 'New York', date: '2024-06-21', price: 250 },
    { id: 2, origin: 'Chicago', destination: 'Los Angeles', date: '2024-06-21', price: 350 },
    { id: 3, origin: 'New York', destination: 'Chicago', date: '2024-06-22', price: 230 },
    { id: 4, origin: 'Los Angeles', destination: 'Chicago', date: '2024-06-22', price: 330 },
];

export const searchFlights = async (req, res) => {
    const { origin, destination, date } = req.query;
    const filteredFlights = flights.filter(
        flight => flight.origin === origin && flight.destination === destination && flight.date === date
    );
    res.json(filteredFlights);
}






























// import dotenv from "dotenv";
// dotenv.config();
// import axios from "axios";

// const SKYSCANNER_BASE_URL = "https://sky-scanner3.p.rapidapi.com"
// const FLIGHT_BOOKING_API_KEY = "8124720ed9msh83ce956bc9ee16ap1d6892jsnd4ebe9418349"


// export const searchFlight = async (req, res) => {
//     try {
//         const { origin, destination, date } = req.query;

//         // Log the request details
//         console.log("Requesting flight search with params:", { origin, destination, date });

//           // Validate query parameters
//           if (!origin || !destination || !date) {
//             return res.status(400).json({ error: "Missing required query parameters: origin, destination, and date are required." });
//         }

//         const options = {
//             method: 'GET',
//             url: `${SKYSCANNER_BASE_URL}/flights/search-one-way`,
//             params: { origin, destination, date },
//             headers: {
//                 'x-rapidapi-key': FLIGHT_BOOKING_API_KEY,
//                 'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'  // Adding Content-Type header
//             }
//         };


//         const response = await axios.request(options);

//         // Log the response data
//         console.log("Flight search response:", response.data);

//         res.status(200).json(response.data);
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: error.message })
//     }
// }
// export const searchFlight = async (req, res) => {
//     const { origin, destination, date } = req.query;

//     const options = {
//         method: 'GET',
//         url: 'https://sky-scanner3.p.rapidapi.com/flights/search-one-way',
//         params: {
//             origin,
//             destination,
//             date
//         },
//         headers: {
//             'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
//             'x-rapidapi-key': FLIGHT_BOOKING_API_KEY
//         }
//     };

//     try {
//         const response = await axios.request(options);
//         res.json(response.data);
//     } catch (error) {
//         console.error("Error fetching flight search results: ", error);
//         res.status(500).json({ error: error.message });
//     }
// }

// export const getFlightbyId = async (req, res) => {
//     const { flightId } = req.params;

//     try {
//         const response = await axios.get(`${SKYSCANNER_BASE_URL}/flights/details`, {
//             params: {
//                 flightId
//             },
//             headers: {
//                 'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
//                 'x-rapidapi-key': FLIGHT_BOOKING_API_KEY
//             }
//         });

//         res.json(response.data);
//     } catch (error) {
//         console.error("Error fetching flight details: ", error);
//         res.status(500).json({ error: error.message });
//     }
// }