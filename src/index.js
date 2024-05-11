import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withRouter } from "./utils"; // Import withRouter from your utility file

import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Dakhlaform from "./Dakhlaform";

const LoginWithRouter = withRouter(Login); // Wrap Login component with withRouter HOC
const RegisterWithRouter = withRouter(Register); // Wrap Register component with withRouter HOC
const DashboardWithRouter = withRouter(Dashboard); // Wrap Dashboard component with withRouter HOC
const DakhlaformWithRouter = withRouter(Dakhlaform); // Wrap Dakhlaform component with withRouter HOC

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginWithRouter />} />
      <Route path="/register" element={<RegisterWithRouter />} />
      <Route path="/dashboard" element={<DashboardWithRouter />} />
      <Route path="/dakhlaform" element={<DakhlaformWithRouter />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);