import { Route, Routes } from "react-router-dom";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboards from "../pages/Dashboards";
import Profile from "../pages/Profile";
import Customers from "../pages/Customers";

import Private from "./Private";
import NewTicket from "../components/NewTicket";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/dashboards" element={<Private> <Dashboards /> </Private>} />
      <Route path="/profile" element={<Private> <Profile /> </Private>} />
      <Route path="/customers" element={<Private> <Customers /> </Private>} />
      <Route path="/NewTicket" element={<Private> <NewTicket /> </Private>} />
    </Routes>
  );
} 