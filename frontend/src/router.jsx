import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from './pages/Home';
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import Reservation from "./pages/Reservation";
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
          <Route path="/admin" element={<Admin />} />
          <Route path="/:email" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/:email/info" element={<Profile />} />
          <Route path="/:email/reservations" element={<Reservation />} />
          {/* <Route path = "/" element={<Login/>}/>
                            <Route path = "/home" element={<Home/>}/>
                <Route path = "/register" element={<Register/>}/>
                <Route path = "/password" element={<Password/>}/>
                <Route path = "/reset_password" element={<ResetPassword/>}/> */}
          {/* <Route path="/password_reset_form/:tokenId" render={(props:any) => <PasswordReset {...props} />} />
                <Route path="/password_reset_email" element = {<PasswordResetEmail/>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default CreateRoutes;
