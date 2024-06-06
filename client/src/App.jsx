import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import PartTwo from "./components/PartTwo";
import PartThree from "./components/PartThree";
import PartFour from "./components/PartFour";
import SignUp from "./components/SignUp";
import CreateTrip from "./components/CreateTrip";
import SignIn from "./components/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import NewTrip from "./components/NewTrip";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Part2" element={<PartTwo />} />
          <Route path="/Part3" element={<PartThree />} />
          <Route path="/Part4" element={<PartFour />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/new-trip" element={<NewTrip />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          {/* <Route path="/tripCreate" element={<TripCreate />} /> */}
          <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;


// Collaboration working fine with feature-akshay as branch