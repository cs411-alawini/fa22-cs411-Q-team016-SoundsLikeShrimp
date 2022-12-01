import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from './pages/Home';
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import Reservation from "./pages/Reservation";
import Revenue from "./pages/Revenue";
import Feature from "./pages/Feature";
import Service from "./pages/Service";
import Hiring from "./pages/Hiring";
import Employ from "./pages/Employ";
import Layoff from "./pages/Layoff";
// import Password from './pages/Password';
// import ResetPassword from './pages/ResetPassword';
// import {PasswordResetEmail} from './pages/PasswordResetEmail';
// import {PasswordReset} from './pages/PasswordReset';
function CreateRoutes() {
  return (
    <div className="CreateRoutes">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:email/admin" element={<Admin />} />
          <Route path="/:email/admin/check-revenue" element={<Revenue />} />
          <Route path="/:email/admin/check-feature" element={<Feature />} />
          <Route path="/:email" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/:email/info" element={<Profile />} />
          <Route path="/:email/reservations" element={<Reservation />} />
          <Route path="/:email/service" element={<Service />} />
          <Route path="/:email/admin/hiring" element={<Hiring />} />
          <Route path="/:email/admin/hire" element={<Employ />} />
          <Route path="/:email/admin/layoff" element={<Layoff />} />
        </Routes>
      </Router>
    </div>
  );
}

export default CreateRoutes;
