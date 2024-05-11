import { useNavigate } from "react-router-dom";
import React from "react";

export const withRouter = (Component) => {
  const Appwithrouter = (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };

  return Appwithrouter;
};