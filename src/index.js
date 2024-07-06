import React from "react";
import ReactDOM from "react-dom";
//import { Route } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import "./Login.css";
import Dakhlaform from "./Dakhlaform";
import Students from "./students";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dakhlaform" element={<Dakhlaform />} />
      <Route path="/students" element={<Students />} />


    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
