import { useNavigate } from "react-router-dom";
import React from "react";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    return <Component history={history} navigate={navigate} {...props} />;
  };
  return Wrapper;
};
